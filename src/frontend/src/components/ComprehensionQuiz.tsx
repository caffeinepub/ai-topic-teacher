import AppHeader from "@/components/AppHeader";
import type { WordResult } from "@/components/ReadAndRecord";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Passage } from "@/data/content";
import { useState } from "react";

interface Props {
  passage: Passage;
  wordResults?: WordResult[];
  onComplete: (score: number, passed: boolean, answers: number[]) => void;
  onBack: () => void;
}

export default function ComprehensionQuiz({
  passage,
  wordResults,
  onComplete,
  onBack,
}: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<{
    correct: number;
    score: number;
    passed: boolean;
    finalAnswers: number[];
  } | null>(null);

  const q = passage.questions[current];
  const total = passage.questions.length;
  const progress = (current / total) * 100;

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    if (current + 1 < total) {
      setAnswers(newAnswers);
      setSelected(null);
      setCurrent((c) => c + 1);
    } else {
      const correct = newAnswers.filter(
        (a, i) => a === passage.questions[i].correct,
      ).length;
      const score = Math.round((correct / total) * 100);
      const passed = correct >= 3;
      setAnswers(newAnswers);
      setResultData({ correct, score, passed, finalAnswers: newAnswers });
      setShowResult(true);
      onComplete(score, passed, newAnswers);
    }
  };

  if (showResult && resultData) {
    const { correct, passed, finalAnswers } = resultData;

    const missedCount =
      wordResults?.filter((w) => w.status === "missed").length ?? 0;
    const mispronounced =
      wordResults?.filter((w) => w.status === "mispronounced").length ?? 0;
    const correctWords =
      wordResults?.filter((w) => w.status === "correct").length ?? 0;
    const totalWords = wordResults?.length ?? 0;

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <AppHeader />
        <div className="flex-1 p-4 max-w-md mx-auto w-full space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">{passed ? "🎉" : "💪"}</div>
            <h2 className="font-display text-3xl font-bold text-gray-800 mb-2">
              Quiz Complete!
            </h2>
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {correct}/{total}
            </div>
            <p className="text-gray-600 mb-4">
              You got {correct} out of {total} correct
            </p>

            <div className="flex justify-center mb-4">
              {passed ? (
                <span
                  data-ocid="quiz.success_state"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-green-500 text-white text-2xl font-extrabold tracking-widest shadow-lg"
                >
                  ✅ PASS
                </span>
              ) : (
                <span
                  data-ocid="quiz.error_state"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-red-500 text-white text-2xl font-extrabold tracking-widest shadow-lg"
                >
                  ❌ FAIL
                </span>
              )}
            </div>

            <div
              className={`rounded-2xl p-4 ${
                passed
                  ? "bg-green-50 border border-green-200"
                  : "bg-rose-50 border border-rose-200"
              }`}
            >
              <p
                className={`font-semibold ${
                  passed ? "text-green-700" : "text-rose-700"
                }`}
              >
                {passed
                  ? "🌟 Great job! You can move on to the next passage."
                  : "🔄 You need 3 or more correct to pass. Read the passage again and try once more!"}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-2">
              📋 Question & Answer Review
            </h3>
            <div className="space-y-4">
              {passage.questions.map((q, qi) => {
                const studentAnswer = finalAnswers[qi];
                const isCorrect = studentAnswer === q.correct;
                return (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: questions are stable
                    key={qi}
                    className="bg-gray-50 rounded-2xl p-4 border border-gray-100"
                  >
                    <p className="font-semibold text-gray-800 mb-3">
                      <span className="text-blue-500 mr-1">Q{qi + 1}.</span>{" "}
                      {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => {
                        const isStudentChoice = studentAnswer === oi;
                        const isCorrectAnswer = q.correct === oi;

                        let bgClass = "bg-white border-gray-200 text-gray-600";
                        let icon = "";

                        if (isStudentChoice && isCorrect) {
                          bgClass =
                            "bg-green-50 border-green-400 text-green-800";
                          icon = "✅";
                        } else if (isStudentChoice && !isCorrect) {
                          bgClass = "bg-red-50 border-red-400 text-red-800";
                          icon = "❌";
                        } else if (!isStudentChoice && isCorrectAnswer) {
                          bgClass =
                            "bg-green-50 border-green-300 text-green-700";
                          icon = "✔️";
                        }

                        return (
                          <div
                            // biome-ignore lint/suspicious/noArrayIndexKey: options are stable per question
                            key={oi}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm font-medium ${bgClass}`}
                          >
                            <span className="font-bold text-gray-400 mr-1">
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
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
            <h3 className="font-bold text-indigo-800 text-lg mb-4 flex items-center gap-2">
              📊 Your Full Report
            </h3>

            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500 mb-2">
                Quiz Score
              </p>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-indigo-100">
                <span className="text-3xl font-extrabold text-blue-600">
                  {correct}/{total}
                </span>
                <span className="text-gray-600 text-sm">questions correct</span>
                <span
                  className={`ml-auto font-bold text-sm px-3 py-1 rounded-full ${
                    passed
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {passed ? "PASS" : "FAIL"}
                </span>
              </div>
            </div>

            {totalWords > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500 mb-2">
                  Reading Analysis
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-green-50 rounded-xl p-3 text-center border border-green-200">
                    <div className="text-2xl font-bold text-green-600">
                      {correctWords}
                    </div>
                    <div className="text-xs text-green-700 font-semibold mt-1">
                      Correct Words
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-3 text-center border border-orange-200">
                    <div className="text-2xl font-bold text-orange-600">
                      {mispronounced}
                    </div>
                    <div className="text-xs text-orange-700 font-semibold mt-1">
                      Mispronounced
                    </div>
                  </div>
                  <div className="bg-rose-50 rounded-xl p-3 text-center border border-rose-200">
                    <div className="text-2xl font-bold text-rose-600">
                      {missedCount}
                    </div>
                    <div className="text-xs text-rose-700 font-semibold mt-1">
                      Not Read
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button
            data-ocid="quiz.done.button"
            onClick={onBack}
            className={`w-full h-12 rounded-xl text-white text-lg ${
              passed
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {passed ? "Next Passage →" : "Try Again 🔄"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto">
        <AppHeader />
        <div className="bg-blue-600 text-white px-4 pt-6 pb-6">
          <button
            type="button"
            data-ocid="quiz.back.button"
            onClick={onBack}
            className="text-white/80 text-sm mb-3"
          >
            ← Back
          </button>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-xl font-bold">
              Comprehension Quiz
            </h2>
            <span className="text-white/80 text-sm">
              Q{current + 1}/{total}
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-white/30" />
        </div>
        <div className="p-4 space-y-4">
          <div className="bg-amber-50 rounded-2xl p-4">
            <p className="text-gray-800 text-lg font-semibold leading-relaxed">
              {q.question}
            </p>
          </div>
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                // biome-ignore lint/suspicious/noArrayIndexKey: options are stable per question
                key={i}
                type="button"
                data-ocid={`quiz.option.${i + 1}`}
                onClick={() => setSelected(i)}
                className={`w-full p-4 rounded-xl text-left text-base font-medium border-2 transition-all ${
                  selected === i
                    ? "border-blue-500 bg-blue-50 text-blue-800"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-3 font-bold text-gray-400">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </button>
            ))}
          </div>
          <Button
            data-ocid="quiz.next.button"
            disabled={selected === null}
            onClick={handleNext}
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-lg"
          >
            {current + 1 === total ? "Submit Answers" : "Next Question →"}
          </Button>
        </div>
      </div>
    </div>
  );
}
