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
import { getPassageByGrade } from "@/data/content";
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
  | "report";

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
