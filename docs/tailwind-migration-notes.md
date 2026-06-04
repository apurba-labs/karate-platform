# Tailwind Migration Notes

Issue:
Tailwind classes appeared not to work.

Root Cause:
Global styles inside App.css were overriding Tailwind typography and utility classes.

Solution:
- Keep Tailwind imports in index.css
- Keep only resets and app-wide styles in index.css
- Avoid global h1/h2/a/button rules
- Use Tailwind utilities for new pages