import { Button } from "@/components/ui/button";
import type { Passage } from "@/data/content";
import { useState } from "react";

interface Props {
  passage: Passage;
  onStartQuiz: () => void;
  onBack: () => void;
}

export default function PassageReader({ passage, onStartQuiz, onBack }: Props) {
  const [activeChunk, setActiveChunk] = useState<number | null>(null);
  const [mode, setMode] = useState<"full" | "chunks">("full");

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto">
        <div className="w-full bg-white border-b border-gray-100 py-3 px-4 text-center">
          <span className="text-2xl font-extrabold text-black tracking-widest">
            CLASSIO
          </span>
        </div>
        <div className="bg-blue-600 text-white px-4 pt-6 pb-6">
          <button
            type="button"
            data-ocid="passage.back.button"
            onClick={onBack}
            className="text-white/80 text-sm mb-3"
          >
            ← Back
          </button>
          <h2 className="font-display text-2xl font-bold">{passage.title}</h2>
          <p className="text-white/70 text-sm mt-1">
            Grade {passage.grade} Reading
          </p>
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              data-ocid="passage.full.tab"
              onClick={() => setMode("full")}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${mode === "full" ? "bg-white text-blue-600" : "bg-white/20 text-white"}`}
            >
              Full Text
            </button>
            <button
              type="button"
              data-ocid="passage.chunks.tab"
              onClick={() => setMode("chunks")}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${mode === "chunks" ? "bg-white text-blue-600" : "bg-white/20 text-white"}`}
            >
              Chunk Mode
            </button>
          </div>
        </div>
        <div className="p-4 space-y-6">
          {mode === "full" ? (
            <div className="bg-amber-50 rounded-2xl p-5">
              <p className="text-gray-800 text-lg leading-relaxed font-body">
                {passage.text}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-gray-500 text-sm mb-3">
                Tap each chunk to highlight it as you read:
              </p>
              <div className="bg-amber-50 rounded-2xl p-5 leading-loose">
                {passage.chunks.map((chunk, i) => (
                  <button
                    // biome-ignore lint/suspicious/noArrayIndexKey: chunk order is stable
                    key={i}
                    type="button"
                    data-ocid={`passage.chunk.${i + 1}`}
                    onClick={() => setActiveChunk(i === activeChunk ? null : i)}
                    className={`inline mx-1 px-2 py-0.5 rounded-lg text-lg font-body transition-all ${activeChunk === i ? "bg-blue-200 text-blue-900 font-semibold" : "hover:bg-blue-50 text-gray-800"}`}
                  >
                    {chunk}
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-xs mt-2">
                Tap each phrase group to follow along
              </p>
            </div>
          )}
          <Button
            data-ocid="passage.quiz.button"
            onClick={onStartQuiz}
            className="w-full h-12 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
          >
            Start Comprehension Quiz →
          </Button>
        </div>
      </div>
    </div>
  );
}
