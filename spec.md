# Classio

## Current State
- Onboarding screen: student enters name + picks grade manually, then goes to dashboard
- Dashboard: shows only Read & Record module; other modules accessible via Progress Report
- Progress Report: tabs for each activity, shows only latest session per activity
- Student store: tracks sessions with wordResults (correct/mispronounced/missed)
- No proficiency test exists; grade is chosen manually

## Requested Changes (Diff)

### Add
- **Proficiency Test** screen (shown once per new student, after entering name but before selecting grade)
  - A short reading assessment: student reads a short passage aloud (speech recognition)
  - Based on accuracy score, the system auto-assigns a starting grade (1-5)
  - Show result: "Based on your reading, we suggest Grade X for you"
  - Student can accept or manually override grade
  - Store `proficiencyDone: boolean` in student data so test only shows once
- **Adaptive Learning** enhancements in store
  - Starting grade derived from proficiency test rather than manual selection
  - Grade already adapts via quiz scores (existing logic kept)
- **Comprehensive Detail Report** (single page, replacing the tab-based View My Reports)
  - All activities shown on ONE scrollable page (no tabs)
  - Sections: Overall Summary, Read & Record, Read & Quiz, Pronunciation, Missing Words, Intonation
  - Read & Record section: accuracy %, mispronounced words list (orange), missed words list (red/strikethrough), correct count, full word-by-word breakdown
  - Progress improvement chart: score over multiple sessions (line/bar showing improvement)
  - Pronunciation section: words rated Good vs Needs Improvement
  - Missing Words section: score summary
  - Intonation section: completion summary
  - Overall stats: total sessions, avg accuracy, improvement trend indicator

### Modify
- `Onboarding.tsx`: After name entry, launch proficiency test instead of manual grade selection
- `useStudentStore.ts`: Add `proficiencyDone: boolean` field to StudentData; `createStudent` accepts grade from test
- `ProgressReport.tsx`: Replace tabbed "View My Reports" with single comprehensive report page that shows all activities
- `App.tsx`: Add `proficiency-test` screen to Screen type; wire flow

### Remove
- Manual grade picker from Onboarding (replaced by proficiency test auto-assignment with optional override)

## Implementation Plan
1. Create `ProficiencyTest.tsx` component: shows a grade-1 reading passage, records voice, analyzes accuracy, recommends grade (1-5 scale based on score), allows override, calls onComplete(grade)
2. Update `useStudentStore.ts`: add `proficiencyDone` field, update defaultStudent and createStudent
3. Update `Onboarding.tsx`: collect name only, then pass to proficiency test
4. Update `App.tsx`: add `proficiency-test` screen, route name-entry → proficiency test → dashboard
5. Update `ProgressReport.tsx`: replace tabbed reports with a single comprehensive all-activities report page including word breakdown, improvement trend, mispronounced/missed word lists
