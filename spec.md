# Classio

## Current State
The Dashboard uses amber/grade-specific colors (amber-50 background, amber-300/700 for buttons, grade-specific color arrays). The login page was recently updated to a teal/cyan gradient theme matching the Classio logo. The app header uses the Classio logo asset.

## Requested Changes (Diff)

### Add
- Teal/cyan color theme to Dashboard home page and student dashboard UI.

### Modify
- Dashboard.tsx: Replace amber background (`bg-amber-50`) and amber-toned buttons/borders with teal/cyan equivalents. Keep grade-specific activity step colors but update the surrounding page chrome (background, progress report button, back-to-home button, badges section) to teal. The grade header banner stays per-grade but the base page should feel teal/cyan.
- App.tsx: The "completed" screen uses `from-green-50 to-blue-50` — update to `from-teal-50 to-cyan-50` to match.

### Remove
- Amber color references from the outer dashboard layout (not from grade-specific activity colors).

## Implementation Plan
1. In Dashboard.tsx: change `bg-amber-50` page background to `bg-teal-50`, `border-amber-300 text-amber-700 hover:bg-amber-50` on report button to teal equivalents, badges section border from `border-amber-100` to `border-teal-100`, badge chips from `bg-amber-100 text-amber-800` to `bg-teal-100 text-teal-800`.
2. In App.tsx: update completed screen gradient from green/blue to teal/cyan.
