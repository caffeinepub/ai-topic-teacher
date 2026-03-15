import ComprehensionQuiz from "@/components/ComprehensionQuiz";
import Dashboard from "@/components/Dashboard";
import IntonationPractice from "@/components/IntonationPractice";
import MissingWords from "@/components/MissingWords";
import Onboarding from "@/components/Onboarding";
import PassageReader from "@/components/PassageReader";
import ProgressReport from "@/components/ProgressReport";
import PronunciationPractice from "@/components/PronunciationPractice";
import ReadAndRecord from "@/components/ReadAndRecord";
import { Toaster } from "@/components/ui/sonner";
import { getPassageByGrade, hasMorePassages } from "@/data/content";
import { useStudentStore } from "@/store/useStudentStore";
import { useState } from "react";

type Screen =
  | "onboarding"
  | "dashboard"
  | "passage"
  | "quiz"
  | "missing-words"
  | "pronunciation"
  | "record"
  | "intonation"
  | "report"
  | "completed";

export default function App() {
  const {
    student,
    createStudent,
    addSession,
    advancePassage,
    reset,
    averageScore,
  } = useStudentStore();
  const [screen, setScreen] = useState<Screen>(
    student.name ? "dashboard" : "onboarding",
  );

  const currentOffset = student.passageOffsets?.[student.grade] ?? 0;
  const passage = getPassageByGrade(student.grade, currentOffset);

  const handleOnboarding = (name: string, grade: number) => {
    createStudent(name, grade);
    setScreen("dashboard");
  };

  const handleQuizComplete = (score: number, passed: boolean) => {
    addSession({
      passageId: passage.id,
      grade: student.grade,
      score,
      activity: "quiz",
    });
    if (passed) {
      advancePassage(student.grade);
      const newOffset = currentOffset + 1;
      if (!hasMorePassages(student.grade, newOffset)) {
        setScreen("completed");
      } else {
        setScreen("dashboard");
      }
    }
  };

  const handleMissingComplete = (score: number) => {
    addSession({
      passageId: passage.id,
      grade: student.grade,
      score,
      activity: "missing-words",
    });
  };

  const handleRecordComplete = () => {
    addSession({
      passageId: passage.id,
      grade: student.grade,
      score: 100,
      activity: "record",
    });
  };

  const handlePronunciationComplete = () => {
    addSession({
      passageId: passage.id,
      grade: student.grade,
      score: 100,
      activity: "pronunciation",
    });
  };

  const handleIntonationComplete = () => {
    addSession({
      passageId: passage.id,
      grade: student.grade,
      score: 100,
      activity: "intonation",
    });
  };

  const handleReset = () => {
    reset();
    setScreen("onboarding");
  };

  const handleBackToHome = () => {
    setScreen("onboarding");
  };

  if (screen === "onboarding") {
    return <Onboarding onComplete={handleOnboarding} />;
  }

  if (screen === "completed") {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-6">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-bold text-black mb-2">Classio</h1>
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Amazing Work, {student.name}!
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              You have completed all passages for{" "}
              <span className="font-semibold text-green-700">
                Grade {student.grade}
              </span>
              ! 🎉
            </p>
            <p className="text-gray-500 mb-8">
              You read every passage and passed all the quizzes. That&apos;s a
              fantastic achievement!
            </p>
            <button
              type="button"
              data-ocid="completed.primary_button"
              onClick={handleBackToHome}
              className="bg-green-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-green-700 transition-colors text-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
        <Toaster />
      </>
    );
  }

  if (screen === "passage") {
    return (
      <PassageReader
        passage={passage}
        onStartQuiz={() => setScreen("quiz")}
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  if (screen === "quiz") {
    return (
      <ComprehensionQuiz
        passage={passage}
        onComplete={handleQuizComplete}
        onBack={() => setScreen("dashboard")}
        onRetry={() => setScreen("quiz")}
      />
    );
  }

  if (screen === "missing-words") {
    return (
      <MissingWords
        passage={passage}
        onComplete={handleMissingComplete}
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  if (screen === "pronunciation") {
    return (
      <PronunciationPractice
        passage={passage}
        onComplete={handlePronunciationComplete}
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  if (screen === "record") {
    return (
      <ReadAndRecord
        passage={passage}
        onComplete={handleRecordComplete}
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  if (screen === "intonation") {
    return (
      <IntonationPractice
        passage={passage}
        onComplete={handleIntonationComplete}
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  if (screen === "report") {
    return (
      <ProgressReport
        student={student}
        averageScore={averageScore()}
        onBack={() => setScreen("dashboard")}
        onReset={handleReset}
        onNavigate={(s) => setScreen(s as Screen)}
      />
    );
  }

  return (
    <Dashboard
      student={student}
      onNavigate={(s) => setScreen(s as Screen)}
      onBackToHome={handleBackToHome}
    />
  );
}
