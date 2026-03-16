import { getVocabByGrade } from "@/data/vocabData";
import type { VocabWord } from "@/data/vocabData";
import { useState } from "react";

interface Props {
  grade: number;
  passageIndex: number;
  onComplete: (sentences: Record<string, string>) => void;
  onBack: () => void;
}

type PronState = "idle" | "listening" | "result";

export default function VocabBuilder({
  grade,
  passageIndex,
  onComplete,
  onBack,
}: Props) {
  const words = getVocabByGrade(grade, passageIndex);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sentences, setSentences] = useState<Record<string, string>>({});
  const [flipped, setFlipped] = useState(false);
  const [pronState, setPronState] = useState<PronState>("idle");
  const [pronResult, setPronResult] = useState<{
    heard: string;
    correct: boolean;
  } | null>(null);

  const word: VocabWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;
  const isLast = currentIndex === words.length - 1;

  const handleSpeak = () => {
    if (!("speechSynthesis" in window)) return;
    const utt = new SpeechSynthesisUtterance(word.word);
    utt.lang = "en-IN";
    utt.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utt);
  };

  const handleSpeakExample = () => {
    if (!("speechSynthesis" in window)) return;
    const utt = new SpeechSynthesisUtterance(word.exampleSentence);
    utt.lang = "en-IN";
    utt.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utt);
  };

  const handleTestPronunciation = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(
        "Speech recognition not supported in this browser. Please use Chrome.",
      );
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
    setPronState("listening");
    setPronResult(null);
    recognition.onresult = (event: any) => {
      const heard = event.results[0][0].transcript.trim().toLowerCase();
      const target = word.word.toLowerCase();
      const correct =
        heard === target || heard.includes(target) || target.includes(heard);
      setPronResult({ heard, correct });
      setPronState("result");
    };
    recognition.onerror = () => {
      setPronState("idle");
    };
    recognition.onend = () => {
      setPronState((prev) => (prev === "listening" ? "idle" : prev));
    };
    recognition.start();
  };

  const handleNext = () => {
    setFlipped(false);
    setPronState("idle");
    setPronResult(null);
    setCurrentIndex((i) => Math.min(i + 1, words.length - 1));
  };

  const handlePrev = () => {
    setFlipped(false);
    setPronState("idle");
    setPronResult(null);
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  const handleComplete = () => {
    onComplete(sentences);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button
              type="button"
              data-ocid="vocab.back.button"
              onClick={onBack}
              className="text-white/80 hover:text-white text-sm"
            >
              ← Back
            </button>
            <h1 className="font-bold text-lg flex-1 text-center">
              📚 Vocabulary Builder
            </h1>
          </div>
          {/* Progress bar */}
          <div className="bg-white/30 rounded-full h-2.5">
            <div
              className="bg-white rounded-full h-2.5 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/80 text-xs mt-1.5 text-center">
            Word {currentIndex + 1} of {words.length}
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-4">
        {/* Flash Card */}
        <button
          type="button"
          className="bg-white rounded-3xl shadow-xl border-2 border-teal-100 overflow-hidden w-full text-left"
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? "Show word" : "Show meaning"}
        >
          {!flipped ? (
            /* Front: word + emoji */
            <div className="p-8 text-center">
              <div className="text-7xl mb-4 select-none">{word.emoji}</div>
              <h2 className="text-4xl font-extrabold text-teal-700 mb-2 tracking-tight">
                {word.word}
              </h2>
              <p className="text-gray-400 text-sm mt-3">
                Tap to see the meaning
              </p>
            </div>
          ) : (
            /* Back: meaning + example */
            <div className="p-6">
              <div className="text-3xl text-center mb-3">{word.emoji}</div>
              <div className="bg-teal-50 rounded-2xl p-4 mb-3">
                <p className="text-xs uppercase tracking-widest text-teal-500 font-semibold mb-1">
                  Meaning
                </p>
                <p className="text-gray-800 font-semibold text-base leading-relaxed">
                  {word.meaning}
                </p>
              </div>
              <div className="bg-cyan-50 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-widest text-cyan-500 font-semibold mb-1">
                  Example Sentence
                </p>
                <p className="text-gray-700 text-sm italic leading-relaxed">
                  &quot;{word.exampleSentence}&quot;
                </p>
              </div>
            </div>
          )}
        </button>

        {/* Listen buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            data-ocid="vocab.card.listen_button"
            onClick={handleSpeak}
            className="flex-1 bg-white border-2 border-teal-200 text-teal-700 font-semibold py-3 rounded-2xl hover:bg-teal-50 transition-colors flex items-center justify-center gap-2"
          >
            🔊 Hear Word
          </button>
          <button
            type="button"
            onClick={handleSpeakExample}
            className="flex-1 bg-white border-2 border-cyan-200 text-cyan-700 font-semibold py-3 rounded-2xl hover:bg-cyan-50 transition-colors flex items-center justify-center gap-2"
          >
            🗣️ Hear Example
          </button>
        </div>

        {/* Pronunciation Test */}
        <div className="space-y-2">
          {pronState === "idle" && (
            <button
              type="button"
              data-ocid="vocab.pron.button"
              onClick={handleTestPronunciation}
              className="w-full bg-white border-2 border-purple-200 text-purple-700 font-semibold py-3 rounded-2xl hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
            >
              🎤 Test My Pronunciation
            </button>
          )}

          {pronState === "listening" && (
            <button
              type="button"
              data-ocid="vocab.pron.button"
              disabled
              className="w-full bg-red-50 border-2 border-red-300 text-red-600 font-semibold py-3 rounded-2xl animate-pulse flex items-center justify-center gap-2 cursor-not-allowed"
            >
              🔴 Listening... say the word
            </button>
          )}

          {pronState === "result" && pronResult && (
            <div
              data-ocid="vocab.pron.success_state"
              className={`rounded-2xl p-4 border-2 ${
                pronResult.correct
                  ? "bg-green-50 border-green-200"
                  : "bg-orange-50 border-orange-200"
              }`}
            >
              <p
                className={`font-bold text-sm ${
                  pronResult.correct ? "text-green-700" : "text-orange-700"
                }`}
              >
                {pronResult.correct
                  ? "✅ Great pronunciation!"
                  : `⚠️ You said: "${pronResult.heard}" — Try again!`}
              </p>
              {!pronResult.correct && (
                <button
                  type="button"
                  data-ocid="vocab.pron.secondary_button"
                  onClick={handleTestPronunciation}
                  className="mt-2 bg-orange-100 border border-orange-300 text-orange-700 text-sm font-semibold px-4 py-1.5 rounded-xl hover:bg-orange-200 transition-colors"
                >
                  🎤 Try Again
                </button>
              )}
            </div>
          )}
        </div>

        {/* Write your own sentence */}
        <div className="bg-white rounded-2xl p-4 border-2 border-amber-100 shadow-sm">
          <p className="text-sm font-bold text-amber-700 mb-2">
            ✏️ Write your own sentence using:{" "}
            <span className="text-teal-700">{word.word}</span>
          </p>
          <textarea
            data-ocid="vocab.card.input"
            value={sentences[word.word] ?? ""}
            onChange={(e) =>
              setSentences((prev) => ({ ...prev, [word.word]: e.target.value }))
            }
            placeholder={`Write a sentence using "${word.word}"...`}
            className="w-full border-2 border-amber-200 rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:border-amber-400 resize-none bg-amber-50 placeholder:text-amber-300 min-h-[70px]"
            rows={2}
          />
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            type="button"
            data-ocid="vocab.card.prev_button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex-1 bg-white border-2 border-gray-200 text-gray-600 font-semibold py-3 rounded-2xl hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          {isLast ? (
            <button
              type="button"
              data-ocid="vocab.complete.primary_button"
              onClick={handleComplete}
              className="flex-1 bg-teal-600 text-white font-bold py-3 rounded-2xl hover:bg-teal-700 transition-colors shadow-md"
            >
              ✅ Complete
            </button>
          ) : (
            <button
              type="button"
              data-ocid="vocab.card.next_button"
              onClick={handleNext}
              className="flex-1 bg-teal-600 text-white font-bold py-3 rounded-2xl hover:bg-teal-700 transition-colors shadow-md"
            >
              Next →
            </button>
          )}
        </div>

        {/* Word dots navigation */}
        <div className="flex justify-center gap-2 py-2">
          {words.map((w, i) => (
            <button
              key={w.word}
              type="button"
              onClick={() => {
                setCurrentIndex(i);
                setFlipped(false);
                setPronState("idle");
                setPronResult(null);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentIndex
                  ? "bg-teal-600 w-5"
                  : sentences[w.word]
                    ? "bg-green-400"
                    : "bg-gray-200"
              }`}
              aria-label={`Word ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
