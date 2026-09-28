# Design QA — Project gallery

## Evidence

- Source visual truth: `C:\Users\Alex\.codex\generated_images\01a0e613-9ef6-7dd0-a231-c69ab81f493a\exec-5d0d551b-cbd5-4b90-a5d1-2d5cf494f59d.png`
- Source pixels: 1487 × 1058.
- Implementation: `http://127.0.0.1:5173/resume/`, Iasit project detail dialog.
- Implementation screenshot: Codex in-app browser capture from tab 2, recorded inline in the implementation turn.
- Browser viewport: 1084 × 838 CSS pixels at device scale 1.
- State: French locale, personal-project tab, Iasit dialog open, first gallery image selected.
- Density normalization: visual regions were compared at their displayed CSS size; the gallery assets are 1200 × 675 WebP files displayed in a 16:9 container.

## Full-view comparison

The implementation preserves the selected mock's hierarchy: compact project header, large landscape image on the left, three vertically stacked thumbnails on the right, overlaid previous/next controls, a discreet counter, then the project copy. The surrounding CV and existing dialog styling remain unchanged.

The first browser pass exposed surrounding portfolio chrome inside two generated screenshots. All three assets were recropped to the Iasit product surface at 16:9, then the browser view was reloaded and inspected again.

## Focused-region comparison

The gallery region was inspected at normal browser scale. The selected thumbnail uses the existing blue token, controls remain legible over light screenshots, image edges are sharp, and the counter does not obscure meaningful content. The second image was selected with the keyboard to verify the main-image swap, counter update, and selected-thumbnail state.

## Fidelity surfaces

- Fonts and typography: inherited from the existing CV; labels and counter use the established type hierarchy and mono token where appropriate.
- Spacing and layout rhythm: the 10 px gallery gap, compact 118 px thumbnail rail, 8 px radii, and 16 px separation before copy match the selected direction without increasing card-list density.
- Colors and visual tokens: existing border, background, blue, and text tokens are reused; overlay controls use neutral translucent charcoal for reliable contrast.
- Image quality and asset fidelity: all gallery assets are 1200 × 675 WebP images, between roughly 55 and 75 KB, with no stretching or placeholder graphics.
- Copy and content: French and English alternative texts and gallery controls are localized. Project copy remains unchanged.

## Findings

No actionable P0, P1, or P2 mismatch remains.

## Follow-up polish

- [P3] Replace the generated Iasit demonstration screens with real product captures before public publication if strict documentary accuracy is required.

## Primary interactions checked

- Open the Iasit project dialog.
- Navigate to the next image with the keyboard.
- Confirm the main image, counter, and selected thumbnail update together.
- Confirm projects without `images` keep the original image-free detail layout through automated coverage.

## Comparison history

1. First pass: P2 image framing issue caused by portfolio chrome embedded in generated assets.
2. Fix: recropped all assets to 16:9 product-only regions and re-encoded them as WebP.
3. Second pass: the gallery matches the selected structure; no P0/P1/P2 findings remain.

## Implementation checklist

- [x] Optional data model and API validation.
- [x] Vertical thumbnail rail and selected state.
- [x] Previous/next navigation and image counter.
- [x] Responsive horizontal rail below 620 px.
- [x] Broken-image removal.
- [x] French and English accessible labels.
- [x] Automated tests, lint, type-check, and production build.

final result: passed
