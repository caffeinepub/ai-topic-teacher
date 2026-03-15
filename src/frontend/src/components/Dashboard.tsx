import AppHeader from "@/components/AppHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { StudentData } from "@/store/useStudentStore";
import { getBadge, getBadgeLabel } from "@/utils/badges";

type Screen =
  | "dashboard"
  | "passage"
  | "quiz"
  | "missing-words"
  | "pronunciation"
  | "record"
  | "intonation"
  | "report";

interface Props {
  student: StudentData;
  onNavigate: (screen: Screen) => void;
  onBackToHome: () => void;
  completedActivities: string[];
  currentPassageTitle: string;
}

const gradeColors = [
  "",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-orange-500",
  "bg-rose-500",
  "bg-pink-500",
  "bg-fuchsia-600",
];
const gradeBorderColors = [
  "",
  "border-emerald-500",
  "border-teal-500",
  "border-sky-500",
  "border-blue-500",
  "border-violet-500",
  "border-amber-500",
  "border-orange-500",
  "border-rose-500",
  "border-pink-500",
  "border-fuchsia-600",
];
const gradeTextColors = [
  "",
  "text-emerald-600",
  "text-teal-600",
  "text-sky-600",
  "text-blue-600",
  "text-violet-600",
  "text-amber-600",
  "text-orange-600",
  "text-rose-600",
  "text-pink-600",
  "text-fuchsia-700",
];
const gradeBgLightColors = [
  "",
  "bg-emerald-50",
  "bg-teal-50",
  "bg-sky-50",
  "bg-blue-50",
  "bg-violet-50",
  "bg-amber-50",
  "bg-orange-50",
  "bg-rose-50",
  "bg-pink-50",
  "bg-fuchsia-50",
];

const ACTIVITIES = [
  {
    id: "record" as Screen,
    icon: "🎙️",
    title: "Read & Record",
    desc: "Read the passage aloud and record your voice",
  },
  {
    id: "quiz" as Screen,
    icon: "📝",
    title: "Read & Quiz",
    desc: "Answer comprehension questions about the passage",
  },
  {
    id: "missing-words" as Screen,
    icon: "🔤",
    title: "Missing Words",
    desc: "Fill in the blanks from the passage",
  },
  {
    id: "pronunciation" as Screen,
    icon: "🗣️",
    title: "Pronunciation",
    desc: "Practice pronouncing key words correctly",
  },
  {
    id: "intonation" as Screen,
    icon: "🎵",
    title: "Intonation",
    desc: "Practice reading with proper tone and expression",
  },
];

export default function Dashboard({
  student,
  onNavigate,
  onBackToHome,
  completedActivities,
  currentPassageTitle,
}: Props) {
  const totalSessions = student.sessions.length;
  const progress = Math.min(((totalSessions % 5) / 5) * 100, 100);

  // Determine status of each activity
  // Active = first activity that is not completed
  const firstIncompleteIndex = ACTIVITIES.findIndex(
    (a) => !completedActivities.includes(a.id),
  );

  return (
    <div className="min-h-screen bg-teal-50">
      <AppHeader />
      {/* Grade header */}
      <div
        className={`${gradeColors[student.grade]} text-white px-4 pt-6 pb-6`}
      >
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-base">Welcome back,</p>
              <h2 className="font-display text-3xl font-bold">
                {student.name}
              </h2>
            </div>
            <div className="bg-white/20 rounded-2xl px-4 py-3 text-center flex flex-col items-center gap-1">
              <p className="text-white/80 text-xs">Your Badge</p>
              <div
                className={`bg-gradient-to-br ${getBadge(student.grade).gradient} px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5`}
              >
                <span className="text-2xl">
                  {getBadge(student.grade).emoji}
                </span>
                <span className="text-white font-extrabold text-sm tracking-wide">
                  {getBadge(student.grade).name}
                </span>
              </div>
              <p className="text-white/70 text-xs mt-0.5">Keep it up! 🌟</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-full h-3 mt-2">
            <div
              className="bg-white rounded-full h-3 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/70 text-sm mt-1">
            {totalSessions} activities completed
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Current passage panel */}
        <div
          data-ocid="dashboard.passage.panel"
          className={`${gradeBgLightColors[student.grade]} border-2 ${gradeBorderColors[student.grade]} rounded-2xl p-4`}
        >
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">
            Current Passage
          </p>
          <p className={`font-bold text-lg ${gradeTextColors[student.grade]}`}>
            📖 {currentPassageTitle}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Complete all 5 activities below for this passage in order.
          </p>
        </div>

        {/* Activity stepper */}
        <div className="space-y-3">
          {ACTIVITIES.map((activity, index) => {
            const isDone = completedActivities.includes(activity.id);
            const isActive = index === firstIncompleteIndex;
            const isLocked = !isDone && index > firstIncompleteIndex;

            return (
              <button
                key={activity.id}
                type="button"
                data-ocid={`dashboard.activity.step.${index + 1}`}
                disabled={isLocked}
                onClick={() => !isLocked && onNavigate(activity.id)}
                className={[
                  "w-full rounded-2xl p-4 text-left flex items-center gap-4 transition-all border-2",
                  isDone
                    ? "bg-white border-green-200 opacity-80 hover:opacity-100 hover:scale-[1.005]"
                    : isActive
                      ? `${gradeBgLightColors[student.grade]} ${gradeBorderColors[student.grade]} shadow-md hover:scale-[1.01]`
                      : "bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed",
                ].join(" ")}
              >
                {/* Step number */}
                <div
                  className={[
                    "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold border-2",
                    isDone
                      ? "bg-green-500 border-green-500 text-white"
                      : isActive
                        ? `${gradeColors[student.grade]} text-white border-transparent`
                        : "bg-gray-200 border-gray-200 text-gray-400",
                  ].join(" ")}
                >
                  {isDone ? "✓" : index + 1}
                </div>

                {/* Icon + text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{activity.icon}</span>
                    <p
                      className={[
                        "font-bold text-base",
                        isDone
                          ? "text-green-700"
                          : isActive
                            ? gradeTextColors[student.grade]
                            : "text-gray-400",
                      ].join(" ")}
                    >
                      {activity.title}
                    </p>
                    {isDone && (
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs ml-auto flex-shrink-0">
                        ✅ Done
                      </Badge>
                    )}
                    {isLocked && (
                      <span className="ml-auto text-gray-400 flex-shrink-0">
                        🔒
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm mt-0.5 ${isLocked ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {activity.desc}
                  </p>
                </div>

                {/* CTA arrow for active */}
                {isActive && (
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full ${gradeColors[student.grade]} text-white flex items-center justify-center`}
                  >
                    ▶
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Badges */}
        {student.badges.length > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-teal-100">
            <p className="font-semibold text-gray-700 text-lg mb-2">
              🏅 Your Badges
            </p>
            <div className="flex flex-wrap gap-2">
              {student.badges.map((b) => (
                <span
                  key={b}
                  className="bg-teal-100 text-teal-800 text-sm font-semibold px-3 py-1 rounded-full"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        )}

        <Button
          data-ocid="dashboard.report.button"
          onClick={() => onNavigate("report")}
          variant="outline"
          className="w-full h-12 text-lg rounded-xl border-teal-300 text-teal-700 hover:bg-teal-50"
        >
          📊 View My Progress Report
        </Button>

        <Button
          data-ocid="dashboard.back_home.button"
          onClick={onBackToHome}
          variant="outline"
          className="w-full h-12 text-lg rounded-xl border-gray-300 text-gray-600 hover:bg-gray-50"
        >
          🏠 Back to Home
        </Button>
      </div>
    </div>
  );
}
