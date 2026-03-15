import { Button } from "@/components/ui/button";
import type { StudentData } from "@/store/useStudentStore";

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
  averageScore: number;
  onBack: () => void;
  onReset: () => void;
  onNavigate?: (screen: Screen) => void;
}

const allBadges = [
  { name: "Quiz Champion", emoji: "🏆", desc: "Complete 3 quizzes" },
  { name: "Recording Star", emoji: "🌟", desc: "Record yourself 2 times" },
  {
    name: "Word Wizard",
    emoji: "🧙",
    desc: "Complete 2 missing word exercises",
  },
  {
    name: "Pronunciation Pro",
    emoji: "🗣️",
    desc: "Practice pronunciation 2 times",
  },
  { name: "Chunk Master", emoji: "📚", desc: "Complete 5 activities" },
];

const activityLabels: Record<string, string> = {
  quiz: "📖 Quiz",
  "missing-words": "✏️ Missing Words",
  record: "🎙️ Record",
  pronunciation: "🗣️ Pronunciation",
  intonation: "🎵 Intonation",
};

const practiceActivities: {
  id: Screen;
  icon: string;
  title: string;
  color: string;
  textColor: string;
}[] = [
  {
    id: "passage",
    icon: "📖",
    title: "Read & Quiz",
    color: "bg-blue-50 border-blue-200",
    textColor: "text-blue-700",
  },
  {
    id: "missing-words",
    icon: "✏️",
    title: "Missing Words",
    color: "bg-yellow-50 border-yellow-200",
    textColor: "text-yellow-700",
  },
  {
    id: "pronunciation",
    icon: "🗣️",
    title: "Pronunciation",
    color: "bg-purple-50 border-purple-200",
    textColor: "text-purple-700",
  },
  {
    id: "intonation",
    icon: "🎵",
    title: "Intonation",
    color: "bg-green-50 border-green-200",
    textColor: "text-green-700",
  },
];

export default function ProgressReport({
  student,
  averageScore,
  onBack,
  onReset,
  onNavigate,
}: Props) {
  const quizSessions = student.sessions.filter((s) => s.activity === "quiz");
  const gradeHistory = quizSessions.map((s) => s.grade);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto">
        <div className="w-full bg-white border-b border-gray-100 py-3 px-4 text-center">
          <span className="text-2xl font-extrabold text-black tracking-widest">
            CLASSIO
          </span>
        </div>
        <div className="bg-amber-500 text-white px-4 pt-6 pb-6">
          <button
            type="button"
            data-ocid="report.back.button"
            onClick={onBack}
            className="text-white/80 text-sm mb-3"
          >
            ← Back
          </button>
          <h2 className="font-display text-2xl font-bold">
            📊 Progress Report
          </h2>
          <p className="text-white/70 text-sm mt-1">
            {student.name}'s Learning Journey
          </p>
        </div>
        <div className="p-4 space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-2xl p-3 text-center">
              <p className="text-3xl font-bold text-blue-600">
                {student.grade}
              </p>
              <p className="text-gray-500 text-xs mt-1">Current Grade</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-3 text-center">
              <p className="text-3xl font-bold text-green-600">
                {student.sessions.length}
              </p>
              <p className="text-gray-500 text-xs mt-1">Activities</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-3 text-center">
              <p className="text-3xl font-bold text-purple-600">
                {averageScore}%
              </p>
              <p className="text-gray-500 text-xs mt-1">Avg Score</p>
            </div>
          </div>

          {onNavigate && (
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="font-semibold text-gray-700 mb-3">
                🎯 Practice Activities
              </p>
              <div className="grid grid-cols-2 gap-2">
                {practiceActivities.map((a, idx) => (
                  <button
                    key={a.id}
                    type="button"
                    data-ocid={`report.activity.button.${idx + 1}`}
                    onClick={() => onNavigate(a.id)}
                    className={`${a.color} border-2 rounded-xl p-3 text-left flex items-center gap-2 hover:scale-[1.02] transition-all`}
                  >
                    <span className="text-xl">{a.icon}</span>
                    <p className={`font-semibold text-xs ${a.textColor}`}>
                      {a.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {gradeHistory.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="font-semibold text-gray-700 mb-3">
                Grade Level Progress
              </p>
              <div className="flex items-end gap-2 h-24">
                {quizSessions.map((qs) => (
                  <div
                    key={qs.id}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <span className="text-xs text-gray-400">{qs.grade}</span>
                    <div
                      className="w-full rounded-t-lg bg-blue-400 transition-all"
                      style={{ height: `${(qs.grade / 5) * 80}px` }}
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">Quiz sessions</p>
            </div>
          )}

          <div className="bg-amber-50 rounded-2xl p-4">
            <p className="font-semibold text-gray-700 mb-3">🏅 Badges</p>
            <div className="space-y-2">
              {allBadges.map((b) => {
                const earned = student.badges.includes(b.name);
                return (
                  <div
                    key={b.name}
                    className={`flex items-center gap-3 p-3 rounded-xl ${earned ? "bg-white border-2 border-amber-300" : "bg-gray-100 opacity-50"}`}
                  >
                    <span className="text-2xl">{b.emoji}</span>
                    <div>
                      <p
                        className={`font-semibold text-sm ${earned ? "text-amber-800" : "text-gray-500"}`}
                      >
                        {b.name}
                      </p>
                      <p className="text-xs text-gray-400">{b.desc}</p>
                    </div>
                    {earned && (
                      <span className="ml-auto text-green-500 text-lg">✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {student.sessions.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="font-semibold text-gray-700 mb-3">
                Recent Activity
              </p>
              <div className="space-y-2">
                {student.sessions
                  .slice(-5)
                  .reverse()
                  .map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{activityLabels[s.activity] || s.activity}</span>
                      <span className="text-gray-500">
                        {s.activity === "quiz" ? `${s.score}%` : "✓"}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <Button
            data-ocid="report.reset.button"
            variant="outline"
            onClick={onReset}
            className="w-full rounded-xl border-rose-200 text-rose-500 hover:bg-rose-50"
          >
            Reset Progress
          </Button>
        </div>
      </div>
    </div>
  );
}
