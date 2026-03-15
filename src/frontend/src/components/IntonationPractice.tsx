import { Button } from "@/components/ui/button";
import type { Passage } from "@/data/content";
import { useRef, useState } from "react";

interface Props {
  passage: Passage;
  onComplete: () => void;
  onBack: () => void;
}

export default function IntonationPractice({
  passage,
  onComplete,
  onBack,
}: Props) {
  const sentences = passage.intonationSentences;
  const [current, setCurrent] = useState(0);
  const [recordings, setRecordings] = useState<(string | null)[]>(
    Array(sentences.length).fill(null),
  );
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const s = sentences[current];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      chunks.current = [];
      mediaRecorder.current.ondataavailable = (e) =>
        chunks.current.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setRecordings((prev) => {
          const n = [...prev];
          n[current] = url;
          return n;
        });
        for (const track of stream.getTracks()) track.stop();
      };
      mediaRecorder.current.start();
      setRecording(true);
    } catch {
      /* no mic */
    }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  const renderSentence = (text: string, stressed: string[]) => {
    const words = text.split(" ");
    return words.map((word, wordIdx) => {
      const clean = word.replace(/[^a-zA-Z]/g, "");
      const isStressed = stressed.some(
        (sw) => word.toUpperCase().includes(sw.toUpperCase()) || sw === clean,
      );
      return (
        <span
          key={`word-${wordIdx}-${word}`}
          className={`mr-1 ${isStressed ? "font-bold underline decoration-wavy decoration-purple-500 text-purple-900" : "text-gray-800"}`}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto">
        <div className="bg-green-600 text-white px-4 pt-10 pb-6">
          <button
            type="button"
            data-ocid="intonation.back.button"
            onClick={onBack}
            className="text-white/80 text-sm mb-3"
          >
            ← Back
          </button>
          <h2 className="font-display text-2xl font-bold">
            🎵 Intonation Practice
          </h2>
          <p className="text-white/70 text-sm mt-1">
            Sentence {current + 1} of {sentences.length}
          </p>
        </div>
        <div className="p-4 space-y-5">
          <div className="bg-green-50 rounded-2xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">
                {s.type === "rising" ? "↗️" : s.type === "falling" ? "↘️" : "💥"}
              </span>
              <div>
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">
                  {s.type === "rising"
                    ? "Rising Intonation"
                    : s.type === "falling"
                      ? "Falling Intonation"
                      : "Emphasis"}
                </p>
                <p className="text-xl leading-relaxed">
                  {renderSentence(s.text, s.stressedWords)}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-green-200">
              <p className="text-green-700 text-sm">💡 {s.tip}</p>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <button
              type="button"
              data-ocid="intonation.mic.button"
              onClick={recording ? stopRecording : startRecording}
              className={`flex-1 py-4 rounded-xl flex flex-col items-center font-semibold transition-all ${recording ? "bg-rose-500 text-white animate-pulse" : "bg-rose-50 text-rose-600 border-2 border-rose-200 hover:bg-rose-100"}`}
            >
              <span className="text-2xl">{recording ? "⏹" : "🎙️"}</span>
              <span className="text-sm mt-1">
                {recording ? "Stop" : "Record"}
              </span>
            </button>
            {recordings[current] && (
              // biome-ignore lint/a11y/useMediaCaption: self-recorded audio, no captions needed
              <audio
                controls
                src={recordings[current]!}
                className="flex-1 h-14"
              />
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              data-ocid="intonation.prev.button"
              variant="outline"
              disabled={current === 0}
              onClick={() => setCurrent((c) => c - 1)}
              className="flex-1 rounded-xl h-12 border-green-200 text-green-700"
            >
              ← Prev
            </Button>
            {current + 1 < sentences.length ? (
              <Button
                type="button"
                data-ocid="intonation.next.button"
                onClick={() => setCurrent((c) => c + 1)}
                className="flex-1 rounded-xl h-12 bg-green-600 hover:bg-green-700 text-white"
              >
                Next →
              </Button>
            ) : (
              <Button
                type="button"
                data-ocid="intonation.finish.button"
                onClick={() => {
                  onComplete();
                  onBack();
                }}
                className="flex-1 rounded-xl h-12 bg-green-600 hover:bg-green-700 text-white"
              >
                Finish!
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {sentences.map((sent, i) => (
              <button
                key={sent.text}
                type="button"
                data-ocid={`intonation.sentence.${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`w-full text-left p-3 rounded-xl text-sm transition-all ${i === current ? "bg-green-100 border-2 border-green-400" : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"}`}
              >
                <span className="mr-2">
                  {sent.type === "rising"
                    ? "↗️"
                    : sent.type === "falling"
                      ? "↘️"
                      : "💥"}
                </span>
                {sent.text}
                {recordings[i] && (
                  <span className="ml-2 text-green-500">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
