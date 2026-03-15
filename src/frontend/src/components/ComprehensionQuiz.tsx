import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Passage } from "@/data/content";
import { useState } from "react";

interface Props {
  passage: Passage;
  onComplete: (score: number, passed: boolean) => void;
  onBack: () => void;
  onRetry: () => void;
}

export default function ComprehensionQuiz({
  passage,
  onComplete,
  onBack,
  onRetry,
}: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<{
    correct: number;
    score: number;
    passed: boolean;
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
      setResultData({ correct, score, passed });
      setShowResult(true);
      onComplete(score, passed);
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
    setResultData(null);
    onRetry();
  };

  if (showResult && resultData) {
    const { correct, score, passed } = resultData;

    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">
            {passed ? (score >= 80 ? "🎉" : "👍") : "💪"}
          </div>
          <h2 className="font-display text-3xl font-bold text-gray-800 mb-2">
            Quiz Complete!
          </h2>
          <div className="text-5xl font-bold text-blue-600 mb-2">{score}%</div>
          <p className="text-gray-600 mb-4">
            {correct} out of {total} correct
          </p>

          {/* PASS / FAIL badge */}
          <div className="flex justify-center mb-6">
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
            className={`rounded-2xl p-4 mb-6 ${
              passed
                ? score >= 80
                  ? "bg-green-50 border border-green-200"
                  : "bg-yellow-50 border border-yellow-200"
                : "bg-rose-50 border border-rose-200"
            }`}
          >
            <p
              className={`font-semibold ${
                passed
                  ? score >= 80
                    ? "text-green-700"
                    : "text-yellow-700"
                  : "text-rose-700"
              }`}
            >
              {passed
                ? score >= 80
                  ? "🌟 Amazing! You're moving up a level!"
                  : "📚 Good effort! Keep practicing at this level."
                : "🔄 Don't give up! Try the same passage again."}
            </p>
          </div>

          {passed ? (
            <Button
              data-ocid="quiz.done.button"
              onClick={onBack}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-lg"
            >
              Next Passage →
            </Button>
          ) : (
            <div className="space-y-3">
              <Button
                data-ocid="quiz.retry.button"
                onClick={handleRetry}
                className="w-full h-12 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-lg"
              >
                Try Again 🔁
              </Button>
              <Button
                data-ocid="quiz.done.button"
                variant="outline"
                onClick={onBack}
                className="w-full h-12 rounded-xl text-gray-600"
              >
                Back to Home
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto">
        <div className="bg-blue-600 text-white px-4 pt-10 pb-6">
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
