# Classio

## Current State
The home screen (Onboarding.tsx) shows a name input for students and a small "Teacher / Parent View" link at the bottom. Teachers access the dashboard via PIN (1234) in TeacherDashboard.tsx. There is no dedicated login page.

## Requested Changes (Diff)

### Add
- New `LoginPage.tsx`: a dedicated login screen with two clear paths — Student and Teacher.
- Student path: name input → proficiency test or dashboard.
- Teacher path: PIN input (1234) → TeacherDashboard.

### Modify
- `App.tsx`: add `login` screen; show LoginPage as the entry point.
- `Onboarding.tsx`: remove the Teacher/Parent View link.
- `TeacherDashboard.tsx`: remove the internal PIN gate (auth moved to LoginPage).

### Remove
- Inline teacher link from Onboarding.tsx.
- PIN lock screen inside TeacherDashboard.tsx.

## Implementation Plan
1. Create `LoginPage.tsx` with two cards: Student (name input) and Teacher (PIN input 1234). Show Classio logo and branding.
2. Update `App.tsx`: add `login` to Screen type, start at `login` if no student name, pass `onStudentLogin` and `onTeacherLogin` callbacks.
3. Update `Onboarding.tsx`: remove `onTeacherView` prop.
4. Update `TeacherDashboard.tsx`: remove the PIN lock state/UI, render dashboard directly.
