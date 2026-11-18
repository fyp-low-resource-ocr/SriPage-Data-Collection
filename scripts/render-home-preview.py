"""Render the home-page preview from the actual EPF Form D PDF (requires PyMuPDF)."""
from pathlib import Path
import fitz

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'public/forms/epf/d-form.pdf'
OUTPUT = ROOT / 'public/previews/epf-annotation-preview.png'

# Manually marked regions on page 1, in PDF page coordinates.
REGIONS = [
    ((112, 27, 447, 78), '#7c3aed'),
    ((185, 122, 402, 171), '#7c3aed'),
    ((79, 187, 286, 222), '#16803c'),
    ((303, 188, 552, 216), '#d97706'),
    ((77, 227, 287, 309), '#16803c'),
    ((303, 232, 552, 302), '#d97706'),
    ((79, 316, 287, 347), '#16803c'),
    ((303, 322, 552, 341), '#d97706'),
    ((79, 352, 287, 383), '#16803c'),
    ((303, 358, 552, 377), '#d97706'),
]

def rgb(hex_color):
    return tuple(int(hex_color[index:index + 2], 16) / 255 for index in (1, 3, 5))

with fitz.open(SOURCE) as document:
    page = document[0]
    for number, (bounds, color) in enumerate(REGIONS, 1):
        tint = rgb(color)
        page.draw_rect(fitz.Rect(bounds), color=tint, fill=tint, fill_opacity=.06, width=.9, overlay=True)
        x, y = bounds[:2]
        page.draw_rect(fitz.Rect(x - 2, y - 10, x + 11, y + 1), color=tint, fill=tint, overlay=True)
        page.insert_text((x + 1, y - 1), str(number), fontsize=7, color=(1, 1, 1), overlay=True)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    page.get_pixmap(matrix=fitz.Matrix(2, 2), clip=fitz.Rect(45, 14, 575, 406), alpha=False).save(OUTPUT)
    print(OUTPUT.relative_to(ROOT))
