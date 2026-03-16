import { getVocabByGrade } from "@/data/vocabData";
import type { VocabWord } from "@/data/vocabData";
import { useState } from "react";

interface Props {
  grade: number;
  passageIndex: number;
  onComplete: (
    score: number,
    answers: { word: string; correct: boolean }[],
  ) => void;
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

function buildQuestions(words: VocabWord[]): Question[] {
  const q: Question[] = [];

  // Q1-Q3: meaning MCQ
  const meaningWords = shuffle(words).slice(0, 3);
  for (const w of meaningWords) {
    const distractors = shuffle(words.filter((x) => x.word !== w.word))
      .slice(0, 3)
      .map((x) => x.meaning);
    const options = shuffle([w.meaning, ...distractors]);
    q.push({
      type: "meaning",
      word: w,
      question: `What is the meaning of "${w.word}"?`,
      options,
      correctIndex: options.indexOf(w.meaning),
    });
  }

  // Q4-Q5: fill-in-the-blank
  const fillWords = shuffle(
    words.filter((w) => !meaningWords.includes(w)),
  ).slice(0, 2);
  for (const w of fillWords) {
    const blank = w.exampleSentence.replace(
      new RegExp(`\\b${w.word}\\b`, "gi"),
      "___",
    );
    const distractors = shuffle(words.filter((x) => x.word !== w.word))
      .slice(0, 3)
      .map((x) => x.word);
    const options = shuffle([w.word, ...distractors]);
    q.push({
      type: "fill",
      word: w,
      question: `Complete the sentence: "${blank}"`,
      options,
      correctIndex: options.indexOf(w.word),
    });
  }

  return q;
}

export default function VocabPracticeTest({
  grade,
  passageIndex,
  onComplete,
  onBack,
}: Props) {
  const words = getVocabByGrade(grade, passageIndex);
  const [questions] = useState<Question[]>(() => buildQuestions(words));
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ word: string; correct: boolean }[]>(
    [],
  );
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const q = questions[currentQ];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === null) return;
    const correct = selected === q.correctIndex;
    const newAnswers = [...answers, { word: q.word.word, correct }];
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ((i) => i + 1);
      setSelected(null);
    } else {
      const totalCorrect = newAnswers.filter((a) => a.correct).length;
      const finalScore = Math.round((totalCorrect / questions.length) * 100);
      setScore(finalScore);
      setShowResult(true);
    }
  };

  if (showResult) {
    const correctCount = answers.filter((a) => a.correct).length;
    const pct = Math.round((correctCount / questions.length) * 100);
    const perf =
      pct >= 80
        ? {
            label: "Excellent! 🌟",
            color: "text-green-700",
            bg: "bg-green-50",
            border: "border-green-200",
          }
        : pct >= 60
          ? {
              label: "Good Job! 👍",
              color: "text-amber-700",
              bg: "bg-amber-50",
              border: "border-amber-200",
            }
          : {
              label: "Keep Practising! 💪",
              color: "text-rose-700",
              bg: "bg-rose-50",
              border: "border-rose-200",
            };

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex flex-col">
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-5">
          <div className="max-w-lg mx-auto">
            <h1 className="font-bold text-xl text-center">
              📝 Vocab Practice Results
            </h1>
          </div>
        </div>
        <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-4">
          <div
            data-ocid="vocab_test.success_state"
            className={`${perf.bg} border-2 ${perf.border} rounded-3xl p-6 text-center`}
          >
            <div className="text-5xl mb-3">📊</div>
            <p className={`text-3xl font-extrabold ${perf.color}`}>{pct}%</p>
            <p className={`text-lg font-bold mt-1 ${perf.color}`}>
              {perf.label}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {correctCount} out of {questions.length} correct
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-2">
            <p className="font-bold text-gray-700 mb-2">Question Review</p>
            {answers.map((a, i) => (
              <div
                key={a.word + String(i)}
                className={`flex items-center gap-3 p-3 rounded-xl ${a.correct ? "bg-green-50" : "bg-red-50"}`}
              >
                <span className="text-lg">{a.correct ? "✅" : "❌"}</span>
                <p className="text-sm font-semibold text-gray-700">
                  Q{i + 1}: <span className="text-teal-700">{a.word}</span>
                </p>
                <span
                  className={`ml-auto text-xs font-bold ${a.correct ? "text-green-600" : "text-red-600"}`}
                >
                  {a.correct ? "Correct" : "Incorrect"}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            data-ocid="vocab_test.complete.primary_button"
            onClick={() => onComplete(score, answers)}
            className="w-full bg-teal-600 text-white font-bold py-4 rounded-2xl hover:bg-teal-700 transition-colors text-lg"
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  const progress = (currentQ / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex flex-col">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button
              type="button"
              data-ocid="vocab_test.back.button"
              onClick={onBack}
              className="text-white/80 hover:text-white text-sm"
            >
              ← Back
            </button>
            <h1 className="font-bold text-lg flex-1 text-center">
              📝 Vocab Practice Test
            </h1>
          </div>
          <div className="bg-white/30 rounded-full h-2.5">
            <div
              className="bg-white rounded-full h-2.5 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/80 text-xs mt-1.5 text-center">
            Question {currentQ + 1} of {questions.length}
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-4">
        <div className="bg-white rounded-3xl p-6 shadow-md border border-teal-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2.5 py-1 rounded-full">
              {q.type === "meaning" ? "📖 Meaning" : "✏️ Fill in"}
            </span>
          </div>
          <p className="text-gray-800 font-semibold text-lg leading-relaxed">
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
                data-ocid={`vocab_test.option.${idx + 1}`}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                className={[
                  "w-full text-left p-4 rounded-2xl border-2 transition-all font-medium text-sm",
                  isCorrect
                    ? "bg-green-50 border-green-400 text-green-800"
                    : isWrong
                      ? "bg-red-50 border-red-400 text-red-800"
                      : isSelected
                        ? "bg-teal-50 border-teal-400 text-teal-800"
                        : "bg-white border-gray-200 text-gray-700 hover:border-teal-200 hover:bg-teal-50",
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
          data-ocid="vocab_test.next_button"
          onClick={handleNext}
          disabled={selected === null}
          className="w-full bg-teal-600 text-white font-bold py-4 rounded-2xl hover:bg-teal-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-lg mt-2"
        >
          {currentQ === questions.length - 1 ? "See Results" : "Next Question"}{" "}
          →
        </button>
      </div>
    </div>
  );
}
