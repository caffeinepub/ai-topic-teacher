# Classio

## Current State
- ProgressReport shows only last 5 sessions under Recent Activity
- Only quiz sessions have expandable Q&A; other activities show just a checkmark
- Word results from Read & Record are not persisted to sessions
- Paragraph advances correctly after a PASS

## Requested Changes (Diff)

### Add
- wordResults field to Session interface to persist reading analysis
- Full report sections in ProgressReport grouped by activity type
- Each section shows all attempts with detailed reports

### Modify
- handleRecordComplete in App.tsx to save wordResults to the session
- ProgressReport to show all activities in sections with full details
- Session storage to include wordResults

### Remove
- Generic checkmark display for non-quiz sessions (replaced by proper reports)

## Implementation Plan
1. Add wordResults to Session interface
2. Save wordResults in addSession call from handleRecordComplete
3. Rewrite ProgressReport with sections per activity type showing full details
4. Read & Quiz: pass/fail, score%, expandable Q&A
5. Read & Record: accuracy%, word counts, color-coded word breakdown
6. Missing Words/Pronunciation/Intonation: completion with score
