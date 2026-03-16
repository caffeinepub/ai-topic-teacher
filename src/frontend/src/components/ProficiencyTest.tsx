import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { getPassageByGrade } from "@/data/content";
import { getBadge, getBadgeLabel } from "@/utils/badges";
import { useEffect, useRef, useState } from "react";

interface Props {
  name: string;
  startGrade: number;
  onComplete: (name: string, grade: number, score: number) => void;
}

type Step = "intro" | "recording" | "comprehension" | "evaluation" | "result";

function getPassageWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function computeAccuracy(heard: string, passageText: string): number {
  const passageWords = getPassageWords(passageText);
  const heardWords = heard
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
  let correct = 0;
  for (const word of passageWords) {
    if (heardWords.includes(word)) correct++;
  }
  return passageWords.length > 0
    ? Math.round((correct / passageWords.length) * 100)
    : 0;
}

const gradeMessages: Record<number, string> = {
  1: "Great start! You are a Seedling — every expert was once a beginner! 🌱",
  2: "Good job! You are an Explorer — curious minds go far! 🔍",
  3: "Awesome! You are an Adventurer — the journey has just begun! 🗺️",
  4: "Excellent! You are a Thinker — brilliant ideas ahead! 💡",
  5: "Well done! You are an Achiever — stars shine bright! ⭐",
  6: "Great job! You are a Champion — champions never stop! 🏆",
  7: "Impressive! You are a Scholar — knowledge is power! 📚",
  8: "Amazing! You are an Innovator — sky is not the limit! 🚀",
  9: "Outstanding! You are a Leader — lead with courage! 🦁",
  10: "Extraordinary! You are a Master — wisdom unlocked! 🎓",
};

