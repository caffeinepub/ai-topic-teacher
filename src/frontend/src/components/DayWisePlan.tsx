interface Props {
  currentDay: number; // 1-7
  passageTitle: string;
  completedActivities: string[];
}

const DAY_PLAN = [
  {
    day: 1,
    icon: "🎙️",
    title: "Read & Record",
    activityId: "record",
    color: "bg-teal-50 border-teal-200",
    activeColor: "bg-teal-500",
    textColor: "text-teal-700",
  },
  {
    day: 2,
    icon: "📝",
    title: "Comprehension Quiz",
    activityId: "quiz",
    color: "bg-blue-50 border-blue-200",
    activeColor: "bg-blue-500",
    textColor: "text-blue-700",
  },
  {
    day: 3,
    icon: "📚",
    title: "Vocabulary Learn",
    activityId: "vocab_learn",
    color: "bg-amber-50 border-amber-200",
    activeColor: "bg-amber-500",
    textColor: "text-amber-700",
  },
  {
    day: 4,
    icon: "🗣️",
    title: "Pronunciation Practice",
    activityId: "pronunciation",
    color: "bg-purple-50 border-purple-200",
    activeColor: "bg-purple-500",
    textColor: "text-purple-700",
  },
  {
    day: 5,
    icon: "📋",
    title: "Vocab Practice Test",
    activityId: "vocab_test",
    color: "bg-rose-50 border-rose-200",
    activeColor: "bg-rose-500",
    textColor: "text-rose-700",
  },
  {
    day: 6,
    icon: "🔁",
    title: "Review — Re-read Passage",
    activityId: "review",
    color: "bg-green-50 border-green-200",
    activeColor: "bg-green-500",
    textColor: "text-green-700",
  },
  {
    day: 7,
    icon: "🏆",
    title: "Weekly Vocab Test + Rest",
    activityId: "weekly_vocab_test",
    color: "bg-indigo-50 border-indigo-200",
    activeColor: "bg-indigo-500",
    textColor: "text-indigo-700",
  },
];

export default function DayWisePlan({
  currentDay,
  passageTitle,
  completedActivities,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-teal-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-3">
        <p className="text-white font-bold text-sm">📅 7-Day Learning Plan</p>
        <p className="text-white/70 text-xs mt-0.5">📖 {passageTitle}</p>
      </div>
      <div className="p-3 grid grid-cols-7 gap-1.5">
        {DAY_PLAN.map((item) => {
          const isDone = completedActivities.includes(item.activityId);
          const isToday = item.day === currentDay;
          const isFuture = item.day > currentDay && !isDone;
          return (
            <div
              key={item.day}
              data-ocid={`day_plan.day.${item.day}`}
              className={[
                "flex flex-col items-center p-1.5 rounded-xl border-2 transition-all text-center",
                isDone
                  ? "bg-green-50 border-green-300"
                  : isToday
                    ? `${item.color} shadow-sm scale-105`
                    : isFuture
                      ? "bg-gray-50 border-gray-100 opacity-50"
                      : item.color,
              ].join(" ")}
            >
              <span
                className={`text-xs font-bold mb-0.5 ${isDone ? "text-green-600" : isToday ? item.textColor : "text-gray-400"}`}
              >
                D{item.day}
              </span>
              <span className="text-base leading-none">
                {isDone ? "✅" : isFuture ? "🔒" : item.icon}
              </span>
            </div>
          );
        })}
      </div>
      {/* Legend row */}
      <div className="px-4 pb-3">
        {DAY_PLAN.find((d) => d.day === currentDay) && (
          <div
            className={`${DAY_PLAN[currentDay - 1]?.color ?? "bg-teal-50"} border-2 ${DAY_PLAN[currentDay - 1]?.color?.replace("bg-", "border-").replace("50", "200") ?? "border-teal-200"} rounded-xl px-3 py-2 flex items-center gap-2`}
          >
            <span className="text-base">{DAY_PLAN[currentDay - 1]?.icon}</span>
            <div>
              <p
                className={`text-xs font-bold ${DAY_PLAN[currentDay - 1]?.textColor ?? "text-teal-700"}`}
              >
                Today: Day {currentDay}
              </p>
              <p className="text-xs text-gray-500">
                {DAY_PLAN[currentDay - 1]?.title}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
