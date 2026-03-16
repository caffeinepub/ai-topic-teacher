import type { VocabWord } from "@/data/vocabData";
import { useState } from "react";

interface Props {
  grade: number;
  weekWords: VocabWord[];
  onComplete: (score: number) => void;
  onBack: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

interface Question {
  type: "meaning" | "fill";
  word: VocabWord;
  question: string;
  options: string[];
  correctIndex: number;
}

function buildWeeklyQuestions(words: VocabWord[]): Question[] {
  const shuffled = shuffle(words);
  const selected = shuffled.slice(0, Math.min(10, words.length));
  const q: Question[] = [];

  selected.forEach((w, i) => {
    if (i < Math.ceil(selected.length / 2)) {
      // meaning MCQ
      const distractors = shuffle(words.filter((x) => x.word !== w.word))
        .slice(0, 3)
        .map((x) => x.meaning);
      const options = shuffle([w.meaning, ...distractors.slice(0, 3)]);
      q.push({
        type: "meaning",
        word: w,
        question: `What does "${w.word}" mean?`,
        options,
        correctIndex: options.indexOf(w.meaning),
      });
    } else {
      // fill-in-the-blank
      const blank = w.exampleSentence.replace(
        new RegExp(`\\b${w.word}\\b`, "gi"),
        "___",
      );
      const distractors = shuffle(words.filter((x) => x.word !== w.word))
        .slice(0, 3)
        .map((x) => x.word);
      const options = shuffle([w.word, ...distractors.slice(0, 3)]);
      q.push({
        type: "fill",
        word: w,
        question: `Fill in: "${blank}"`,
        options,
        correctIndex: options.indexOf(w.word),
      });
    }
  });

  return q;
}

export default function WeeklyVocabTest({
  weekWords,
  onComplete,
  onBack,
}: Props) {
  const [questions] = useState<Question[]>(() =>
    buildWeeklyQuestions(weekWords),
  );
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const q = questions[currentQ];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === null) return;
    const correct = selected === q.correctIndex;
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setCurrentQ((i) => i + 1);
      setSelected(null);
    } else {
      const totalCorrect = newAnswers.filter(Boolean).length;
      const score = Math.round((totalCorrect / questions.length) * 100);
      setFinalScore(score);
      setShowResult(true);
    }
  };

  if (showResult) {
    const correctCount = answers.filter(Boolean).length;
    const perf =
      finalScore >= 80
        ? {
            label: "Excellent! 🌟",
            desc: "Outstanding vocabulary mastery!",
            color: "text-green-700",
            bg: "bg-green-50",
            border: "border-green-300",
          }
        : finalScore >= 60
          ? {
              label: "Good! 👍",
              desc: "You're building strong vocabulary skills.",
              color: "text-amber-700",
              bg: "bg-amber-50",
              border: "border-amber-300",
            }
          : {
              label: "Keep Practising 💪",
              desc: "Review the vocab cards and try again!",
              color: "text-rose-700",
              bg: "bg-rose-50",
              border: "border-rose-300",
            };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-5">
          <div className="max-w-lg mx-auto">
            <h1 className="font-bold text-xl text-center">
              🏆 Weekly Vocab Test Results
            </h1>
          </div>
        </div>
        <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-4">
          <div
            data-ocid="weekly_test.success_state"
            className={`${perf.bg} border-2 ${perf.border} rounded-3xl p-8 text-center`}
          >
            <div className="text-6xl mb-4">🏆</div>
            <p className={`text-4xl font-extrabold ${perf.color}`}>
              {finalScore}%
            </p>
            <p className={`text-xl font-bold mt-2 ${perf.color}`}>
              {perf.label}
            </p>
            <p className="text-gray-500 text-sm mt-2">{perf.desc}</p>
            <p className="text-gray-500 text-sm mt-1">
              {correctCount} out of {questions.length} correct
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="font-bold text-gray-700 mb-3">Results Summary</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-green-700">
                  {correctCount}
                </p>
                <p className="text-xs text-green-600">Correct</p>
              </div>
              <div className="bg-red-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-red-700">
                  {questions.length - correctCount}
                </p>
                <p className="text-xs text-red-600">Incorrect</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            data-ocid="weekly_test.complete.primary_button"
            onClick={() => onComplete(finalScore)}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-colors text-lg"
          >
            View Dashboard →
          </button>
        </div>
      </div>
    );
  }

  const progress = (currentQ / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button
              type="button"
              data-ocid="weekly_test.back.button"
              onClick={onBack}
              className="text-white/80 hover:text-white text-sm"
            >
              ← Back
            </button>
            <h1 className="font-bold text-lg flex-1 text-center">
              🏆 Weekly Vocab Test
            </h1>
          </div>
          <div className="bg-white/30 rounded-full h-2.5">
            <div
              className="bg-white rounded-full h-2.5 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/80 text-xs mt-1.5 text-center">
            Question {currentQ + 1} of {questions.length} · {weekWords.length}{" "}
            words this week
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-4">
        <div className="bg-white rounded-3xl p-6 shadow-md border border-indigo-100">
          <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-3">
            {q.type === "meaning" ? "📖 Meaning" : "✏️ Fill in"}
          </span>
          <p className="text-gray-800 font-semibold text-base leading-relaxed">
            {q.question}
          </p>
        </div>

        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            const isSelected = selected === idx;
            const isCorrect = selected !== null && idx === q.correctIndex;
            const isWrong = isSelected && idx !== q.correctIndex;
            return (
              <button
                key={opt}
                type="button"
                data-ocid={`weekly_test.option.${idx + 1}`}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                className={[
                  "w-full text-left p-4 rounded-2xl border-2 transition-all font-medium text-sm",
                  isCorrect
                    ? "bg-green-50 border-green-400 text-green-800"
                    : isWrong
                      ? "bg-red-50 border-red-400 text-red-800"
                      : isSelected
                        ? "bg-indigo-50 border-indigo-400"
                        : "bg-white border-gray-200 hover:border-indigo-200 hover:bg-indigo-50",
                  selected !== null ? "cursor-default" : "cursor-pointer",
                ].join(" ")}
              >
                <span className="font-bold mr-2">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {opt}
                {isCorrect && <span className="ml-2">✅</span>}
                {isWrong && <span className="ml-2">❌</span>}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          data-ocid="weekly_test.submit_button"
          onClick={handleNext}
          disabled={selected === null}
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-lg"
        >
          {currentQ === questions.length - 1 ? "See Results" : "Next Question"}{" "}
          →
        </button>
      </div>
    </div>
  );
}
