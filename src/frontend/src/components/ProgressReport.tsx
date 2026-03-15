import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { passages } from "@/data/content";
import type { Session, StudentData } from "@/store/useStudentStore";
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

type ActivityTab =
  | "quiz"
  | "record"
  | "missing-words"
  | "pronunciation"
  | "intonation";

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

const activityTabs: { id: ActivityTab; label: string; icon: string }[] = [
  { id: "quiz", label: "Read & Quiz", icon: "📖" },
  { id: "record", label: "Read & Record", icon: "🎤" },
  { id: "missing-words", label: "Missing Words", icon: "✏️" },
  { id: "pronunciation", label: "Pronunciation", icon: "🗣️" },
  { id: "intonation", label: "Intonation", icon: "🎵" },
];

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function QuizSessionCard({ s, idx }: { s: Session; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  const passageData = passages.find((p) => p.id === s.passageId);
  const passed = s.score > 40;
  const quizScore = s.quizAnswers
    ? s.quizAnswers.filter(
        (ans, qi) => passageData && ans === passageData.questions[qi]?.correct,
      ).length
    : 0;
  const totalQ = passageData?.questions.length ?? 5;

  return (
    <div
      data-ocid={`report.quiz.item.${idx + 1}`}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 text-sm truncate">
            {s.passageTitle || passageData?.title || "Passage"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {formatDate(s.timestamp)}
          </p>
        </div>
        <div className="flex items-center gap-2 ml-3 flex-shrink-0">
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${
              passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {passed ? "PASS" : "FAIL"}
          </span>
          <span className="text-xs text-gray-500 font-medium">
            {quizScore}/{totalQ} · {s.score}%
          </span>
          {passageData && s.quizAnswers && (
            <button
              type="button"
              data-ocid={`report.quiz.toggle.${idx + 1}`}
              onClick={() => setExpanded((e) => !e)}
              className="text-xs text-blue-600 font-semibold underline"
            >
              {expanded ? "Hide" : "Review"}
            </button>
          )}
        </div>
      </div>

      {/* Word results summary if available */}
      {s.wordResults && s.wordResults.length > 0 && (
        <div className="px-4 pb-3 flex gap-3">
          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
            ✓ {s.wordResults.filter((w) => w.status === "correct").length}{" "}
            correct
          </span>
          <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">
            ~ {s.wordResults.filter((w) => w.status === "mispronounced").length}{" "}
            mispronounced
          </span>
          <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
            ✗ {s.wordResults.filter((w) => w.status === "missed").length} missed
          </span>
        </div>
      )}

      {expanded && passageData && s.quizAnswers && (
        <div className="border-t border-gray-100 px-4 py-3 space-y-3 bg-gray-50">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            📋 Question Review
          </p>
          {passageData.questions.map((q, qi) => {
            const studentAnswer = s.quizAnswers![qi];
            const isCorrect = studentAnswer === q.correct;
            return (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: questions stable
                key={qi}
                className="bg-white rounded-xl p-3 border border-gray-100"
              >
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  <span className="text-blue-500 mr-1">Q{qi + 1}.</span>
                  {q.question}
                </p>
                <div className="space-y-1">
                  {q.options.map((opt, oi) => {
                    const isStudentChoice = studentAnswer === oi;
                    const isCorrectAnswer = q.correct === oi;
                    let bgClass = "bg-gray-50 border-gray-200 text-gray-500";
                    let icon = "";
                    if (isStudentChoice && isCorrect) {
                      bgClass = "bg-green-50 border-green-400 text-green-800";
                      icon = "✅";
                    } else if (isStudentChoice && !isCorrect) {
                      bgClass = "bg-red-50 border-red-400 text-red-800";
                      icon = "❌";
                    } else if (!isStudentChoice && isCorrectAnswer) {
                      bgClass = "bg-green-50 border-green-300 text-green-700";
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
}

function RecordSessionCard({ s, idx }: { s: Session; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  const passageData = passages.find((p) => p.id === s.passageId);
  const wrs = s.wordResults ?? [];
  const correctCount = wrs.filter((w) => w.status === "correct").length;
  const misPronCount = wrs.filter((w) => w.status === "mispronounced").length;
  const missedCount = wrs.filter((w) => w.status === "missed").length;

  return (
    <div
      data-ocid={`report.record.item.${idx + 1}`}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 text-sm truncate">
            {s.passageTitle || passageData?.title || "Passage"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {formatDate(s.timestamp)}
          </p>
        </div>
        <div className="flex items-center gap-2 ml-3 flex-shrink-0">
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-700">
            {s.score}% accuracy
          </span>
          {wrs.length > 0 && (
            <button
              type="button"
              data-ocid={`report.record.toggle.${idx + 1}`}
              onClick={() => setExpanded((e) => !e)}
              className="text-xs text-blue-600 font-semibold underline"
            >
              {expanded ? "Hide" : "Details"}
            </button>
          )}
        </div>
      </div>

      {wrs.length > 0 && (
        <div className="px-4 pb-3 flex gap-3 flex-wrap">
          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
            ✓ {correctCount} correct
          </span>
          <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">
            ~ {misPronCount} mispronounced
          </span>
          <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
            ✗ {missedCount} missed
          </span>
        </div>
      )}

      {expanded && wrs.length > 0 && (
        <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
            🎤 Word Breakdown
          </p>
          <div className="flex flex-wrap gap-1.5">
            {wrs.map((w, wi) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: stable positions
                key={wi}
                className={`text-xs px-2 py-1 rounded-lg font-medium ${
                  w.status === "correct"
                    ? "bg-green-100 text-green-800"
                    : w.status === "mispronounced"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-red-100 text-red-700 line-through"
                }`}
                title={
                  w.status === "mispronounced" && w.heard
                    ? `Heard: ${w.heard}`
                    : w.status
                }
              >
                {w.original}
              </span>
            ))}
          </div>
          <div className="mt-2 flex gap-4 text-xs text-gray-400">
            <span>
              <span className="inline-block w-2 h-2 rounded-sm bg-green-400 mr-1" />
              Correct
            </span>
            <span>
              <span className="inline-block w-2 h-2 rounded-sm bg-orange-400 mr-1" />
              Mispronounced
            </span>
            <span>
              <span className="inline-block w-2 h-2 rounded-sm bg-red-400 mr-1" />
              Missed
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function SimpleSessionCard({
  s,
  idx,
  activityIcon,
}: { s: Session; idx: number; activityIcon: string }) {
  const passageData = passages.find((p) => p.id === s.passageId);
  return (
    <div
      data-ocid={`report.activity.item.${idx + 1}`}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 text-sm truncate">
            {s.passageTitle || passageData?.title || "Passage"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {formatDate(s.timestamp)}
          </p>
        </div>
        <div className="flex items-center gap-2 ml-3 flex-shrink-0">
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
            ✓ Completed
          </span>
          <span className="text-lg">{activityIcon}</span>
        </div>
      </div>
    </div>
  );
}

export default function ProgressReport({
  student,
  averageScore,
  onBack,
  onReset,
  onNavigate,
}: Props) {
  const quizSessions = student.sessions.filter((s) => s.activity === "quiz");
  const [activeTab, setActiveTab] = useState<ActivityTab>("quiz");

  const sessionsByActivity = (activity: ActivityTab) =>
    [...student.sessions].filter((s) => s.activity === activity).reverse();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto">
        <AppHeader />
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
          {/* Stats */}
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

          {/* Practice Activities */}
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

          {/* Grade Progress Chart */}
          {quizSessions.length > 0 && (
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

          {/* Badges */}
          <div className="bg-amber-50 rounded-2xl p-4">
            <p className="font-semibold text-gray-700 mb-3">🏅 Badges</p>
            <div className="space-y-2">
              {allBadges.map((b) => {
                const earned = student.badges.includes(b.name);
                return (
                  <div
                    key={b.name}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      earned
                        ? "bg-white border-2 border-amber-300"
                        : "bg-gray-100 opacity-50"
                    }`}
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

          {/* ── VIEW MY REPORTS ── */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="font-semibold text-gray-800 text-base mb-4">
              📋 View My Reports
            </p>

            {/* Tab bar */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 mb-4 scrollbar-hide">
              {activityTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  data-ocid={`report.${tab.id}.tab`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-amber-500 text-white shadow-sm"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Session list */}
            <div className="space-y-3">
              {activeTab === "quiz" &&
                (sessionsByActivity("quiz").length === 0 ? (
                  <div
                    data-ocid="report.quiz.empty_state"
                    className="text-center py-8 text-gray-400 text-sm"
                  >
                    No quiz attempts yet. Start a Read &amp; Quiz session!
                  </div>
                ) : (
                  sessionsByActivity("quiz").map((s, idx) => (
                    <QuizSessionCard key={s.id} s={s} idx={idx} />
                  ))
                ))}

              {activeTab === "record" &&
                (sessionsByActivity("record").length === 0 ? (
                  <div
                    data-ocid="report.record.empty_state"
                    className="text-center py-8 text-gray-400 text-sm"
                  >
                    No recording sessions yet. Try Read &amp; Record!
                  </div>
                ) : (
                  sessionsByActivity("record").map((s, idx) => (
                    <RecordSessionCard key={s.id} s={s} idx={idx} />
                  ))
                ))}

              {activeTab === "missing-words" &&
                (sessionsByActivity("missing-words").length === 0 ? (
                  <div
                    data-ocid="report.missing-words.empty_state"
                    className="text-center py-8 text-gray-400 text-sm"
                  >
                    No Missing Words attempts yet.
                  </div>
                ) : (
                  sessionsByActivity("missing-words").map((s, idx) => (
                    <SimpleSessionCard
                      key={s.id}
                      s={s}
                      idx={idx}
                      activityIcon="✏️"
                    />
                  ))
                ))}

              {activeTab === "pronunciation" &&
                (sessionsByActivity("pronunciation").length === 0 ? (
                  <div
                    data-ocid="report.pronunciation.empty_state"
                    className="text-center py-8 text-gray-400 text-sm"
                  >
                    No Pronunciation sessions yet.
                  </div>
                ) : (
                  sessionsByActivity("pronunciation").map((s, idx) => (
                    <SimpleSessionCard
                      key={s.id}
                      s={s}
                      idx={idx}
                      activityIcon="🗣️"
                    />
                  ))
                ))}

              {activeTab === "intonation" &&
                (sessionsByActivity("intonation").length === 0 ? (
                  <div
                    data-ocid="report.intonation.empty_state"
                    className="text-center py-8 text-gray-400 text-sm"
                  >
                    No Intonation sessions yet.
                  </div>
                ) : (
                  sessionsByActivity("intonation").map((s, idx) => (
                    <SimpleSessionCard
                      key={s.id}
                      s={s}
                      idx={idx}
                      activityIcon="🎵"
                    />
                  ))
                ))}
            </div>
          </div>

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
