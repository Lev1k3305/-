## 2025-05-14 - Accessible Radio Buttons & Keyboard Navigation
**Learning:** Using `display: none` on input elements (like radio buttons or checkboxes) completely removes them from the accessibility tree and tab order, making them unusable for keyboard and screen reader users. To maintain custom styling while keeping accessibility, a "visually hidden" CSS pattern should be used.
**Action:** Always use the `visually-hidden` utility pattern for hiding inputs that need to remain interactive. Combine this with `:focus-visible` on the associated label or a sibling element to provide clear visual feedback.

## 2025-05-14 - Semantic Form Labels
**Learning:** Labels must be explicitly linked to their inputs using `for` and `id` attributes. This not only improves accessibility for screen readers but also increases the clickable/tappable area for the input, which is a significant mobile UX win.
**Action:** Audit all form inputs to ensure they have corresponding `<label>` elements with matching `for` attributes.
