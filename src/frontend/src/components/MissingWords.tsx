import { Button } from "@/components/ui/button";
import type { Passage } from "@/data/content";
import { useState } from "react";

interface Props {
  passage: Passage;
  onComplete: (score: number) => void;
  onBack: () => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MissingWords({ passage, onComplete, onBack }: Props) {
  const { missingWords } = passage;
  const [shuffledWordBank] = useState(() =>
    shuffleArray(missingWords.wordBank),
  );
  const [filled, setFilled] = useState<(string | null)[]>(
    Array(missingWords.answers.length).fill(null),
  );
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const handleWordSelect = (word: string) => {
    if (usedWords.has(word)) {
      const idx = filled.indexOf(word);
      if (idx !== -1) {
        const newFilled = [...filled];
        newFilled[idx] = null;
        setFilled(newFilled);
        setUsedWords((prev) => {
          const n = new Set(prev);
          n.delete(word);
          return n;
        });
      }
      return;
    }
    const idx = filled.indexOf(null);
    if (idx !== -1) {
      const newFilled = [...filled];
      newFilled[idx] = word;
      setFilled(newFilled);
      setUsedWords((prev) => new Set([...prev, word]));
    }
  };

  const clearSlot = (i: number) => {
    const word = filled[i];
    if (!word) return;
    const newFilled = [...filled];
    newFilled[i] = null;
    setFilled(newFilled);
    setUsedWords((prev) => {
      const n = new Set(prev);
      n.delete(word);
      return n;
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const correct = filled.filter(
      (f, i) => f === missingWords.answers[i],
    ).length;
    const score = Math.round((correct / missingWords.answers.length) * 100);
    onComplete(score);
  };

  const renderSentence = (sentence: string, idx: number) => {
    const parts = sentence.split("___");
    const answer = filled[idx];
    const isCorrect = submitted && answer === missingWords.answers[idx];
    const isWrong = submitted && answer !== missingWords.answers[idx];
    return (
      <div
        key={`sentence-${idx}`}
        className="bg-amber-50 rounded-xl p-3 text-lg leading-relaxed"
      >
        {parts[0]}
        <button
          type="button"
          data-ocid={`missing.blank.${idx + 1}`}
          onClick={() => !submitted && clearSlot(idx)}
          className={`inline-block min-w-[80px] px-3 py-0.5 mx-1 rounded-lg border-2 font-semibold transition-all ${submitted ? (isCorrect ? "border-green-400 bg-green-100 text-green-800" : "border-rose-400 bg-rose-100 text-rose-800") : answer ? "border-blue-400 bg-blue-100 text-blue-800 cursor-pointer" : "border-dashed border-gray-400 text-gray-400"}`}
        >
          {answer || "___"}
        </button>
        {parts[1]}
        {submitted && isWrong && (
          <span className="ml-2 text-sm text-green-600 font-semibold">
            (✓ {missingWords.answers[idx]})
          </span>
        )}
      </div>
    );
  };

  if (submitted) {
    const correct = filled.filter(
      (f, i) => f === missingWords.answers[i],
    ).length;
    const score = Math.round((correct / missingWords.answers.length) * 100);
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-md mx-auto pt-10">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">
              {score >= 80 ? "⭐" : score >= 50 ? "👏" : "💪"}
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-800">
              {score}% Correct!
            </h2>
          </div>
          <div className="space-y-3 mb-6">
            {missingWords.sentences.map((s, i) => renderSentence(s, i))}
          </div>
          <Button
            data-ocid="missing.done.button"
            onClick={onBack}
            className="w-full rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white h-12 text-lg"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto">
        <div className="bg-yellow-500 text-white px-4 pt-10 pb-6">
          <button
            type="button"
            data-ocid="missing.back.button"
            onClick={onBack}
            className="text-white/80 text-sm mb-3"
          >
            ← Back
          </button>
          <h2 className="font-display text-2xl font-bold">✏️ Missing Words</h2>
          <p className="text-white/80 text-sm mt-1">
            Tap a word from the bank to fill in the blanks
          </p>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-3">
            {missingWords.sentences.map((s, i) => renderSentence(s, i))}
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-gray-500 text-sm font-semibold mb-3">
              Word Bank:
            </p>
            <div className="flex flex-wrap gap-2">
              {shuffledWordBank.map((word) => (
                <button
                  key={word}
                  type="button"
                  data-ocid={`missing.word.${word}`}
                  onClick={() => handleWordSelect(word)}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm border-2 transition-all ${usedWords.has(word) ? "border-gray-200 bg-gray-100 text-gray-400 line-through" : "border-yellow-300 bg-yellow-50 text-yellow-800 hover:bg-yellow-100"}`}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
          <Button
            data-ocid="missing.submit.button"
            disabled={filled.includes(null)}
            onClick={handleSubmit}
            className="w-full h-12 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white text-lg"
          >
            Check My Answers
          </Button>
        </div>
      </div>
    </div>
  );
}
