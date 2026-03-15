import { Button } from "@/components/ui/button";
import type { Passage } from "@/data/content";
import { Mic, Send, Square, Volume2 } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
  passage: Passage;
  onComplete: () => void;
  onBack: () => void;
}

type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionEvent = {
  results: {
    [index: number]: {
      [index: number]: { transcript: string };
      length: number;
    };
  };
};

type Rating = "good" | "needs_improvement" | null;
type TestState = "idle" | "ready" | "recording" | "recorded" | "rated";
type VoiceType = "adult" | "child" | "old";

const VOICE_OPTIONS: {
  type: VoiceType;
  label: string;
  emoji: string;
  pitch: number;
  rate: number;
}[] = [
  { type: "adult", label: "Adult", emoji: "🧑", pitch: 1.0, rate: 0.85 },
  { type: "child", label: "Child", emoji: "👦", pitch: 1.5, rate: 1.0 },
  { type: "old", label: "Old", emoji: "👴", pitch: 0.7, rate: 0.7 },
];

function speakIndianEnglish(word: string, voiceType: VoiceType = "adult") {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);

  const voiceOpt =
    VOICE_OPTIONS.find((v) => v.type === voiceType) ?? VOICE_OPTIONS[0];
  utterance.pitch = voiceOpt.pitch;
  utterance.rate = voiceOpt.rate;

  // Try to find an Indian English voice
  const voices = window.speechSynthesis.getVoices();
  const indianVoice =
    voices.find((v) => v.lang === "en-IN") ||
    voices.find((v) => v.lang.startsWith("en-IN")) ||
    voices.find((v) => v.name.toLowerCase().includes("india")) ||
    null;

  if (indianVoice) {
    utterance.voice = indianVoice;
    utterance.lang = "en-IN";
  } else {
    utterance.lang = "en-IN";
  }

  window.speechSynthesis.speak(utterance);
}

