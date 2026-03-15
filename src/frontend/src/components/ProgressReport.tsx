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

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function WordChip({
  word,
  status,
  heard,
}: { word: string; status: string; heard?: string }) {
  const cls =
    status === "correct"
      ? "bg-green-100 text-green-800"
      : status === "mispronounced"
        ? "bg-orange-100 text-orange-800"
        : "bg-red-100 text-red-700 line-through";
  return (
    <span
      className={`text-xs px-2 py-1 rounded-lg font-medium ${cls}`}
      title={status === "mispronounced" && heard ? `Heard: ${heard}` : status}
    >
      {word}
    </span>
  );
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
            className={`text-xs font-bold px-2 py-1 rounded-full ${passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
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
                key={`q-${qi}`}
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
                        key={`opt-${oi}`}
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

function TrendBadge({ sessions }: { sessions: Session[] }) {
  if (sessions.length < 4) return null;
  const first3 = sessions.slice(0, 3);
  const last3 = sessions.slice(-3);
  const avgFirst = first3.reduce((a, s) => a + s.score, 0) / 3;
  const avgLast = last3.reduce((a, s) => a + s.score, 0) / 3;
  const diff = avgLast - avgFirst;
  if (diff > 5)
    return (
      <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
        ↑ Improving
      </span>
    );
  if (diff < -5)
    return (
      <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-100 text-red-600">
        ↓ Declining
      </span>
    );
  return (
    <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-600">
      → Steady
    </span>
  );
}

function ActivityBar({
  label,
  score,
  color,
}: { label: string; score: number; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <span className="text-xs text-gray-500 font-medium">{score}%</span>
      <div
        className="w-full rounded-t-lg transition-all"
        style={{
          height: `${Math.max(4, (score / 100) * 72)}px`,
          background: color,
        }}
      />
      <span className="text-xs text-gray-400">{label}</span>
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
  const allSessions = student.sessions;
  const recordSessions = allSessions.filter((s) => s.activity === "record");
  const quizSessions = allSessions.filter((s) => s.activity === "quiz");
  const missingSessions = allSessions.filter(
    (s) => s.activity === "missing-words",
  );
  const pronunciationSessions = allSessions.filter(
    (s) => s.activity === "pronunciation",
  );
  const intonationSessions = allSessions.filter(
    (s) => s.activity === "intonation",
  );

  const latestRecord = recordSessions[recordSessions.length - 1] ?? null;
  const prevRecord =
    recordSessions.length >= 2
      ? recordSessions[recordSessions.length - 2]
      : null;
  const latestQuiz = quizSessions[quizSessions.length - 1] ?? null;
  const latestMissing = missingSessions[missingSessions.length - 1] ?? null;
  const latestPronunciation =
    pronunciationSessions[pronunciationSessions.length - 1] ?? null;
  const latestIntonation =
    intonationSessions[intonationSessions.length - 1] ?? null;

  // Build chart data from all sessions (last 10)
  const chartSessions = allSessions.slice(-10);
  const activityColors: Record<string, string> = {
    record: "#f59e0b",
    quiz: "#3b82f6",
    "missing-words": "#eab308",
    pronunciation: "#a855f7",
    intonation: "#22c55e",
  };
  const activityLabels: Record<string, string> = {
    record: "RR",
    quiz: "Q",
    "missing-words": "MW",
    pronunciation: "P",
    intonation: "I",
  };

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
            📊 Activity Report
          </h2>
          <p className="text-white/70 text-sm mt-1">
            {student.name}'s Learning Journey
          </p>
        </div>

        <div className="p-4 space-y-5">
          {/* ── OVERALL SUMMARY ── */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-3">
              📋 Overall Summary
            </p>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <p className="text-3xl font-bold text-blue-600">
                  {student.grade}
                </p>
                <p className="text-gray-500 text-xs mt-1">Grade</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <p className="text-3xl font-bold text-green-600">
                  {allSessions.length}
                </p>
                <p className="text-gray-500 text-xs mt-1">Sessions</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <p className="text-3xl font-bold text-purple-600">
                  {averageScore}%
                </p>
                <p className="text-gray-500 text-xs mt-1">Avg Score</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">Trend:</span>
              <TrendBadge sessions={allSessions} />
              {allSessions.length < 4 && (
                <span className="text-xs text-gray-400">
                  Complete more sessions for trend
                </span>
              )}
            </div>
          </div>

          {/* ── PROGRESS CHART ── */}
          {chartSessions.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="font-semibold text-gray-700 mb-1">
                📈 Score History
              </p>
              <p className="text-xs text-gray-400 mb-3">
                <span className="inline-flex items-center gap-1 mr-2">
                  <span
                    className="w-2 h-2 rounded-sm inline-block"
                    style={{ background: "#f59e0b" }}
                  />
                  RR=Read&amp;Record
                </span>
                <span className="inline-flex items-center gap-1 mr-2">
                  <span
                    className="w-2 h-2 rounded-sm inline-block"
                    style={{ background: "#3b82f6" }}
                  />
                  Q=Quiz
                </span>
                <span className="inline-flex items-center gap-1 mr-2">
                  <span
                    className="w-2 h-2 rounded-sm inline-block"
                    style={{ background: "#a855f7" }}
                  />
                  P=Pronunciation
                </span>
                <span className="inline-flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-sm inline-block"
                    style={{ background: "#22c55e" }}
                  />
                  I=Intonation
                </span>
              </p>
              <div className="flex items-end gap-1.5 h-24">
                {chartSessions.map((s, i) => (
                  <ActivityBar
                    // biome-ignore lint/suspicious/noArrayIndexKey: chart stable
                    key={`chart-${i}`}
                    label={activityLabels[s.activity] ?? "?"}
                    score={s.score}
                    color={activityColors[s.activity] ?? "#9ca3af"}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── READ & RECORD ── */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <p className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-3">
              🎤 Read &amp; Record
            </p>
            {latestRecord ? (
              <div className="space-y-3">
                {prevRecord && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">
                      Last time:{" "}
                      <span className="font-semibold">{prevRecord.score}%</span>
                    </span>
                    <span className="text-gray-400">→</span>
                    <span className="text-gray-700">
                      This time:{" "}
                      <span
                        className={`font-bold ${latestRecord.score >= prevRecord.score ? "text-green-600" : "text-red-500"}`}
                      >
                        {latestRecord.score}%
                      </span>
                    </span>
                    {latestRecord.score >= prevRecord.score ? (
                      <span className="text-green-600 text-xs">
                        ↑ Improved!
                      </span>
                    ) : (
                      <span className="text-red-500 text-xs">
                        ↓ Keep practicing
                      </span>
                    )}
                  </div>
                )}
                <div className="bg-white rounded-xl p-3 border border-amber-100">
                  <p className="text-xs text-gray-500 mb-2 font-semibold">
                    {latestRecord.passageTitle || "Passage"} —{" "}
                    {formatDate(latestRecord.timestamp)}
                  </p>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <div className="text-center">
                      <p className="text-xl font-bold text-blue-600">
                        {latestRecord.score}%
                      </p>
                      <p className="text-xs text-gray-400">Accuracy</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-green-600">
                        {latestRecord.wordResults?.filter(
                          (w) => w.status === "correct",
                        ).length ?? 0}
                      </p>
                      <p className="text-xs text-gray-400">Correct</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-orange-500">
                        {latestRecord.wordResults?.filter(
                          (w) => w.status === "mispronounced",
                        ).length ?? 0}
                      </p>
                      <p className="text-xs text-gray-400">Mispron.</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-red-500">
                        {latestRecord.wordResults?.filter(
                          (w) => w.status === "missed",
                        ).length ?? 0}
                      </p>
                      <p className="text-xs text-gray-400">Missed</p>
                    </div>
                  </div>
                  {latestRecord.wordResults &&
                    latestRecord.wordResults.length > 0 && (
                      <>
                        <p className="text-xs font-semibold text-gray-500 mb-2">
                          Word Breakdown:
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {latestRecord.wordResults.map((w, wi) => (
                            <WordChip
                              // biome-ignore lint/suspicious/noArrayIndexKey: stable
                              key={`wr-${wi}`}
                              word={w.original}
                              status={w.status}
                              heard={w.heard}
                            />
                          ))}
                        </div>
                        {latestRecord.wordResults.some(
                          (w) => w.status === "mispronounced",
                        ) && (
                          <div className="bg-orange-50 rounded-lg p-2 mb-2">
                            <p className="text-xs font-bold text-orange-700 mb-1">
                              Mispronounced Words:
                            </p>
                            <ul className="space-y-0.5">
                              {latestRecord.wordResults
                                .filter((w) => w.status === "mispronounced")
                                .map((w, i) => (
                                  <li
                                    // biome-ignore lint/suspicious/noArrayIndexKey: stable
                                    key={`mp-${i}`}
                                    className="text-xs text-orange-800"
                                  >
                                    •{" "}
                                    <span className="font-semibold">
                                      {w.original}
                                    </span>
                                    {w.heard ? (
                                      <span className="text-orange-500">
                                        {" "}
                                        (you said: "{w.heard}")
                                      </span>
                                    ) : null}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                        {latestRecord.wordResults.some(
                          (w) => w.status === "missed",
                        ) && (
                          <div className="bg-red-50 rounded-lg p-2">
                            <p className="text-xs font-bold text-red-700 mb-1">
                              Missed Words:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {latestRecord.wordResults
                                .filter((w) => w.status === "missed")
                                .map((w, i) => (
                                  <span
                                    // biome-ignore lint/suspicious/noArrayIndexKey: stable
                                    key={`ms-${i}`}
                                    className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded line-through font-medium"
                                  >
                                    {w.original}
                                  </span>
                                ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                </div>
                <div className="flex gap-2 text-xs text-gray-400">
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
            ) : (
              <div
                data-ocid="report.record.empty_state"
                className="text-center py-6 text-gray-400 text-sm"
              >
                No recording sessions yet. Try Read &amp; Record!
              </div>
            )}
          </div>

          {/* ── READ & QUIZ ── */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
            <p className="font-bold text-blue-800 text-sm uppercase tracking-wide mb-3">
              📖 Read &amp; Quiz
            </p>
            {latestQuiz ? (
              <QuizSessionCard s={latestQuiz} idx={0} />
            ) : (
              <div
                data-ocid="report.quiz.empty_state"
                className="text-center py-6 text-gray-400 text-sm"
              >
                No quiz attempts yet. Start a Read &amp; Quiz session!
              </div>
            )}
          </div>

          {/* ── MISSING WORDS ── */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4">
            <p className="font-bold text-yellow-800 text-sm uppercase tracking-wide mb-3">
              ✏️ Missing Words
            </p>
            {latestMissing ? (
              <div
                data-ocid="report.missing-words.item.1"
                className="bg-white rounded-xl border border-yellow-100 px-4 py-3 flex items-center justify-between shadow-sm"
              >
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {latestMissing.passageTitle || "Passage"}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatDate(latestMissing.timestamp)}
                  </p>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
                  ✓ Completed
                </span>
              </div>
            ) : (
              <div
                data-ocid="report.missing-words.empty_state"
                className="text-center py-6 text-gray-400 text-sm"
              >
                No Missing Words attempts yet.
              </div>
            )}
          </div>

          {/* ── PRONUNCIATION ── */}
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
            <p className="font-bold text-purple-800 text-sm uppercase tracking-wide mb-3">
              🗣️ Pronunciation
            </p>
            {latestPronunciation ? (
              <div
                data-ocid="report.pronunciation.item.1"
                className="bg-white rounded-xl border border-purple-100 px-4 py-3 flex items-center justify-between shadow-sm"
              >
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {latestPronunciation.passageTitle || "Passage"}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatDate(latestPronunciation.timestamp)}
                  </p>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
                  ✓ Completed
                </span>
              </div>
            ) : (
              <div
                data-ocid="report.pronunciation.empty_state"
                className="text-center py-6 text-gray-400 text-sm"
              >
                No Pronunciation sessions yet.
              </div>
            )}
          </div>

          {/* ── INTONATION ── */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
            <p className="font-bold text-green-800 text-sm uppercase tracking-wide mb-3">
              🎵 Intonation
            </p>
            {latestIntonation ? (
              <div
                data-ocid="report.intonation.item.1"
                className="bg-white rounded-xl border border-green-100 px-4 py-3 flex items-center justify-between shadow-sm"
              >
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {latestIntonation.passageTitle || "Passage"}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatDate(latestIntonation.timestamp)}
                  </p>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
                  ✓ Completed
                </span>
              </div>
            ) : (
              <div
                data-ocid="report.intonation.empty_state"
                className="text-center py-6 text-gray-400 text-sm"
              >
                No Intonation sessions yet.
              </div>
            )}
          </div>

          {/* ── PRACTICE ACTIVITIES ── */}
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

          {/* ── BADGES ── */}
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
