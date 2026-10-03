#!/usr/bin/env python3
"""Render a resume PDF from a fully resolved resume-spec/v1 JSON file."""

from __future__ import annotations

import argparse
import json
import shutil
from pathlib import Path
from typing import Any
from xml.sax.saxutils import escape

try:
    from reportlab.lib import colors
    from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
    from reportlab.lib.pagesizes import letter
    from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
    from reportlab.platypus import (
        HRFlowable,
        KeepTogether,
        PageBreak,
        Paragraph,
        SimpleDocTemplate,
        Spacer,
        Table,
        TableStyle,
    )
except ImportError as error:  # pragma: no cover - exercised only on setup failure
    raise SystemExit(
        "reportlab is required. Install it with: python3 -m pip install reportlab"
    ) from error


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SPEC = ROOT / "output" / "spec" / "resume-spec.json"
DEFAULT_OUTPUT = ROOT / "output" / "pdf" / "Aakrit-Subedi-CV.pdf"
DEFAULT_PUBLIC_COPY = ROOT / "public" / "AakritSubedi.pdf"

ALIGNMENTS = {
    "left": TA_LEFT,
    "center": TA_CENTER,
    "right": TA_RIGHT,
    "justify": TA_JUSTIFY,
}
PAGE_SIZES = {"letter": letter}


def color(spec: dict[str, Any], name: str):
    return colors.HexColor(spec["theme"]["colors"].get(name, name))


def paragraph_styles(spec: dict[str, Any]) -> dict[str, ParagraphStyle]:
    sheet = getSampleStyleSheet()
    result: dict[str, ParagraphStyle] = {}
    for name, values in spec["styles"].items():
        attributes = dict(values)
        attributes["alignment"] = ALIGNMENTS[attributes.get("alignment", "left")]
        attributes["textColor"] = color(spec, attributes.get("textColor", "ink"))
        result[name] = ParagraphStyle(
            f"Resume{name[0].upper()}{name[1:]}",
            parent=sheet["Normal"],
            **attributes,
        )
    return result


def inline(
    spec: dict[str, Any],
    text: str,
    *,
    bold: bool = False,
    href: str | None = None,
    style: str | None = None,
) -> str:
    value = escape(text)
    if bold:
        value = f"<b>{value}</b>"
    if style:
        style_values = spec["styles"][style]
        font_name = escape(str(style_values["fontName"]))
        font_size = style_values["fontSize"]
        font_color = escape(str(spec["theme"]["colors"][style_values["textColor"]]))
        value = (
            f'<font name="{font_name}" size="{font_size}" color="{font_color}">'
            f"{value}</font>"
        )
    if href:
        link_color = escape(str(spec["theme"]["colors"]["ink"]))
        value = (
            f'<link href="{escape(href)}" color="{link_color}"><u>{value}</u></link>'
        )
    return value


def zero_padding() -> TableStyle:
    return TableStyle(
        [
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ]
    )


def bullet_paragraph(item: dict[str, str], styles: dict[str, ParagraphStyle]) -> Paragraph:
    text = escape(item["text"])
    if item.get("lead"):
        text = f"<b>{escape(item['lead'])}:</b> {text}"
    return Paragraph(text, styles["bullet"], bulletText="\u2022")


