import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface Props {
  name: string;
  onComplete: (name: string, grade: number) => void;
}

const PASSAGE =
  "The sun is big and bright. It gives us light and warmth. Birds fly in the blue sky. Children play in the park. We see flowers and trees. The dog runs on the grass. We love sunny days.";

const PASSAGE_WORDS = PASSAGE.toLowerCase()
  .replace(/[^a-z\s]/g, "")
  .split(/\s+/)
  .filter(Boolean);

function calcGrade(accuracy: number): number {
  if (accuracy >= 90) return 5;
  if (accuracy >= 75) return 4;
  if (accuracy >= 60) return 3;
  if (accuracy >= 45) return 2;
  return 1;
}

type Step = "intro" | "recording" | "result";

export default function ProficiencyTest({ name, onComplete }: Props) {
  const [step, setStep] = useState<Step>("intro");
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [accuracy, setAccuracy] = useState(0);
  const [suggestedGrade, setSuggestedGrade] = useState(1);
  const [selectedGrade, setSelectedGrade] = useState(0);
  const recognitionRef = useRef<any>(null);
  const accumulatedRef = useRef("");

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

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
    const heard = (accumulatedRef.current || transcript)
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(/\s+/)
      .filter(Boolean);
    let correct = 0;
    for (const word of PASSAGE_WORDS) {
      if (heard.includes(word)) correct++;
    }
    const acc = Math.round((correct / PASSAGE_WORDS.length) * 100);
    const grade = calcGrade(acc);
    setAccuracy(acc);
    setSuggestedGrade(grade);
    setSelectedGrade(grade);
    setStep("result");
  };

  const gradeColors = [
    "bg-emerald-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-rose-500",
  ];

  const gradeMessages: Record<number, string> = {
    1: "Great start! Let's begin with Grade 1 — easy and fun! 🌟",
    2: "Good job! Grade 2 is a great match for you! 🎉",
    3: "Awesome! Grade 3 passages are just right for you! 🚀",
    4: "Excellent! Grade 4 will challenge you in the best way! 💪",
    5: "Wow, you're a star reader! Grade 5 here you come! 🏆",
  };

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <AppHeader />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {step === "intro" && (
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center space-y-6">
              <div className="text-6xl">🎓</div>
              <h2 className="text-2xl font-bold text-amber-700">
                Hi {name}! Let's find your level
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                We'll ask you to read a short passage aloud. This helps us
                choose the best grade level for you!
              </p>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 text-left">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-3">
                  📖 Read this passage aloud:
                </p>
                <p className="text-gray-800 text-base leading-relaxed font-medium">
                  {PASSAGE}
                </p>
              </div>
              <Button
                data-ocid="proficiency.start.primary_button"
                onClick={startRecording}
                className="w-full h-14 text-lg rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold"
              >
                🎤 Start Reading
              </Button>
            </div>
          )}

          {step === "recording" && (
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center space-y-6">
              <div className="text-6xl">📖</div>
              <h2 className="text-2xl font-bold text-amber-700">Read Aloud!</h2>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 text-left">
                <p className="text-gray-800 text-base leading-relaxed font-medium">
                  {PASSAGE}
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
                    ✅ Submit
                  </Button>
                )}
              </div>
            </div>
          )}

          {step === "result" && (
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center space-y-6">
              <div className="text-6xl">🎉</div>
              <h2 className="text-2xl font-bold text-amber-700">
                Great job, {name}!
              </h2>

              <div className="bg-amber-50 rounded-2xl p-5 space-y-3">
                <div className="flex justify-center">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-amber-600">
                      {accuracy}%
                    </p>
                    <p className="text-gray-500 text-sm mt-1">Accuracy</p>
                  </div>
                </div>
                <p className="text-gray-700 text-base font-medium">
                  {gradeMessages[suggestedGrade]}
                </p>
                <div className="bg-white rounded-xl py-3 px-4 border border-amber-200">
                  <p className="text-sm text-gray-600">
                    Suggested Grade:{" "}
                    <span className="font-bold text-amber-700 text-lg">
                      Grade {suggestedGrade}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600 mb-3">
                  Or choose your grade manually:
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {gradeColors.map((color, i) => (
                    <button
                      key={color}
                      type="button"
                      data-ocid={`proficiency.grade.${i + 1}`}
                      onClick={() => setSelectedGrade(i + 1)}
                      className={`p-3 rounded-xl text-white font-bold text-sm transition-all ${
                        selectedGrade === i + 1
                          ? `${color} scale-110 shadow-md`
                          : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                      }`}
                    >
                      {i + 1}
                      <div className="text-xs font-normal mt-0.5">Grade</div>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                data-ocid="proficiency.confirm.primary_button"
                disabled={selectedGrade === 0}
                onClick={() => onComplete(name, selectedGrade)}
                className="w-full h-14 text-lg rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold"
              >
                Start Learning at Grade {selectedGrade}! 🚀
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
