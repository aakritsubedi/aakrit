#!/usr/bin/env python3
"""Build the resume specification, render the PDF, or run the complete pipeline."""

from __future__ import annotations

import argparse
from pathlib import Path

from build_spec import (
    DEFAULT_CV_DATA,
    DEFAULT_OUTPUT as DEFAULT_SPEC,
    DEFAULT_PROFILE,
    DEFAULT_THEME,
    build_resume_spec,
    write_or_check_spec,
)


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_PDF = ROOT / "output" / "pdf" / "Aakrit-Subedi-CV.pdf"
DEFAULT_PUBLIC_COPY = ROOT / "public" / "AakritSubedi.pdf"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--all", action="store_true", help="Build the spec and render the PDF.")
    mode.add_argument("--spec-only", action="store_true", help="Build only the JSON spec.")
    mode.add_argument("--render-only", action="store_true", help="Render the existing JSON spec.")
    parser.add_argument("--check", action="store_true", help="Check the spec without overwriting it.")
    parser.add_argument("--cv-data", type=Path, default=DEFAULT_CV_DATA)
    parser.add_argument("--profile", type=Path, default=DEFAULT_PROFILE)
    parser.add_argument("--theme", type=Path, default=DEFAULT_THEME)
    parser.add_argument("--overrides", type=Path)
    parser.add_argument("--spec", type=Path, default=DEFAULT_SPEC)
    parser.add_argument("--output", type=Path, default=DEFAULT_PDF)
    parser.add_argument("--public-copy", type=Path, default=DEFAULT_PUBLIC_COPY)
    parser.add_argument("--skip-public-copy", action="store_true")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    spec_path = args.spec.resolve()
    render_only = args.render_only
    spec_only = args.spec_only

    if args.check and render_only:
        raise SystemExit("--check cannot be combined with --render-only")

    if not render_only:
        spec = build_resume_spec(
            args.cv_data.resolve(),
            args.profile.resolve(),
            args.theme.resolve(),
            args.overrides.resolve() if args.overrides else None,
        )
        if not write_or_check_spec(spec, spec_path, args.check):
            raise SystemExit(1)

    if args.check or spec_only:
        return

    from render_pdf import render_resume

    render_resume(
        spec_path,
        args.output.resolve(),
        None if args.skip_public_copy else args.public_copy.resolve(),
    )


if __name__ == "__main__":
    main()
