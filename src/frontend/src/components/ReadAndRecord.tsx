import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import type { Passage } from "@/data/content";
import { useEffect, useRef, useState } from "react";

interface Props {
  passage: Passage;
  onComplete: (wordResults: WordResult[]) => void;
  onBack: () => void;
}

const ratings = [
  {
    label: "Need Practice",
    emoji: "🔄",
    color: "border-rose-400 bg-rose-50 text-rose-700",
  },
  {
    label: "Getting There",
    emoji: "👍",
    color: "border-yellow-400 bg-yellow-50 text-yellow-700",
  },
  {
    label: "I Got It!",
    emoji: "⭐",
    color: "border-green-400 bg-green-50 text-green-700",
  },
];

function normalize(word: string) {
  return word.toLowerCase().replace(/[^a-z']/g, "");
}

export type WordResult = {
  original: string;
  status: "correct" | "mispronounced" | "missed";
  heard?: string;
};

function analyzeTranscript(passage: string, transcript: string): WordResult[] {
  const passageWords = passage.trim().split(/\s+/);
  const heardWords = transcript
    .trim()
    .split(/\s+/)
    .map(normalize)
    .filter(Boolean);

  const results: WordResult[] = [];
  let hi = 0;

  for (let pi = 0; pi < passageWords.length; pi++) {
    const expected = normalize(passageWords[pi]);
    if (!expected) {
      results.push({ original: passageWords[pi], status: "correct" });
      continue;
    }

    if (hi >= heardWords.length) {
      results.push({ original: passageWords[pi], status: "missed" });
      continue;
    }

    if (heardWords[hi] === expected) {
      results.push({ original: passageWords[pi], status: "correct" });
      hi++;
    } else {
      let foundAhead = false;
      for (let look = 1; look <= 3 && hi + look < heardWords.length; look++) {
        if (heardWords[hi + look] === expected) {
          hi += look;
          results.push({ original: passageWords[pi], status: "correct" });
          hi++;
          foundAhead = true;
          break;
        }
      }
      if (!foundAhead) {
        const nextExpected = passageWords[pi + 1]
          ? normalize(passageWords[pi + 1])
          : "";
        if (heardWords[hi] === nextExpected) {
          results.push({ original: passageWords[pi], status: "missed" });
        } else {
          results.push({
            original: passageWords[pi],
            status: "mispronounced",
            heard: heardWords[hi],
          });
          hi++;
        }
      }
    }
  }

  return results;
}

type SpeechRecognitionType = {
  new (): SpeechRecognitionInstance;
};
type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
};
type SpeechRecognitionResultEvent = {
  results: SpeechRecognitionResultList;
};
declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionType;
    webkitSpeechRecognition: SpeechRecognitionType;
  }
}

