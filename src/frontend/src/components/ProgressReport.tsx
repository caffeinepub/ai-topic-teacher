import { Button } from "@/components/ui/button";
import { passages } from "@/data/content";
import type { StudentData } from "@/store/useStudentStore";
import { useState } from "react";

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
  record: "🎤 Record",
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
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  const recentSessions = student.sessions.slice(-5).reverse();

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
              <div className="space-y-3">
                {recentSessions.map((s, idx) => {
                  const isQuiz = s.activity === "quiz";
                  const hasAnswers =
                    isQuiz && s.quizAnswers && s.quizAnswers.length > 0;
                  const passageData = hasAnswers
                    ? passages.find((p) => p.id === s.passageId)
                    : null;
                  const isExpanded = expandedSession === s.id;
                  const passed = isQuiz && s.score > 40;

                  return (
                    <div
                      key={s.id}
                      data-ocid={`report.item.${idx + 1}`}
                      className="bg-white rounded-xl border border-gray-100 overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-3 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            {activityLabels[s.activity] || s.activity}
                          </span>
                          {s.passageTitle && (
                            <span className="text-xs text-gray-400 truncate max-w-[100px]">
                              {s.passageTitle}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {isQuiz ? (
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                passed
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {passed ? "PASS" : "FAIL"} {s.score}%
                            </span>
                          ) : (
                            <span className="text-gray-500 text-sm">✓</span>
                          )}
                          {hasAnswers && passageData && (
                            <button
                              type="button"
                              data-ocid={`report.item.toggle.${idx + 1}`}
                              onClick={() =>
                                setExpandedSession(isExpanded ? null : s.id)
                              }
                              className="text-xs text-blue-600 font-semibold underline ml-1"
                            >
                              {isExpanded ? "Hide" : "Review"}
                            </button>
                          )}
                        </div>
                      </div>

                      {isExpanded && passageData && s.quizAnswers && (
                        <div className="border-t border-gray-100 px-3 py-3 space-y-3 bg-gray-50">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                            📋 Question Review
                          </p>
                          {passageData.questions.map((q, qi) => {
                            const studentAnswer = s.quizAnswers![qi];
                            const isCorrect = studentAnswer === q.correct;
                            return (
                              <div
                                // biome-ignore lint/suspicious/noArrayIndexKey: questions are stable
                                key={qi}
                                className="bg-white rounded-xl p-3 border border-gray-100"
                              >
                                <p className="text-sm font-semibold text-gray-800 mb-2">
                                  <span className="text-blue-500 mr-1">
                                    Q{qi + 1}.
                                  </span>
                                  {q.question}
                                </p>
                                <div className="space-y-1">
                                  {q.options.map((opt, oi) => {
                                    const isStudentChoice =
                                      studentAnswer === oi;
                                    const isCorrectAnswer = q.correct === oi;

                                    let bgClass =
                                      "bg-gray-50 border-gray-200 text-gray-500";
                                    let icon = "";

                                    if (isStudentChoice && isCorrect) {
                                      bgClass =
                                        "bg-green-50 border-green-400 text-green-800";
                                      icon = "✅";
                                    } else if (isStudentChoice && !isCorrect) {
                                      bgClass =
                                        "bg-red-50 border-red-400 text-red-800";
                                      icon = "❌";
                                    } else if (!isCorrect && isCorrectAnswer) {
                                      bgClass =
                                        "bg-green-50 border-green-300 text-green-700";
                                      icon = "✔️";
                                    }

                                    return (
                                      <div
                                        // biome-ignore lint/suspicious/noArrayIndexKey: options stable
                                        key={oi}
                                        className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border text-xs font-medium ${bgClass}`}
                                      >
                                        <span className="font-bold text-gray-400">
                                          {String.fromCharCode(65 + oi)}.
                                        </span>
                                        <span className="flex-1">{opt}</span>
                                        {icon && <span>{icon}</span>}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
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
