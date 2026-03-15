# Classio

## Current State
Classio is an adaptive reading platform for grades 1-5. When a student logs in, handleStudentLogin creates a session and goes directly to the dashboard - the proficiency test is skipped. The ProficiencyTest component exists but only triggers from old Onboarding. ProgressReport shows activity data but no proficiency results or adaptive grade history.

## Requested Changes (Diff)

### Add
- After student login, if proficiency test not done, show ProficiencyTest before dashboard
- Store proficiency score and assigned grade in student data
- Track grade change history (adaptive learning log) in student store
- Consolidated student dashboard in ProgressReport: proficiency result, adaptive grade progression, all 5 module summary

### Modify
- App.tsx: handleStudentLogin checks proficiencyDone; if false, route to proficiency test
- useStudentStore.ts: Add proficiencyScore, proficiencyGrade, gradeHistory fields; update createStudent
- ProgressReport.tsx: Add Student Dashboard section at top

### Remove
- Nothing

## Implementation Plan
1. Update StudentData with proficiencyScore, proficiencyGrade, gradeHistory
2. Add completeWithProficiency store method
3. Fix App.tsx login flow to show proficiency test
4. Enhance ProgressReport with consolidated dashboard panel