export default function ReadAndRecord({ passage, onComplete, onBack }: Props) {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [analysis, setAnalysis] = useState<WordResult[] | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [speechSupported, setSpeechSupported] = useState(true);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const recognition = useRef<SpeechRecognitionInstance | null>(null);
  const liveTranscript = useRef("");

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) setSpeechSupported(false);
  }, []);

  const startRecording = async () => {
    setError("");
    setAudioURL(null);
    setTranscript("");
    setAnalysis(null);
    setRating(null);
    liveTranscript.current = "";

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      chunks.current = [];
      mediaRecorder.current.ondataavailable = (e) =>
        chunks.current.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        setAudioURL(URL.createObjectURL(blob));
        for (const track of stream.getTracks()) track.stop();

        const finalText = liveTranscript.current.trim();
        setTranscript(finalText);
        if (finalText) {
          setAnalysis(analyzeTranscript(passage.recordPassage, finalText));
        }
      };
      mediaRecorder.current.start();

      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SR) {
        recognition.current = new SR() as SpeechRecognitionInstance;
        recognition.current.continuous = true;
        recognition.current.interimResults = true;
        recognition.current.lang = "en-US";
        recognition.current.onresult = (
          event: SpeechRecognitionResultEvent,
        ) => {
          let final = "";
          for (let i = 0; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              final += `${event.results[i][0].transcript} `;
            }
          }
          liveTranscript.current = final;
          setTranscript(final.trim());
        };
        recognition.current.onerror = () => {};
        recognition.current.start();
      }

      setRecording(true);
    } catch {
      setError("Could not access microphone. Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    recognition.current?.stop();
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  const missedCount =
    analysis?.filter((w) => w.status === "missed").length ?? 0;
  const mispronounced =
    analysis?.filter((w) => w.status === "mispronounced").length ?? 0;
  const correct = analysis?.filter((w) => w.status === "correct").length ?? 0;
  const total = analysis?.length ?? 0;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto">
        <AppHeader />
        <div className="bg-rose-500 text-white px-4 pt-6 pb-6">
          <button
            type="button"
            data-ocid="record.back.button"
            onClick={onBack}
            className="text-white/80 text-sm mb-3"
          >
            ← Back
          </button>
          <h2 className="font-display text-2xl font-bold">🎙️ Read & Record</h2>
          <p className="text-white/70 text-sm mt-1">
            Record yourself reading, then see your results
          </p>
        </div>

        <div className="p-4 space-y-6">
          <div className="bg-amber-50 rounded-2xl p-4">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">
              Read this aloud:
            </p>
            <p className="text-gray-800 text-lg leading-relaxed font-body">
              {passage.recordPassage}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              data-ocid="record.mic.button"
              onClick={recording ? stopRecording : startRecording}
              className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-white font-semibold shadow-lg transition-all ${
                recording
                  ? "bg-rose-600 animate-pulse scale-110"
                  : "bg-rose-500 hover:bg-rose-600 hover:scale-105"
              }`}
            >
              <span className="text-4xl">{recording ? "⏹" : "🎙️"}</span>
              <span className="text-sm mt-1">
                {recording ? "Stop" : "Record"}
              </span>
            </button>
          </div>

          {recording && transcript && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
              <p className="text-blue-500 text-xs font-semibold uppercase mb-1">
                Listening…
              </p>
              <p className="text-blue-800 text-sm italic">{transcript}</p>
            </div>
          )}

          {!speechSupported && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-yellow-700 text-sm">
              ⚠️ Speech recognition is not supported in this browser. Recording
              will still work but word analysis won't be available. Try Chrome
              for full features.
            </div>
          )}

          {error && (
            <div
              data-ocid="record.error_state"
              className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-rose-700 text-sm"
            >
              {error}
            </div>
          )}

          {audioURL && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <p className="text-green-800 font-semibold text-sm mb-2">
                  ✓ Recording done! Play it back:
                </p>
                {/* biome-ignore lint/a11y/useMediaCaption: self-recorded audio */}
                <audio
                  data-ocid="record.playback"
                  controls
                  src={audioURL}
                  className="w-full"
                />
              </div>

              {analysis && analysis.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-4">
                  <h3 className="font-bold text-gray-800 text-base">
                    📊 Your Reading Analysis
                  </h3>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-green-50 rounded-xl p-3">
                      <div className="text-2xl font-bold text-green-600">
                        {accuracy}%
                      </div>
                      <div className="text-xs text-green-700 font-semibold">
                        Accuracy
                      </div>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-3">
                      <div className="text-2xl font-bold text-orange-600">
                        {mispronounced}
                      </div>
                      <div className="text-xs text-orange-700 font-semibold">
                        Mispronounced
                      </div>
                    </div>
                    <div className="bg-rose-50 rounded-xl p-3">
                      <div className="text-2xl font-bold text-rose-600">
                        {missedCount}
                      </div>
                      <div className="text-xs text-rose-700 font-semibold">
                        Missed
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase mb-2">
                      Word-by-word breakdown:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.map((w, i) => (
                        <span
                          key={`${w.original}-${i}`}
                          title={
                            w.status === "mispronounced"
                              ? `You said: "${w.heard}"`
                              : w.status === "missed"
                                ? "Word not read"
                                : "Correct"
                          }
                          className={`px-2 py-1 rounded-lg text-sm font-medium border ${
                            w.status === "correct"
                              ? "bg-green-50 border-green-300 text-green-800"
                              : w.status === "mispronounced"
                                ? "bg-orange-100 border-orange-400 text-orange-800"
                                : "bg-rose-100 border-rose-400 text-rose-800 line-through"
                          }`}
                        >
                          {w.original}
                          {w.status === "mispronounced" && (
                            <span className="ml-1 text-orange-500 text-xs">
                              ⚠
                            </span>
                          )}
                          {w.status === "missed" && (
                            <span className="ml-1 text-rose-500 text-xs">
                              ✗
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-3 text-xs">
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-green-200 inline-block" />
                        Correct
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-orange-200 inline-block" />
                        Mispronounced
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-rose-200 inline-block" />
                        Missed
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {transcript === "" && speechSupported && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-yellow-800 text-sm">
                  No speech detected. Make sure your microphone is working and
                  try again.
                </div>
              )}

              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <p className="text-gray-600 text-sm font-semibold mb-2">
                  How did it go?
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {ratings.map((r, i) => (
                    <button
                      key={r.label}
                      type="button"
                      data-ocid={`record.rating.${i + 1}`}
                      onClick={() => setRating(i)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        rating === i
                          ? `${r.color} scale-105`
                          : "border-gray-200 bg-white text-gray-600"
                      }`}
                    >
                      <div className="text-xl">{r.emoji}</div>
                      <div className="text-xs font-semibold mt-1">
                        {r.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {rating !== null && (
                <Button
                  data-ocid="record.save.button"
                  onClick={() => onComplete(analysis ?? [])}
                  className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white h-12"
                >
                  Answer 5 Questions →
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