export default function PronunciationPractice({
  passage,
  onComplete,
  onBack,
}: Props) {
  const words = passage.pronunciationWords;
  const [current, setCurrent] = useState(0);
  const [practiced, setPracticed] = useState<Set<number>>(new Set());
  const [testState, setTestState] = useState<TestState>("idle");
  const [rating, setRating] = useState<Rating>(null);
  const [heard, setHeard] = useState("");
  const [selectedVoice, setSelectedVoice] = useState<VoiceType>("adult");
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const capturedTranscriptRef = useRef("");

  const w = words[current];
  const allDone = practiced.size === words.length;

  const handleTestMyPronunciation = () => {
    setTestState("ready");
    setRating(null);
    setHeard("");
    capturedTranscriptRef.current = "";
  };

  const startRecording = () => {
    const SpeechRecognition =
      (
        window as typeof window & {
          SpeechRecognition?: typeof window.SpeechRecognition;
          webkitSpeechRecognition?: typeof window.SpeechRecognition;
        }
      ).SpeechRecognition ||
      (
        window as typeof window & {
          webkitSpeechRecognition?: typeof window.SpeechRecognition;
        }
      ).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech recognition is not supported in this browser. Please use Chrome.",
      );
      return;
    }

    capturedTranscriptRef.current = "";
    setTestState("recording");

    const recognition =
      new SpeechRecognition() as unknown as SpeechRecognitionInstance;
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.trim();
      capturedTranscriptRef.current = spokenText;
    };

    recognition.onerror = () => {
      capturedTranscriptRef.current = "";
    };

    recognition.onend = () => {
      // Wait for user to click Submit
    };

    recognition.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setTestState("recorded");
  };

  const submitPronunciation = () => {
    const transcript = capturedTranscriptRef.current;
    if (!transcript) {
      setHeard("Could not hear clearly. Please try again.");
      setRating("needs_improvement");
      setTestState("rated");
      return;
    }

    const alternatives = [transcript.toLowerCase().trim()];
    const target = w.word.toLowerCase().trim();
    const isCorrect = alternatives.some((alt) => {
      if (alt === target) return true;
      if (alt.split(" ").includes(target)) return true;
      const similarity = calcSimilarity(alt.split(" ")[0] || alt, target);
      return similarity >= 0.75;
    });

    setHeard(transcript);
    setRating(isCorrect ? "good" : "needs_improvement");
    setTestState("rated");

    if (isCorrect) {
      setPracticed((prev) => new Set([...prev, current]));
    }
  };

  const goNext = () => {
    setRating(null);
    setHeard("");
    setTestState("idle");
    capturedTranscriptRef.current = "";
    if (current + 1 < words.length) setCurrent((c) => c + 1);
  };

  const retryWord = () => {
    setRating(null);
    setHeard("");
    setTestState("idle");
    capturedTranscriptRef.current = "";
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
                className={`h-1.5 flex-1 rounded-full ${
                  practiced.has(i)
                    ? "bg-white"
                    : i === current
                      ? "bg-white/60"
                      : "bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Voice Selector */}
        <div className="px-4 pt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Choose Voice
          </p>
          <div className="flex gap-2" data-ocid="pronunciation.voice.toggle">
            {VOICE_OPTIONS.map((opt) => (
              <button
                key={opt.type}
                type="button"
                data-ocid={`pronunciation.voice.${opt.type}.toggle`}
                onClick={() => setSelectedVoice(opt.type)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all border-2 flex flex-col items-center gap-0.5 ${
                  selectedVoice === opt.type
                    ? "bg-purple-600 border-purple-600 text-white shadow-md"
                    : "bg-white border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-700"
                }`}
              >
                <span className="text-xl">{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Word Card */}
          <div className="bg-purple-50 rounded-3xl p-6 text-center">
            <p className="text-5xl font-bold text-purple-900 font-display mb-2">
              {w.word}
            </p>
            <p className="text-2xl text-purple-600 font-semibold tracking-widest">
              {w.syllables}
            </p>
            <p className="text-purple-400 mt-1 text-lg">{w.phonetic}</p>
            <Button
              data-ocid="pronunciation.listen.button"
              variant="outline"
              onClick={() => speakIndianEnglish(w.word, selectedVoice)}
              className="mt-4 rounded-xl border-purple-400 text-purple-700 hover:bg-purple-100 flex items-center gap-2 mx-auto"
            >
              <Volume2 size={18} /> Listen
            </Button>
          </div>

          {/* Example Sentence */}
          <div className="bg-amber-50 rounded-2xl p-4">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">
              Example Sentence
            </p>
            <p className="text-gray-800 text-base leading-relaxed italic">
              &ldquo;{w.example}&rdquo;
            </p>
          </div>

          {/* STEP 1: Test My Pronunciation button */}
          {testState === "idle" && (
            <Button
              data-ocid="pronunciation.test.button"
              onClick={handleTestMyPronunciation}
              className="w-full rounded-xl h-14 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold"
            >
              🎤 Test My Pronunciation
            </Button>
          )}

          {/* STEP 2: Mic icon shown — click to start recording */}
          {testState === "ready" && (
            <div className="flex flex-col items-center gap-4 py-4">
              <p className="text-gray-500 text-sm font-medium">
                Tap the mic to start recording
              </p>
              <button
                type="button"
                data-ocid="pronunciation.mic.button"
                onClick={startRecording}
                className="w-24 h-24 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <Mic size={44} />
              </button>
            </div>
          )}

          {/* STEP 3: Recording — show Stop button */}
          {testState === "recording" && (
            <div className="flex flex-col items-center gap-4 py-4">
              <div
                data-ocid="pronunciation.recording.loading_state"
                className="flex items-center gap-2 text-red-500 font-semibold text-sm"
              >
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping inline-block" />
                Recording... Say the word:{" "}
                <span className="underline font-bold">{w.word}</span>
              </div>
              <button
                type="button"
                data-ocid="pronunciation.stop.button"
                onClick={stopRecording}
                className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 animate-pulse"
              >
                <Square size={32} fill="white" />
              </button>
              <p className="text-gray-400 text-xs">Tap to stop</p>
            </div>
          )}

          {/* STEP 4: Recorded — show Submit button */}
          {testState === "recorded" && (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2 text-green-700 text-sm font-medium">
                Recording captured! Click Submit to check your pronunciation.
              </div>
              <div className="flex gap-3 w-full">
                <Button
                  data-ocid="pronunciation.retry_record.button"
                  variant="outline"
                  onClick={() => setTestState("ready")}
                  className="flex-1 rounded-xl h-12 border-gray-300 text-gray-600"
                >
                  Re-record
                </Button>
                <Button
                  data-ocid="pronunciation.submit.button"
                  onClick={submitPronunciation}
                  className="flex-1 rounded-xl h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Submit
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: Rating Result */}
          {testState === "rated" && rating === "good" && (
            <div
              data-ocid="pronunciation.good.success_state"
              className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center space-y-3"
            >
              <p className="text-4xl">🎉</p>
              <p className="text-green-700 font-bold text-xl">Good!</p>
              <p className="text-green-600 text-sm">
                You said: &ldquo;<span className="font-semibold">{heard}</span>
                &rdquo;
              </p>
              <p className="text-gray-500 text-sm">
                Great pronunciation! You can move to the next word.
              </p>
              <Button
                data-ocid="pronunciation.good.listen.button"
                variant="outline"
                onClick={() => speakIndianEnglish(w.word, selectedVoice)}
                className="w-full rounded-xl h-11 border-purple-400 text-purple-700 hover:bg-purple-100 flex items-center justify-center gap-2"
              >
                <Volume2 size={18} /> Listen to Word Again
              </Button>
              {current + 1 < words.length ? (
                <Button
                  data-ocid="pronunciation.next.button"
                  onClick={goNext}
                  className="w-full rounded-xl h-12 bg-green-500 hover:bg-green-600 text-white font-bold"
                >
                  Next Word →
                </Button>
              ) : (
                <Button
                  data-ocid="pronunciation.done.button"
                  onClick={() => {
                    onComplete();
                    onBack();
                  }}
                  className="w-full rounded-xl h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  🎉 All Done! Back to Home
                </Button>
              )}
            </div>
          )}

          {testState === "rated" && rating === "needs_improvement" && (
            <div
              data-ocid="pronunciation.needs_improvement.error_state"
              className="bg-orange-50 border border-orange-200 rounded-2xl p-5 text-center space-y-3"
            >
              <p className="text-4xl">🔁</p>
              <p className="text-orange-700 font-bold text-xl">
                Needs Improvement
              </p>
              {heard && !heard.startsWith("Could not") && (
                <p className="text-orange-600 text-sm">
                  You said: &ldquo;
                  <span className="font-semibold">{heard}</span>&rdquo;
                </p>
              )}
              <p className="text-gray-500 text-sm">
                The correct word is{" "}
                <span className="font-bold text-purple-700">{w.word}</span>.
                Practice a few more times and try again!
              </p>
              <Button
                data-ocid="pronunciation.retry.button"
                onClick={retryWord}
                className="w-full rounded-xl h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold"
              >
                🎤 Try Again
              </Button>
            </div>
          )}

          {/* Navigation */}
          <Button
            data-ocid="pronunciation.prev.button"
            variant="outline"
            disabled={current === 0}
            onClick={() => {
              setCurrent((c) => c - 1);
              setRating(null);
              setHeard("");
              setTestState("idle");
            }}
            className="w-full rounded-xl h-12 border-purple-200 text-purple-600"
          >
            ← Previous
          </Button>

          {allDone && testState === "idle" && (
            <Button
              data-ocid="pronunciation.alldone.button"
              onClick={() => {
                onComplete();
                onBack();
              }}
              className="w-full rounded-xl h-12 bg-green-500 hover:bg-green-600 text-white text-lg"
            >
              🎉 All Done! Back to Home
            </Button>
          )}

          {/* Word List */}
          <div className="flex flex-wrap gap-2">
            {words.map((w2, i) => (
              <button
                key={w2.word}
                type="button"
                data-ocid={`pronunciation.word.${i + 1}`}
                onClick={() => {
                  setCurrent(i);
                  setRating(null);
                  setHeard("");
                  setTestState("idle");
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                  i === current
                    ? "bg-purple-600 text-white border-purple-600"
                    : practiced.has(i)
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-gray-100 text-gray-600 border-gray-200"
                }`}
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

// Simple character similarity (Dice coefficient)
function calcSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length < 2 || b.length < 2) return 0;
  const bigrams = (s: string) => {
    const set = new Map<string, number>();
    for (let i = 0; i < s.length - 1; i++) {
      const bg = s.slice(i, i + 2);
      set.set(bg, (set.get(bg) ?? 0) + 1);
    }
    return set;
  };
  const aBigrams = bigrams(a);
  const bBigrams = bigrams(b);
  let intersection = 0;
  for (const [bg, count] of aBigrams) {
    const bCount = bBigrams.get(bg) ?? 0;
    intersection += Math.min(count, bCount);
  }
  return (2 * intersection) / (a.length - 1 + b.length - 1);
}
