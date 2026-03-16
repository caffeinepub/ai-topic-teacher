export type ActivityId = "record" | "quiz" | "vocab_learn" | "vocab_test";

export interface DayInfo {
  day: number; // 1-160
  grade: number; // 1-10
  passageIndex: number; // 0-3 (index within grade)
  activityId: ActivityId;
  gradeBlock: number; // 1-10 (which grade block, same as grade)
  passageNumber: number; // 1-40 (overall passage number)
}

const ACTIVITIES: ActivityId[] = [
  "record",
  "quiz",
  "vocab_learn",
  "vocab_test",
];

export function getDayInfo(day: number): DayInfo {
  const d = Math.max(1, Math.min(160, day));
  const passageNumber = Math.floor((d - 1) / 4);
  const grade = Math.floor(passageNumber / 4) + 1;
  const passageIndex = passageNumber % 4;
  const activityIndex = (d - 1) % 4;
  return {
    day: d,
    grade,
    passageIndex,
    activityId: ACTIVITIES[activityIndex],
    gradeBlock: grade,
    passageNumber: passageNumber + 1,
  };
}

export function getStartDayForGrade(grade: number): number {
  return (grade - 1) * 16 + 1;
}

export function getActivityLabel(activityId: ActivityId): string {
  switch (activityId) {
    case "record":
      return "Read & Record";
    case "quiz":
      return "Comprehension Quiz";
    case "vocab_learn":
      return "Vocabulary Learn";
    case "vocab_test":
      return "Vocab Practice Test";
  }
}

export function getActivityIcon(activityId: ActivityId): string {
  switch (activityId) {
    case "record":
      return "🎙️";
    case "quiz":
      return "📝";
    case "vocab_learn":
      return "📚";
    case "vocab_test":
      return "📋";
  }
}