class ResumeRenderer:
    def __init__(self, spec: dict[str, Any]):
        if spec.get("schema") != "resume-spec/v1":
            raise ValueError("Unsupported or missing resume specification schema")
        self.spec = spec
        self.styles = paragraph_styles(spec)
        try:
            self.page_size = PAGE_SIZES[spec["page"]["size"].lower()]
        except KeyError as error:
            raise ValueError(f"Unsupported page size: {spec['page']['size']}") from error
        margins = spec["page"]["margins"]
        self.left_margin = margins["left"]
        self.right_margin = margins["right"]
        self.content_width = self.page_size[0] - self.left_margin - self.right_margin

    def header(self, block: dict[str, Any]) -> list:
        separator = escape(block["separator"])
        contact = separator.join(
            inline(self.spec, item["label"], href=item.get("href"))
            for item in block["contact"]
        )
        return [
            Paragraph(escape(block["name"]), self.styles["name"]),
            Paragraph(escape(block["headline"]), self.styles["headline"]),
            Paragraph(contact, self.styles["contact"]),
        ]

    def rule(self, block: dict[str, Any]) -> list:
        spacing = self.spec["theme"]["spacing"]
        return [
            HRFlowable(
                width="100%",
                thickness=self.spec["theme"]["rules"][block["variant"]],
                color=color(self.spec, "rule"),
                spaceBefore=spacing["headerRuleBefore"],
                spaceAfter=spacing["headerRuleAfter"],
            )
        ]

    def section(self, block: dict[str, Any]) -> list:
        spacing = self.spec["theme"]["spacing"]
        return [
            Spacer(1, spacing["sectionBefore"]),
            Paragraph(escape(block["title"]), self.styles["section"]),
            HRFlowable(
                width="100%",
                thickness=self.spec["theme"]["rules"]["primary"],
                color=color(self.spec, "rule"),
                spaceBefore=0,
                spaceAfter=spacing["sectionRuleAfter"],
            ),
        ]

    def role(self, block: dict[str, Any]) -> list:
        tables = self.spec["theme"]["tables"]
        company = inline(self.spec, block["company"], bold=True)
        if block.get("note"):
            company += " " + inline(self.spec, f"({block['note']})", style="note")

        period_width = tables["rolePeriodWidth"]
        primary = Table(
            [[
                Paragraph(company, self.styles["company"]),
                Paragraph(escape(block["period"]), self.styles["period"]),
            ]],
            colWidths=[self.content_width - period_width, period_width],
            hAlign="LEFT",
        )
        primary.setStyle(zero_padding())

        location_width = tables["roleLocationWidth"]
        secondary = Table(
            [[
                Paragraph(escape(block["title"]), self.styles["role"]),
                Paragraph(escape(block["location"]), self.styles["location"]),
            ]],
            colWidths=[self.content_width - location_width, location_width],
            hAlign="LEFT",
        )
        secondary.setStyle(zero_padding())

        header: list = [primary, secondary]
        if block.get("context"):
            header.append(Paragraph(escape(block["context"]), self.styles["context"]))

        bullets = [bullet_paragraph(item, self.styles) for item in block["bullets"]]
        flowables = [KeepTogether([*header, bullets[0]]), *bullets[1:]]
        flowables.append(Spacer(1, self.spec["theme"]["spacing"]["roleAfter"]))
        return flowables

    def project(self, block: dict[str, Any]) -> list:
        heading = inline(self.spec, block["name"], bold=True)
        if block.get("link"):
            heading += "  |  " + inline(
                self.spec,
                block["link"]["label"],
                href=block["link"]["href"],
            )
        content = [
            Paragraph(heading, self.styles["projectHead"]),
            Paragraph(escape(block["description"]), self.styles["projectBody"]),
        ]
        if block.get("stack"):
            content.append(Paragraph(escape(block["stack"]), self.styles["stack"]))
        content.append(Spacer(1, self.spec["theme"]["spacing"]["projectAfter"]))
        return [KeepTogether(content)]

    def skills(self, block: dict[str, Any]) -> list:
        rows = [
            [
                Paragraph(escape(row["label"]), self.styles["skillLabel"]),
                Paragraph(escape(row["items"]), self.styles["skillItems"]),
            ]
            for row in block["rows"]
        ]
        label_width = self.spec["theme"]["tables"]["skillLabelWidth"]
        table = Table(
            rows,
            colWidths=[label_width, self.content_width - label_width],
            hAlign="LEFT",
        )
        padding = self.spec["theme"]["spacing"]["skillRowPadding"]
        table.setStyle(
            TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                    ("TOPPADDING", (0, 0), (-1, -1), padding),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), padding),
                ]
            )
        )
        return [table]

    def education(self, block: dict[str, Any]) -> list:
        period_width = self.spec["theme"]["tables"]["rolePeriodWidth"]
        header = Table(
            [[
                Paragraph(
                    inline(self.spec, block["qualification"], bold=True),
                    self.styles["company"],
                ),
                Paragraph(escape(block["period"]), self.styles["period"]),
            ]],
            colWidths=[self.content_width - period_width, period_width],
            hAlign="LEFT",
        )
        header.setStyle(zero_padding())
        institution_color = self.spec["theme"]["colors"]["muted"]
        content = [
            header,
            Paragraph(
                f'<font name="Helvetica-Oblique" color="{institution_color}">'
                f"{escape(block['institution'])}</font>",
                self.styles["educationBody"],
            ),
            *[bullet_paragraph(item, self.styles) for item in block["details"]],
            Spacer(1, self.spec["theme"]["spacing"]["educationAfter"]),
        ]
        return [KeepTogether(content)]

    def block(self, block: dict[str, Any]) -> list:
        block_type = block["type"]
        if block_type == "header":
            return self.header(block)
        if block_type == "rule":
            return self.rule(block)
        if block_type == "summary":
            return [Paragraph(escape(block["text"]), self.styles["summary"])]
        if block_type == "section":
            return self.section(block)
        if block_type == "role":
            return self.role(block)
        if block_type == "pagebreak":
            if block.get("mode") != "hard":
                raise ValueError(f"Unsupported pagebreak mode: {block.get('mode')}")
            return [PageBreak()]
        if block_type == "project":
            return self.project(block)
        if block_type == "skills":
            return self.skills(block)
        if block_type == "education":
            return self.education(block)
        if block_type == "bulletList":
            return [bullet_paragraph(item, self.styles) for item in block["items"]]
        raise ValueError(f"Unsupported resume block type: {block_type}")

    def story(self) -> list:
        flowables: list = []
        for block in self.spec["blocks"]:
            flowables.extend(self.block(block))
        return flowables

    def draw_page(self, canvas, document) -> None:
        meta = self.spec["meta"]
        canvas.saveState()
        canvas.setTitle(meta["title"])
        canvas.setAuthor(meta["author"])
        canvas.setSubject(meta["subject"])
        canvas.setCreator(meta["creator"])

        footer = self.spec["page"]["footer"]
        show_footer = footer["enabled"] and not (
            footer["skipFirstPage"] and document.page == 1
        )
        if show_footer:
            y = footer["y"]
            canvas.setStrokeColor(color(self.spec, "footerRule"))
            canvas.setLineWidth(self.spec["theme"]["rules"]["footer"])
            canvas.line(
                self.left_margin,
                y + footer["ruleOffset"],
                self.page_size[0] - self.right_margin,
                y + footer["ruleOffset"],
            )
            footer_style = self.spec["styles"]["footer"]
            canvas.setFillColor(color(self.spec, footer_style["textColor"]))
            canvas.setFont(footer_style["fontName"], footer_style["fontSize"])
            canvas.drawString(self.left_margin, y, footer["left"])
            canvas.drawRightString(
                self.page_size[0] - self.right_margin,
                y,
                footer["right"].format(page=document.page),
            )
        canvas.restoreState()

    def render(self, output_path: Path) -> None:
        margins = self.spec["page"]["margins"]
        output_path.parent.mkdir(parents=True, exist_ok=True)
        document = SimpleDocTemplate(
            str(output_path),
            pagesize=self.page_size,
            leftMargin=margins["left"],
            rightMargin=margins["right"],
            topMargin=margins["top"],
            bottomMargin=margins["bottom"],
            title=self.spec["meta"]["title"],
            author=self.spec["meta"]["author"],
            subject=self.spec["meta"]["subject"],
            pageCompression=1,
        )
        callback = lambda canvas, doc: self.draw_page(canvas, doc)
        document.build(self.story(), onFirstPage=callback, onLaterPages=callback)


def render_resume(spec_path: Path, output_path: Path, public_copy: Path | None) -> None:
    with spec_path.open(encoding="utf-8") as stream:
        spec = json.load(stream)
    ResumeRenderer(spec).render(output_path)
    print(f"Wrote resume PDF: {output_path}")
    if public_copy:
        public_copy.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(output_path, public_copy)
        print(f"Updated public resume PDF: {public_copy}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--spec", type=Path, default=DEFAULT_SPEC)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--public-copy", type=Path, default=DEFAULT_PUBLIC_COPY)
    parser.add_argument(
        "--skip-public-copy",
        action="store_true",
        help="Generate only --output and leave public/AakritSubedi.pdf unchanged.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    render_resume(
        args.spec.resolve(),
        args.output.resolve(),
        None if args.skip_public_copy else args.public_copy.resolve(),
    )


if __name__ == "__main__":
    main()