export default function ProficiencyTest({
  name,
  startGrade,
  onComplete,
}: Props) {
  const [currentTestGrade, setCurrentTestGrade] = useState<number>(
    Math.max(1, Math.min(10, startGrade)),
  );
  const [step, setStep] = useState<Step>("intro");
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [readingAccuracy, setReadingAccuracy] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [finalGrade, setFinalGrade] = useState<number>(startGrade);
  const [finalScore, setFinalScore] = useState(0);
  const [gradeDirectionMessage, setGradeDirectionMessage] = useState("");
  const [offerUpgrade, setOfferUpgrade] = useState(false);
  const recognitionRef = useRef<any>(null);
  const accumulatedRef = useRef("");

  const passage = getPassageByGrade(currentTestGrade, 0);
  const quizQuestions = passage.questions.slice(0, 3);
  const pronunciationPreview = passage.pronunciationWords.slice(0, 5);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  // Reset state when grade changes so a fresh attempt starts
  const resetForGrade = (grade: number, message: string) => {
    setCurrentTestGrade(grade);
    setTranscript("");
    setReadingAccuracy(0);
    setQuizScore(0);
    setSelectedAnswers([]);
    setGradeDirectionMessage(message);
    accumulatedRef.current = "";
    setStep("intro");
  };

  const startRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(
        "Speech recognition is not supported in this browser. Please use Chrome.",
      );
      return;
    }
    accumulatedRef.current = "";
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event: any) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) {
          final += `${res[0].transcript} `;
        } else {
          interim += res[0].transcript;
        }
      }
      if (final) accumulatedRef.current += final;
      setTranscript((accumulatedRef.current + interim).trim());
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
    setStep("recording");
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  const submitRecording = () => {
    const heard = accumulatedRef.current || transcript;
    const acc = computeAccuracy(heard, passage.recordPassage || passage.text);
    setReadingAccuracy(acc);
    setSelectedAnswers(Array(quizQuestions.length).fill(-1));
    setStep("comprehension");
  };

  const submitQuiz = () => {
    let correct = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
      if (selectedAnswers[i] === quizQuestions[i].correct) correct++;
    }
    const qScore = Math.round((correct / quizQuestions.length) * 100);
    setQuizScore(qScore);

    // Combined score: 60% reading + 40% quiz
    const combined = Math.round(readingAccuracy * 0.6 + qScore * 0.4);
    setFinalScore(combined);
    setStep("evaluation");
  };

  const handleEvaluationDecision = (combined: number) => {
    if (combined < 50) {
      // Move down a grade
      const newGrade = Math.max(1, currentTestGrade - 1);
      if (newGrade === currentTestGrade) {
        // Already at grade 1, confirm this grade
        setFinalGrade(currentTestGrade);
        setStep("result");
      } else {
        resetForGrade(
          newGrade,
          `Let's try an easier passage! We'll find the right level for you. 😊`,
        );
      }
    } else if (combined >= 80) {
      // Offer to try next grade up
      const nextGrade = Math.min(10, currentTestGrade + 1);
      if (nextGrade === currentTestGrade) {
        setFinalGrade(currentTestGrade);
        setStep("result");
      } else {
        setFinalGrade(currentTestGrade);
        setOfferUpgrade(true);
      }
    } else {
      // 50–79: confirm current grade
      setFinalGrade(currentTestGrade);
      setStep("result");
    }
  };

  const acceptUpgrade = () => {
    const newGrade = Math.min(10, currentTestGrade + 1);
    setOfferUpgrade(false);
    resetForGrade(
      newGrade,
      `You're doing great! Let's try Grade ${newGrade} 🚀`,
    );
  };

  const declineUpgrade = () => {
    setOfferUpgrade(false);
    setStep("result");
  };

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <AppHeader />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Intro Step */}
          {step === "intro" && (
            <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-3">🎓</div>
                <h2 className="text-2xl font-bold text-amber-700">
                  Hi {name}! Let&apos;s find your level
                </h2>
                {gradeDirectionMessage && (
                  <div className="mt-3 bg-teal-50 border border-teal-200 rounded-xl px-4 py-2">
                    <p className="text-teal-700 text-sm font-medium">
                      {gradeDirectionMessage}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`bg-gradient-to-br ${getBadge(currentTestGrade).gradient} px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow`}
                >
                  <span className="text-xl">
                    {getBadge(currentTestGrade).emoji}
                  </span>
                  <span className="text-white font-bold text-sm">
                    {getBadge(currentTestGrade).name} Level Passage
                  </span>
                </div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-3">
                  📖 Read this passage aloud:
                </p>
                <p className="text-gray-800 text-base leading-relaxed font-medium">
                  {passage.recordPassage || passage.text}
                </p>
              </div>

              <p className="text-gray-500 text-sm text-center">
                We&apos;ll also ask you 3 questions about this passage
                afterwards.
              </p>

              <Button
                data-ocid="proficiency.start.primary_button"
                onClick={startRecording}
                className="w-full h-14 text-lg rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold"
              >
                🎤 Start Reading
              </Button>
            </div>
          )}

          {/* Recording Step */}
          {step === "recording" && (
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center space-y-6">
              <div className="text-6xl">📖</div>
              <h2 className="text-2xl font-bold text-amber-700">Read Aloud!</h2>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 text-left">
                <p className="text-gray-800 text-base leading-relaxed font-medium">
                  {passage.recordPassage || passage.text}
                </p>
              </div>

              {isRecording && (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                    <span className="text-3xl">🎙️</span>
                  </div>
                  <p className="text-red-600 font-semibold text-sm">
                    Recording… speak clearly
                  </p>
                </div>
              )}

              {transcript && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-left">
                  <p className="text-xs text-blue-500 font-semibold mb-1">
                    Heard:
                  </p>
                  <p className="text-sm text-gray-700 italic">{transcript}</p>
                </div>
              )}

              <div className="flex gap-3">
                {isRecording ? (
                  <Button
                    data-ocid="proficiency.stop.button"
                    onClick={stopRecording}
                    className="flex-1 h-12 rounded-xl bg-gray-700 hover:bg-gray-800 text-white font-semibold"
                  >
                    ⏹ Stop
                  </Button>
                ) : (
                  <Button
                    data-ocid="proficiency.submit.button"
                    onClick={submitRecording}
                    className="flex-1 h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
                  >
                    ✅ Submit & Answer Questions
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Comprehension Step */}
          {step === "comprehension" && (
            <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
              <div className="text-center">
                <div className="text-5xl mb-2">🧠</div>
                <h2 className="text-xl font-bold text-amber-700">
                  Comprehension Check
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Answer 3 questions about the passage you just read.
                </p>
              </div>

              <div className="space-y-5">
                {quizQuestions.map((q, qi) => (
                  <div
                    key={q.question}
                    className="bg-amber-50 rounded-2xl p-4 border border-amber-200"
                  >
                    <p className="font-semibold text-gray-800 mb-3 text-sm">
                      {qi + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, oi) => (
                        <button
                          key={opt}
                          type="button"
                          data-ocid={`proficiency.quiz.option.${qi + 1}`}
                          onClick={() => {
                            const updated = [...selectedAnswers];
                            updated[qi] = oi;
                            setSelectedAnswers(updated);
                          }}
                          className={[
                            "text-left px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all",
                            selectedAnswers[qi] === oi
                              ? "bg-amber-500 border-amber-500 text-white"
                              : "bg-white border-gray-200 text-gray-700 hover:border-amber-300",
                          ].join(" ")}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                data-ocid="proficiency.quiz.submit_button"
                disabled={selectedAnswers.some((a) => a === -1)}
                onClick={submitQuiz}
                className="w-full h-12 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold"
              >
                ✅ Submit Answers
              </Button>
            </div>
          )}

          {/* Evaluation Step */}
          {step === "evaluation" && !offerUpgrade && (
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center space-y-6">
              <div className="text-6xl">📊</div>
              <h2 className="text-2xl font-bold text-amber-700">
                Your Results
              </h2>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 rounded-2xl p-3">
                  <p className="text-2xl font-bold text-blue-600">
                    {readingAccuracy}%
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Reading</p>
                </div>
                <div className="bg-green-50 rounded-2xl p-3">
                  <p className="text-2xl font-bold text-green-600">
                    {quizScore}%
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Quiz</p>
                </div>
                <div className="bg-amber-50 rounded-2xl p-3">
                  <p className="text-2xl font-bold text-amber-600">
                    {finalScore}%
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Combined</p>
                </div>
              </div>

              <Button
                data-ocid="proficiency.evaluate.primary_button"
                onClick={() => handleEvaluationDecision(finalScore)}
                className="w-full h-12 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold"
              >
                See My Level →
              </Button>
            </div>
          )}

          {/* Upgrade offer */}
          {offerUpgrade && (
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center space-y-6">
              <div className="text-6xl">🌟</div>
              <h2 className="text-2xl font-bold text-teal-700">
                You&apos;re doing great!
              </h2>
              <p className="text-gray-600">
                You scored <strong>{finalScore}%</strong> on the{" "}
                {getBadge(currentTestGrade).name} level. Want to try the next
                level?
              </p>
              <div
                className={`bg-gradient-to-br ${getBadge(Math.min(10, currentTestGrade + 1)).gradient} text-white rounded-2xl py-4 px-6 flex items-center justify-center gap-2 shadow`}
              >
                <span className="text-3xl">
                  {getBadge(Math.min(10, currentTestGrade + 1)).emoji}
                </span>
                <span className="font-bold text-xl">
                  {getBadge(Math.min(10, currentTestGrade + 1)).name} Level
                </span>
              </div>
              <div className="flex gap-3">
                <Button
                  data-ocid="proficiency.upgrade.cancel_button"
                  onClick={declineUpgrade}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-gray-300 text-gray-600"
                >
                  No, stay here
                </Button>
                <Button
                  data-ocid="proficiency.upgrade.confirm_button"
                  onClick={acceptUpgrade}
                  className="flex-1 h-12 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold"
                >
                  Yes, try it! 🚀
                </Button>
              </div>
            </div>
          )}

          {/* Result Step */}
          {step === "result" && (
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center space-y-6">
              <div className="text-6xl">🎉</div>
              <h2 className="text-2xl font-bold text-amber-700">
                Great job, {name}!
              </h2>

              <div className="bg-amber-50 rounded-2xl p-5 space-y-4">
                <div className="flex justify-center gap-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-amber-600">
                      {finalScore}%
                    </p>
                    <p className="text-gray-500 text-sm mt-1">Your Score</p>
                  </div>
                </div>
                <p className="text-gray-700 text-base font-medium">
                  {gradeMessages[finalGrade]}
                </p>
                <div className="bg-white rounded-xl py-3 px-4 border border-amber-200 flex items-center justify-center gap-3">
                  <p className="text-sm text-gray-600">Your Badge:</p>
                  <div
                    className={`bg-gradient-to-br ${getBadge(finalGrade).gradient} px-4 py-2 rounded-xl flex items-center gap-2 shadow`}
                  >
                    <span className="text-2xl">
                      {getBadge(finalGrade).emoji}
                    </span>
                    <span className="text-white font-extrabold text-base">
                      {getBadge(finalGrade).name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pronunciation words preview from the same passage */}
              {pronunciationPreview.length > 0 && (
                <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-left">
                  <p className="text-xs font-bold text-teal-600 uppercase tracking-wide mb-3">
                    🗣️ Words you&apos;ll practice:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pronunciationPreview.map((pw) => (
                      <span
                        key={pw.word}
                        className="bg-white border border-teal-200 text-teal-700 font-semibold px-3 py-1 rounded-full text-sm"
                      >
                        {pw.word}
                      </span>
                    ))}
                    {passage.pronunciationWords.length > 5 && (
                      <span className="text-teal-500 text-sm font-medium px-2 py-1">
                        +{passage.pronunciationWords.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <Button
                data-ocid="proficiency.confirm.primary_button"
                onClick={() => onComplete(name, finalGrade, finalScore)}
                className="w-full h-14 text-lg rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold"
              >
                {`Start as ${getBadgeLabel(finalGrade)}! 🚀`}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
