# Classio

## Current State
The app has a 7-day learning plan per passage with activities cycling within each 7-day week. Students track progress by grade and passageOffsets. There are 5 core activities per passage: Read & Record, Comprehension Quiz, Vocabulary Learn, Pronunciation Practice, Vocab Practice Test.

## Requested Changes (Diff)

### Add
- `currentDay200` field (1–200) to StudentData to track position in the 200-day journey
- `getDayInfo(day: number)` utility: maps day 1–200 → { grade, passageIndex, activityId }
  - passageNumber = Math.floor((day - 1) / 5)  [0–39]
  - grade = Math.floor(passageNumber / 4) + 1  [1–10]
  - passageIndexInGrade = passageNumber % 4  [0–3]
  - activityIndex = (day - 1) % 5  [0–4]
  - activities in order: ["record", "quiz", "vocab_learn", "pronunciation", "vocab_test"]
- `advanceDay200()` action in store: increments currentDay200 by 1 (max 200)
- 200-day plan display in Dashboard: shows a mini calendar strip with weeks (every 5 days = 1 passage, every 20 days = 1 grade), current day highlighted, completed days marked green
- Day progress header: "Day X of 200", current grade badge, current passage title, today's activity card
- `migrateStudentData` must initialize `currentDay200 = 1` if missing

### Modify
- App.tsx: derive `passage`, `grade`, and `activeActivity` from `student.currentDay200` via `getDayInfo()` instead of separate grade/passageOffset tracking. The current day's passage and grade are fully determined by day200.
- Proficiency test completion: set `currentDay200` to the starting day for the student's assigned grade (e.g., grade 3 → day 41). Use formula: `startDay = (grade - 1) * 20 + 1`.
- Each activity completion handler: call `advanceDay200()` after saving the session. Do NOT call `advancePassage()` anymore — advancement is driven purely by day200.
- Dashboard: replace the 7-day DayWisePlan with a 200-day progress view showing:
  - Large "Day X / 200" progress number
  - A grade strip showing 10 grade segments (each 20 days), with progress fill
  - Current passage panel (same as before)
  - Today's single activity card (the one activity for today), with a "Start Today's Activity" CTA
  - Below: all 5 passage activities still shown as steps (for context), but only today's is the CTA — the rest show locked/done state
  - Weekly Reports section (keep as-is)
- DayWisePlan.tsx: replace with a new `Day200Progress` component showing the 200-day strip
- The `currentDay` (1–7) logic is no longer needed; remove it
- Weekly vocab test: triggered after every 5th activity cycle (every 20 days, i.e., end of each grade's 4 passages). Show weekly test prompt when day200 % 20 === 0 and student has completed that day's activity but not yet taken the weekly test.

### Remove
- 7-day DayWisePlan component usage from Dashboard (replace with 200-day progress)
- `dayStartDate` field dependency for computing current day
- Weekly test trigger based on day === 7; now triggered at end of each grade block (day % 20 === 0)

## Implementation Plan
1. Add `getDayInfo()` utility in `src/frontend/src/utils/dayPlan.ts`
2. Add `currentDay200` to StudentData interface, default = 1, migrate if missing
3. Add `advanceDay200()` store action
4. Update proficiency completion to set startDay from grade
5. Refactor App.tsx: derive passage/grade from currentDay200; call advanceDay200 on each activity completion
6. Create `Day200Progress` component replacing DayWisePlan
7. Update Dashboard to show 200-day progress with today's activity CTA
8. Validate and build
