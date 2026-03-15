import { Button } from "@/components/ui/button";
import type { Passage } from "@/data/content";
import { useState } from "react";

interface Props {
  passage: Passage;
  onComplete: () => void;
  onBack: () => void;
}

export default function PronunciationPractice({
  passage,
  onComplete,
  onBack,
}: Props) {
  const words = passage.pronunciationWords;
  const [current, setCurrent] = useState(0);
  const [practiced, setPracticed] = useState<Set<number>>(new Set());

  const w = words[current];
  const allDone = practiced.size === words.length;

  const markPracticed = () => {
    setPracticed((prev) => new Set([...prev, current]));
    if (current + 1 < words.length) setCurrent((c) => c + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto">
        <div className="bg-purple-600 text-white px-4 pt-10 pb-6">
          <button
            type="button"
            data-ocid="pronunciation.back.button"
            onClick={onBack}
            className="text-white/80 text-sm mb-3"
          >
            ← Back
          </button>
          <h2 className="font-display text-2xl font-bold">🗣️ Pronunciation</h2>
          <p className="text-white/70 text-sm mt-1">
            Word {current + 1} of {words.length}
          </p>
          <div className="flex gap-1 mt-3">
            {words.map((wd, i) => (
              <div
                key={wd.syllables}
                className={`h-1.5 flex-1 rounded-full ${practiced.has(i) ? "bg-white" : i === current ? "bg-white/60" : "bg-white/25"}`}
              />
            ))}
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div className="bg-purple-50 rounded-3xl p-6 text-center">
            <p className="text-5xl font-bold text-purple-900 font-display mb-2">
              {w.word}
            </p>
            <p className="text-2xl text-purple-600 font-semibold tracking-widest">
              {w.syllables}
            </p>
            <p className="text-purple-400 mt-1 text-lg">{w.phonetic}</p>
          </div>

          <div className="bg-amber-50 rounded-2xl p-4">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">
              Example Sentence
            </p>
            <p className="text-gray-800 text-base leading-relaxed italic">
              &ldquo;{w.example}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              data-ocid="pronunciation.prev.button"
              variant="outline"
              disabled={current === 0}
              onClick={() => setCurrent((c) => c - 1)}
              className="rounded-xl h-12 border-purple-200 text-purple-600"
            >
              ← Previous
            </Button>
            <Button
              data-ocid="pronunciation.practiced.button"
              onClick={markPracticed}
              className={`rounded-xl h-12 ${practiced.has(current) ? "bg-green-500 hover:bg-green-600" : "bg-purple-600 hover:bg-purple-700"} text-white`}
            >
              {practiced.has(current) ? "✓ Practiced" : "I Can Say It!"}
            </Button>
          </div>

          {allDone && (
            <Button
              data-ocid="pronunciation.done.button"
              onClick={() => {
                onComplete();
                onBack();
              }}
              className="w-full rounded-xl h-12 bg-green-500 hover:bg-green-600 text-white text-lg"
            >
              🎉 All Done! Back to Home
            </Button>
          )}

          <div className="flex flex-wrap gap-2">
            {words.map((w2, i) => (
              <button
                key={w2.word}
                type="button"
                data-ocid={`pronunciation.word.${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all border ${i === current ? "bg-purple-600 text-white border-purple-600" : practiced.has(i) ? "bg-green-100 text-green-700 border-green-300" : "bg-gray-100 text-gray-600 border-gray-200"}`}
              >
                {w2.word}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
