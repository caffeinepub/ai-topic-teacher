import { getActivityIcon, getActivityLabel, getDayInfo } from "@/utils/dayPlan";
import type { ActivityId } from "@/utils/dayPlan";

interface Props {
  currentDay: number; // 1-160
  grade: number; // current grade (1-10)
}

const GRADE_COLORS = [
  "",
  "bg-emerald-400",
  "bg-teal-400",
  "bg-sky-400",
  "bg-blue-400",
  "bg-violet-400",
  "bg-amber-400",
  "bg-orange-400",
  "bg-rose-400",
  "bg-pink-400",
  "bg-fuchsia-500",
];

const GRADE_BG = [
  "",
  "bg-emerald-100",
  "bg-teal-100",
  "bg-sky-100",
  "bg-blue-100",
  "bg-violet-100",
  "bg-amber-100",
  "bg-orange-100",
  "bg-rose-100",
  "bg-pink-100",
  "bg-fuchsia-100",
];

const GRADE_TEXT = [
  "",
  "text-emerald-700",
  "text-teal-700",
  "text-sky-700",
  "text-blue-700",
  "text-violet-700",
  "text-amber-700",
  "text-orange-700",
  "text-rose-700",
  "text-pink-700",
  "text-fuchsia-800",
];

const ACTIVITY_COLORS: Record<ActivityId, string> = {
  record: "bg-teal-500",
  quiz: "bg-blue-500",
  vocab_learn: "bg-amber-500",
  vocab_test: "bg-rose-500",
};

const ACTIVITY_BG: Record<ActivityId, string> = {
  record: "bg-teal-50 border-teal-200",
  quiz: "bg-blue-50 border-blue-200",
  vocab_learn: "bg-amber-50 border-amber-200",
  vocab_test: "bg-rose-50 border-rose-200",
};

const ACTIVITY_TEXT: Record<ActivityId, string> = {
  record: "text-teal-700",
  quiz: "text-blue-700",
  vocab_learn: "text-amber-700",
  vocab_test: "text-rose-700",
};

const ALL_ACTIVITIES: ActivityId[] = [
  "record",
  "quiz",
  "vocab_learn",
  "vocab_test",
];

export default function Day200Progress({ currentDay }: Props) {
  const dayInfo = getDayInfo(currentDay);
  const progressPercent = Math.round(((currentDay - 1) / 160) * 100);

  // Passage block start day for current passage (4 activities per passage)
  const passageBlockStartDay = (dayInfo.passageNumber - 1) * 4 + 1;

  // Which activities are done/current/future in this passage block (4 days)
  const blockActivityIndex = (currentDay - 1) % 4; // 0-3, current activity index

  return (
    <div className="bg-white rounded-2xl border border-teal-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-xs font-medium uppercase tracking-wide">
              160-Day Learning Journey
            </p>
            <p className="text-white font-bold text-xl leading-tight">
              Day {currentDay}{" "}
              <span className="text-white/70 text-base font-normal">
                of 160
              </span>
            </p>
          </div>
          <div className="text-right">
            <div
              className={`${GRADE_BG[dayInfo.grade]} ${GRADE_TEXT[dayInfo.grade]} rounded-xl px-3 py-1.5 text-center`}
            >
              <p className="text-xs font-semibold">Grade {dayInfo.grade}</p>
              <p className="text-xs opacity-70">
                Passage {dayInfo.passageIndex + 1}/4
              </p>
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-2.5">
          <div className="flex justify-between text-white/70 text-xs mb-1">
            <span>Passage {dayInfo.passageNumber} of 40</span>
            <span>{progressPercent}% complete</span>
          </div>
          <div className="bg-white/20 rounded-full h-2.5">
            <div
              className="bg-white rounded-full h-2.5 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grade strip */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">
          Grade Progress
        </p>
        <div className="flex gap-0.5">
          {Array.from({ length: 10 }, (_, i) => {
            const g = i + 1;
            const gradeStartDay = (g - 1) * 16 + 1;
            const gradeEndDay = g * 16;
            const isCurrentGrade = g === dayInfo.grade;
            const isPast = gradeEndDay < currentDay;
            const isFuture = gradeStartDay > currentDay;
            const fillPercent = isPast
              ? 100
              : isFuture
                ? 0
                : Math.round(((currentDay - gradeStartDay) / 16) * 100);

            return (
              <div
                key={g}
                data-ocid={`day200.grade.${g}`}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  className={[
                    "w-full h-3 rounded-sm overflow-hidden relative",
                    isCurrentGrade ? "ring-1 ring-offset-0 ring-teal-400" : "",
                    isFuture ? "bg-gray-100" : "bg-gray-200",
                  ].join(" ")}
                >
                  <div
                    className={`absolute inset-y-0 left-0 transition-all duration-700 ${
                      isCurrentGrade
                        ? GRADE_COLORS[g]
                        : isPast
                          ? "bg-teal-300"
                          : GRADE_COLORS[g]
                    }`}
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
                <span
                  className={`text-[9px] font-bold leading-none ${
                    isCurrentGrade
                      ? GRADE_TEXT[g]
                      : isPast
                        ? "text-teal-400"
                        : "text-gray-300"
                  }`}
                >
                  G{g}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current passage 4-day activity block */}
      <div className="px-4 py-3">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">
          This Passage — 4 Daily Activities
        </p>
        <div className="flex gap-2">
          {ALL_ACTIVITIES.map((actId, idx) => {
            const dayForActivity = passageBlockStartDay + idx;
            const isDone = dayForActivity < currentDay;
            const isCurrent = idx === blockActivityIndex;
            const isFuture = dayForActivity > currentDay;

            return (
              <div
                key={actId}
                data-ocid={`day200.activity.${idx + 1}`}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  className={[
                    "w-full aspect-square rounded-xl border-2 flex items-center justify-center text-base transition-all",
                    isDone
                      ? "bg-green-50 border-green-300"
                      : isCurrent
                        ? `${ACTIVITY_BG[actId]} shadow-sm scale-105`
                        : isFuture
                          ? "bg-gray-50 border-gray-100"
                          : ACTIVITY_BG[actId],
                  ].join(" ")}
                >
                  {isDone ? "✅" : isFuture ? "🔒" : getActivityIcon(actId)}
                </div>
                <span
                  className={`text-[9px] font-bold leading-none text-center ${
                    isDone
                      ? "text-green-600"
                      : isCurrent
                        ? ACTIVITY_TEXT[actId]
                        : "text-gray-300"
                  }`}
                >
                  {["Read", "Quiz", "Vocab", "Test"][idx]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's highlight */}
      <div className="px-4 pb-3">
        <div
          className={`${ACTIVITY_BG[dayInfo.activityId]} border-2 rounded-xl px-3 py-2 flex items-center gap-2.5`}
        >
          <span className="text-xl">{getActivityIcon(dayInfo.activityId)}</span>
          <div className="flex-1 min-w-0">
            <p
              className={`text-xs font-bold ${ACTIVITY_TEXT[dayInfo.activityId]}`}
            >
              Today: Day {currentDay}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {getActivityLabel(dayInfo.activityId)}
            </p>
          </div>
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${
              ACTIVITY_COLORS[dayInfo.activityId]
            }`}
          />
        </div>
      </div>
    </div>
  );
}
