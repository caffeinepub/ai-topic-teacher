import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import type { Passage } from "@/data/content";
import { useEffect, useRef, useState } from "react";

interface Props {
  passage: Passage;
  onComplete: (wordResults: WordResult[], insertions: string[]) => void;
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

function analyzeTranscript(
  passage: string,
  transcript: string,
): { wordResults: WordResult[]; insertions: string[] } {
  const passageWords = passage.trim().split(/\s+/);
  const heardWords = transcript
    .trim()
    .split(/\s+/)
    .map(normalize)
    .filter(Boolean);

  const results: WordResult[] = [];
  const insertions: string[] = [];
  let hi = 0;

  const passageWordSet = new Set(passageWords.map(normalize).filter(Boolean));

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
      if (!passageWordSet.has(heardWords[hi])) {
        insertions.push(heardWords[hi]);
        hi++;
        pi--;
        continue;
      }

      let foundAhead = false;
      for (let look = 1; look <= 3 && hi + look < heardWords.length; look++) {
        if (heardWords[hi + look] === expected) {
          for (let k = hi; k < hi + look; k++) {
            if (!passageWordSet.has(heardWords[k])) {
              insertions.push(heardWords[k]);
            }
          }
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

  return { wordResults: results, insertions };
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

const SHOW_LIMIT = 10;

function WordListSection({
  title,
  emoji,
  headerClass,
  ocid,
  children,
  count,
}: {
  title: string;
  emoji: string;
  headerClass: string;
  ocid: string;
  children: React.ReactNode;
  count: number;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div
        className={`px-3 py-2 rounded-t-xl font-semibold text-sm flex items-center gap-1.5 ${headerClass}`}
      >
        <span>{emoji}</span>
        <span>{title}</span>
        <span className="ml-auto opacity-70 text-xs font-normal">
          {count} word{count !== 1 ? "s" : ""}
        </span>
      </div>
      <div
        data-ocid={ocid}
        className="bg-gray-50 rounded-b-xl px-3 py-3 min-h-[40px]"
      >
        {children}
        {count > SHOW_LIMIT && (
          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className="mt-2 text-xs text-blue-600 underline"
          >
            {expanded ? "Show less" : `Show all ${count} words`}
          </button>
        )}
      </div>
    </div>
  );
}

export default function ReadAndRecord({ passage, onComplete, onBack }: Props) {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [analysis, setAnalysis] = useState<{
    wordResults: WordResult[];
    insertions: string[];
  } | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [speechSupported, setSpeechSupported] = useState(true);
  const [reportExpanded, setReportExpanded] = useState<{
    correct: boolean;
    mispronounced: boolean;
    missed: boolean;
  }>({ correct: false, mispronounced: false, missed: false });

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
    setReportExpanded({ correct: false, mispronounced: false, missed: false });
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

  const wordResults = analysis?.wordResults ?? [];
  const insertions = analysis?.insertions ?? [];
  const missedCount = wordResults.filter((w) => w.status === "missed").length;
  const mispronounced = wordResults.filter(
    (w) => w.status === "mispronounced",
  ).length;
  const correct = wordResults.filter((w) => w.status === "correct").length;
  const total = wordResults.length;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  const correctWords = wordResults.filter((w) => w.status === "correct");
  const misprnouncedWords = wordResults.filter(
    (w) => w.status === "mispronounced",
  );
  const missedWords = wordResults.filter((w) => w.status === "missed");

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
          <h2 className="font-display text-2xl font-bold">
            🎙️ Read &amp; Record
          </h2>
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

              {wordResults.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-4">
                  <h3 className="font-bold text-gray-800 text-base">
                    📊 Your Reading Analysis
                  </h3>

                  {/* Stats grid - 4 cards */}
                  <div className="grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
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
                    <div className="bg-red-50 rounded-xl p-3">
                      <div className="text-2xl font-bold text-red-600">
                        {missedCount}
                      </div>
                      <div className="text-xs text-red-700 font-semibold">
                        Missed
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-3">
                      <div className="text-2xl font-bold text-blue-600">
                        {insertions.length}
                      </div>
                      <div className="text-xs text-blue-700 font-semibold">
                        Extra Words
                      </div>
                    </div>
                  </div>

                  {/* ── READING REPORT ── */}
                  <div
                    data-ocid="record.report.card"
                    className="border border-gray-200 rounded-2xl overflow-hidden space-y-0"
                  >
                    <div className="bg-gray-800 text-white px-3 py-2.5 font-bold text-sm flex items-center gap-2">
                      📋 Reading Report
                    </div>

                    <div className="divide-y divide-gray-200">
                      {/* Correct Words */}
                      <WordListSection
                        title="Correct Words"
                        emoji="✅"
                        headerClass="bg-green-100 text-green-800"
                        ocid="record.correct.list"
                        count={correctWords.length}
                      >
                        {correctWords.length === 0 ? (
                          <span className="text-gray-400 text-sm">None</span>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            {(reportExpanded.correct
                              ? correctWords
                              : correctWords.slice(0, SHOW_LIMIT)
                            ).map((w, i) => (
                              <span
                                // biome-ignore lint/suspicious/noArrayIndexKey: stable list
                                key={i}
                                className="px-2 py-0.5 rounded-lg text-sm font-medium bg-green-100 border border-green-300 text-green-800"
                              >
                                {w.original}
                              </span>
                            ))}
                            {correctWords.length > SHOW_LIMIT && (
                              <button
                                type="button"
                                onClick={() =>
                                  setReportExpanded((p) => ({
                                    ...p,
                                    correct: !p.correct,
                                  }))
                                }
                                className="text-xs text-blue-600 underline self-center"
                              >
                                {reportExpanded.correct
                                  ? "Show less"
                                  : `+${correctWords.length - SHOW_LIMIT} more`}
                              </button>
                            )}
                          </div>
                        )}
                      </WordListSection>

                      {/* Mispronounced Words */}
                      <WordListSection
                        title="Mispronounced Words"
                        emoji="⚠️"
                        headerClass="bg-orange-100 text-orange-800"
                        ocid="record.mispronounced.list"
                        count={misprnouncedWords.length}
                      >
                        {misprnouncedWords.length === 0 ? (
                          <span className="text-gray-400 text-sm">None</span>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {(reportExpanded.mispronounced
                              ? misprnouncedWords
                              : misprnouncedWords.slice(0, SHOW_LIMIT)
                            ).map((w, i) => (
                              <div
                                // biome-ignore lint/suspicious/noArrayIndexKey: stable list
                                key={i}
                                className="flex items-start gap-2"
                              >
                                <span className="px-2 py-0.5 rounded-lg text-sm font-semibold bg-orange-100 border border-orange-400 text-orange-800">
                                  {w.original}
                                </span>
                                {w.heard && (
                                  <span className="text-xs text-gray-500 self-center">
                                    → you said:{" "}
                                    <span className="font-semibold text-orange-600">
                                      {w.heard}
                                    </span>
                                  </span>
                                )}
                              </div>
                            ))}
                            {misprnouncedWords.length > SHOW_LIMIT && (
                              <button
                                type="button"
                                onClick={() =>
                                  setReportExpanded((p) => ({
                                    ...p,
                                    mispronounced: !p.mispronounced,
                                  }))
                                }
                                className="text-xs text-blue-600 underline self-start"
                              >
                                {reportExpanded.mispronounced
                                  ? "Show less"
                                  : `+${misprnouncedWords.length - SHOW_LIMIT} more`}
                              </button>
                            )}
                          </div>
                        )}
                      </WordListSection>

                      {/* Missed Words */}
                      <WordListSection
                        title="Missed Words"
                        emoji="✗"
                        headerClass="bg-red-100 text-red-800"
                        ocid="record.missed.list"
                        count={missedWords.length}
                      >
                        {missedWords.length === 0 ? (
                          <span className="text-gray-400 text-sm">None</span>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            {(reportExpanded.missed
                              ? missedWords
                              : missedWords.slice(0, SHOW_LIMIT)
                            ).map((w, i) => (
                              <span
                                // biome-ignore lint/suspicious/noArrayIndexKey: stable list
                                key={i}
                                className="px-2 py-0.5 rounded-lg text-sm font-medium bg-red-100 border border-red-400 text-red-800 line-through"
                              >
                                {w.original}
                              </span>
                            ))}
                            {missedWords.length > SHOW_LIMIT && (
                              <button
                                type="button"
                                onClick={() =>
                                  setReportExpanded((p) => ({
                                    ...p,
                                    missed: !p.missed,
                                  }))
                                }
                                className="text-xs text-blue-600 underline self-center"
                              >
                                {reportExpanded.missed
                                  ? "Show less"
                                  : `+${missedWords.length - SHOW_LIMIT} more`}
                              </button>
                            )}
                          </div>
                        )}
                      </WordListSection>
                    </div>
                  </div>

                  {/* Word-by-word breakdown */}
                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase mb-2">
                      Word-by-word breakdown:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {wordResults.map((w, i) => (
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
                              ? "bg-green-100 border-green-300 text-green-800"
                              : w.status === "mispronounced"
                                ? "bg-orange-100 border-orange-400 text-orange-800"
                                : "bg-red-100 border-red-400 text-red-800 line-through"
                          }`}
                        >
                          {w.original}
                          {w.status === "mispronounced" && (
                            <span className="ml-1 text-orange-500 text-xs">
                              ⚠
                            </span>
                          )}
                          {w.status === "missed" && (
                            <span className="ml-1 text-red-600 font-bold text-xs">
                              ✗
                            </span>
                          )}
                        </span>
                      ))}
                    </div>

                    {insertions.length > 0 && (
                      <div className="mt-3">
                        <p className="text-blue-600 text-xs font-semibold uppercase mb-1.5">
                          Extra words you said (not in passage):
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {insertions.map((word, i) => (
                            <span
                              // biome-ignore lint/suspicious/noArrayIndexKey: insertions stable
                              key={`ins-${i}`}
                              className="px-2 py-1 rounded-lg text-sm font-medium border bg-blue-100 border-blue-400 text-blue-800"
                            >
                              +{word}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 mt-3 text-xs flex-wrap">
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-green-200 inline-block" />
                        <span className="text-green-800 font-semibold">
                          Correct
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-orange-200 inline-block" />
                        <span className="text-orange-800 font-semibold">
                          Mispronounced
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-red-200 inline-block" />
                        <span className="text-red-800 font-semibold">
                          Missed ✗
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-blue-200 inline-block" />
                        <span className="text-blue-800 font-semibold">
                          Extra
                        </span>
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
                  onClick={() => onComplete(wordResults, insertions)}
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
