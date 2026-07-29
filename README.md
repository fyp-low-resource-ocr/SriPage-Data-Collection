# SriDoc Studio

A local Next.js application for annotating blank PDF forms and generating synthetic handwritten PDF/JSON datasets in Sinhala, Tamil, and English.

## Run locally

```bash
pnpm install
pnpm dev
```

Open the local URL shown by Next.js. For a production run:

```bash
pnpm build
pnpm start
```

Projects, source PDFs, annotations, value drafts, and fonts are stored in `.local-data` by default. Set `SYNTH_DATA_DIR` to use a different application-data folder:

```bash
SYNTH_DATA_DIR=/path/to/sridoc-data pnpm start
```

## Workflow

1. Create a project and upload a blank multi-page PDF.
2. For each field, draw the printed label box and then its answer region.
3. Enter the exact printed label, choose its language, and enable multiline layout when needed.
4. In **Generate**, select one answer language and enter one value per field.
5. Upload one or more matching `.ttf` or `.otf` handwriting fonts.
6. Select the font variants, choose a seed, and generate the dataset.
7. Download the PDF and JSON file for each font separately.

The JSON export uses normalized top-left bounding boxes and includes the source PDF hash, font hash, seed, augmentation settings, page dimensions, printed-label boxes, and tight rendered-answer boxes.

## Quality checks

```bash
pnpm test
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```
