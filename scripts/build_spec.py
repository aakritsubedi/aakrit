#!/usr/bin/env python3
"""Resolve CV content and theme settings into a deterministic resume specification."""

from __future__ import annotations

import argparse
import copy
import difflib
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CV_DATA = ROOT / "config" / "cv-data.json"
DEFAULT_PROFILE = ROOT / "config" / "profile.json"
DEFAULT_THEME = ROOT / "config" / "theme.json"
DEFAULT_OUTPUT = ROOT / "output" / "spec" / "resume-spec.json"

SCALABLE_STYLE_FIELDS = {
    "fontSize",
    "leading",
    "leftIndent",
    "rightIndent",
    "firstLineIndent",
    "bulletIndent",
    "spaceBefore",
    "spaceAfter",
}
FORBIDDEN_DASHES = {"\u2010", "\u2011", "\u2012", "\u2013", "\u2014"}


def read_json(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as stream:
        value = json.load(stream)
    if not isinstance(value, dict):
        raise ValueError(f"Expected a JSON object in {path}")
    return value


def deep_merge(base: dict[str, Any], override: dict[str, Any]) -> dict[str, Any]:
    """Return a recursive merge without mutating either input."""
    merged = copy.deepcopy(base)
    for key, value in override.items():
        if isinstance(value, dict) and isinstance(merged.get(key), dict):
            merged[key] = deep_merge(merged[key], value)
        else:
            merged[key] = copy.deepcopy(value)
    return merged


def scaled(value: int | float, scale: float) -> int | float:
    result = round(float(value) * scale, 3)
    return int(result) if result.is_integer() else result


def resolve_theme(raw_theme: dict[str, Any], external_overrides: dict[str, Any] | None) -> tuple[dict[str, Any], dict[str, Any]]:
    embedded_overrides = raw_theme.pop("overrides", {})
    if not isinstance(embedded_overrides, dict):
        raise ValueError("theme.overrides must be a JSON object")

    theme = deep_merge(raw_theme, embedded_overrides)
    if external_overrides:
        theme = deep_merge(theme, external_overrides)

    scale = float(theme.get("scale", 1))
    if scale <= 0:
        raise ValueError("theme.scale must be greater than zero")

    resolved_styles: dict[str, dict[str, Any]] = {}
    for style_name, style in theme["styles"].items():
        resolved_style: dict[str, Any] = {}
        for key, value in style.items():
            if key in SCALABLE_STYLE_FIELDS and isinstance(value, (int, float)):
                resolved_style[key] = scaled(value, scale)
            else:
                resolved_style[key] = value
        resolved_styles[style_name] = resolved_style

    resolved_spacing = {
        key: scaled(value, scale) if isinstance(value, (int, float)) else value
        for key, value in theme["spacing"].items()
    }
    resolved_theme = {
        "scale": scale,
        "page": copy.deepcopy(theme["page"]),
        "colors": theme["colors"],
        "rules": theme["rules"],
        "spacing": resolved_spacing,
        "tables": theme["tables"],
    }
    return resolved_theme, resolved_styles


def display_url(url: str) -> str:
    return url.removeprefix("https://").removeprefix("http://").removeprefix("www.").rstrip("/")


def absolute_url(url: str) -> str:
    return url if "://" in url else f"https://{url}"


def social_url(profile: dict[str, Any], host: str) -> str:
    try:
        return next(url for url in profile["sameAs"] if host in url)
    except StopIteration as error:
        raise ValueError(f"profile.sameAs must contain a {host} URL") from error


def highlighted_bullet(text: str) -> dict[str, str]:
    if ":" not in text:
        return {"text": text}

    lead, body = text.split(":", 1)
    if len(lead) > 40:
        return {"text": text}
    return {"lead": lead.strip(), "text": body.strip()}


def contact_items(profile: dict[str, Any]) -> list[dict[str, str]]:
    github = social_url(profile, "github.com")
    linkedin = social_url(profile, "linkedin.com")
    country = {"NP": "Nepal"}.get(
        profile["address"].get("country"), profile["address"].get("country", "")
    )
    location = ", ".join(
        part for part in [profile["address"].get("locality"), country] if part
    )
    return [
        {"label": location},
        {"label": profile["email"], "href": f"mailto:{profile['email']}"},
        {"label": display_url(profile["siteUrl"]), "href": profile["siteUrl"]},
        {"label": display_url(github), "href": github},
        {"label": display_url(linkedin), "href": linkedin},
    ]


def page_spec(page_theme: dict[str, Any], profile: dict[str, Any]) -> dict[str, Any]:
    page = copy.deepcopy(page_theme)
    footer = page.setdefault("footer", {})
    footer.update(
        {
            "left": f"{profile['name']} | {display_url(profile['siteUrl'])}",
            "right": "Page {page}",
        }
    )
    return page


def content_blocks(cv: dict[str, Any], profile: dict[str, Any]) -> list[dict[str, Any]]:
    blocks: list[dict[str, Any]] = [
        {
            "type": "header",
            "name": profile["name"],
            "headline": cv["headline"],
            "contact": contact_items(profile),
            "separator": " \u00b7 ",
        },
        {"type": "rule", "variant": "primary"},
        {"type": "summary", "text": cv["summary"]},
        {"type": "section", "id": "skills", "title": "TECHNICAL SKILLS"},
        {
            "type": "skills",
            "rows": [
                {"label": group["label"], "items": ", ".join(group["items"])}
                for group in cv["skills"]
            ],
        },
        {
            "type": "section",
            "id": "experience",
            "title": "PROFESSIONAL EXPERIENCE",
        },
    ]

    for role in cv["roles"]:
        blocks.append(
            {
                "type": "role",
                "company": role["company"],
                "note": role.get("note"),
                "title": role["title"],
                "period": role.get("period", ""),
                "location": role.get("location", ""),
                "context": role.get("context"),
                "bullets": [highlighted_bullet(text) for text in role["bullets"]],
            }
        )

    blocks.append({"type": "section", "id": "projects", "title": "SELECTED PROJECTS"})
    for project in cv["projects"]:
        blocks.append(
            {
                "type": "project",
                "name": project["name"],
                "link": (
                    {
                        "label": project["link"],
                        "href": absolute_url(project["link"]),
                    }
                    if project.get("link")
                    else None
                ),
                "description": project["description"],
                "stack": f"Stack: {project['stack']}" if project.get("stack") else None,
            }
        )

    blocks.append({"type": "section", "id": "education", "title": "EDUCATION"})
    blocks.extend(
        {
            "type": "education",
            "qualification": entry["qualification"],
            "institution": entry["institution"],
            "period": entry["period"],
            "details": [{"text": detail} for detail in entry["details"]],
        }
        for entry in cv["education"]
    )
    blocks.extend(
        [
            {
                "type": "section",
                "id": "recognition",
                "title": "AWARDS & COMMUNITY",
            },
            {
                "type": "bulletList",
                "items": [{"text": award} for award in cv["awards"]],
            },
        ]
    )
    return blocks


def assert_ats_safe(value: Any, location: str = "spec") -> None:
    if isinstance(value, str):
        bad = FORBIDDEN_DASHES.intersection(value)
        if bad:
            codepoints = ", ".join(f"U+{ord(char):04X}" for char in sorted(bad))
            raise ValueError(f"{location} contains non-ASCII dash characters: {codepoints}")
        return
    if isinstance(value, list):
        for index, item in enumerate(value):
            assert_ats_safe(item, f"{location}[{index}]")
        return
    if isinstance(value, dict):
        for key, item in value.items():
            assert_ats_safe(item, f"{location}.{key}")


def build_resume_spec(
    cv_path: Path = DEFAULT_CV_DATA,
    profile_path: Path = DEFAULT_PROFILE,
    theme_path: Path = DEFAULT_THEME,
    overrides_path: Path | None = None,
) -> dict[str, Any]:
    cv = read_json(cv_path)
    profile = read_json(profile_path)
    raw_theme = read_json(theme_path)
    external_overrides = read_json(overrides_path) if overrides_path else None
    resolved_theme, resolved_styles = resolve_theme(raw_theme, external_overrides)
    resolved_page = resolved_theme.pop("page")

    spec = {
        "schema": "resume-spec/v1",
        "meta": {
            "title": f"{profile['name']} - Resume",
            "author": profile["name"],
            "subject": "Engineering management and full-stack software engineering resume",
            "creator": "Aakrit Subedi resume specification builder",
            "generatedAt": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        },
        "page": page_spec(resolved_page, profile),
        "theme": resolved_theme,
        "styles": resolved_styles,
        "blocks": content_blocks(cv, profile),
    }
    assert_ats_safe(spec)
    return spec


def comparable(spec: dict[str, Any]) -> dict[str, Any]:
    value = copy.deepcopy(spec)
    value.get("meta", {}).pop("generatedAt", None)
    return value


def serialized(spec: dict[str, Any]) -> str:
    return json.dumps(spec, ensure_ascii=False, indent=2, sort_keys=True) + "\n"


def write_or_check_spec(spec: dict[str, Any], output_path: Path, check: bool) -> bool:
    existing: dict[str, Any] | None = None
    existing_text = ""
    if output_path.exists():
        existing_text = output_path.read_text(encoding="utf-8")
        try:
            parsed = json.loads(existing_text)
            if isinstance(parsed, dict):
                existing = parsed
        except json.JSONDecodeError:
            existing = None

    if existing and comparable(existing) == comparable(spec):
        previous_timestamp = existing.get("meta", {}).get("generatedAt")
        if previous_timestamp:
            spec["meta"]["generatedAt"] = previous_timestamp

    candidate_text = serialized(spec)
    if check:
        if candidate_text == existing_text:
            print(f"Resume spec is current: {output_path}")
            return True
        diff = difflib.unified_diff(
            existing_text.splitlines(),
            candidate_text.splitlines(),
            fromfile=str(output_path),
            tofile="resolved sources",
            lineterm="",
        )
        print("\n".join(diff))
        print("Resume spec differs from its resolved sources; refusing to overwrite in --check mode.")
        return False

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(candidate_text, encoding="utf-8")
    print(f"Wrote resume spec: {output_path}")
    return True


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cv-data", type=Path, default=DEFAULT_CV_DATA)
    parser.add_argument("--profile", type=Path, default=DEFAULT_PROFILE)
    parser.add_argument("--theme", type=Path, default=DEFAULT_THEME)
    parser.add_argument("--overrides", type=Path)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument(
        "--check",
        action="store_true",
        help="Diff against the existing spec and fail instead of overwriting it.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    spec = build_resume_spec(
        args.cv_data.resolve(),
        args.profile.resolve(),
        args.theme.resolve(),
        args.overrides.resolve() if args.overrides else None,
    )
    if not write_or_check_spec(spec, args.output.resolve(), args.check):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
