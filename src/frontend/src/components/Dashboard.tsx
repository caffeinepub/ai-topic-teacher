import AppHeader from "@/components/AppHeader";
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
  onNavigate: (screen: Screen) => void;
  onBackToHome: () => void;
}

const gradeColors = [
  "",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-rose-500",
];
const gradeTextColors = [
  "",
  "text-emerald-600",
  "text-blue-600",
  "text-purple-600",
  "text-orange-600",
  "text-rose-600",
];

const recordFeature = {
  id: "record" as Screen,
  icon: "🎙️",
  title: "Read & Record",
  desc: "Record yourself reading and play it back",
  color: "bg-rose-50 border-rose-200",
};

export default function Dashboard({
  student,
  onNavigate,
  onBackToHome,
}: Props) {
  const totalSessions = student.sessions.length;
  const progress = Math.min(((totalSessions % 5) / 5) * 100, 100);

  return (
    <div className="min-h-screen bg-amber-50">
      <AppHeader />
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
            <div className="bg-white/20 rounded-2xl px-4 py-2 text-right">
              <p className="text-white/80 text-sm">Current Level</p>
              <p className="text-white font-bold text-2xl">
                Grade {student.grade}
              </p>
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
        <button
          type="button"
          data-ocid="dashboard.record.button"
          onClick={() => onNavigate(recordFeature.id)}
          className={`w-full ${recordFeature.color} border-2 rounded-2xl p-5 text-left flex items-center gap-4 hover:scale-[1.01] transition-all`}
        >
          <span className="text-4xl">{recordFeature.icon}</span>
          <div>
            <p
              className={`font-bold text-lg ${gradeTextColors[student.grade]}`}
            >
              {recordFeature.title}
            </p>
            <p className="text-gray-500 text-base">{recordFeature.desc}</p>
          </div>
        </button>

        {student.badges.length > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-amber-100">
            <p className="font-semibold text-gray-700 text-lg mb-2">
              🏅 Your Badges
            </p>
            <div className="flex flex-wrap gap-2">
              {student.badges.map((b) => (
                <span
                  key={b}
                  className="bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full"
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
          className="w-full h-12 text-lg rounded-xl border-amber-300 text-amber-700 hover:bg-amber-50"
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
