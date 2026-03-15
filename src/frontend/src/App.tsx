import AppHeader from "@/components/AppHeader";
import ComprehensionQuiz from "@/components/ComprehensionQuiz";
import Dashboard from "@/components/Dashboard";
import IntonationPractice from "@/components/IntonationPractice";
import LoginPage from "@/components/LoginPage";
import MissingWords from "@/components/MissingWords";
import Onboarding from "@/components/Onboarding";
import PassageReader from "@/components/PassageReader";
import ProficiencyTest from "@/components/ProficiencyTest";
import ProgressReport from "@/components/ProgressReport";
import PronunciationPractice from "@/components/PronunciationPractice";
import ReadAndRecord from "@/components/ReadAndRecord";
import type { WordResult } from "@/components/ReadAndRecord";
import SuperAdminDashboard from "@/components/SuperAdminDashboard";
import TeacherDashboard from "@/components/TeacherDashboard";
import { Toaster } from "@/components/ui/sonner";
import { getPassageByGrade, hasMorePassages } from "@/data/content";
import type { TeacherAccount } from "@/store/useAuthStore";
import { findStudentProgress, useStudentStore } from "@/store/useStudentStore";
import { getBadge } from "@/utils/badges";
import { useState } from "react";

type Screen =
  | "login"
  | "onboarding"
  | "proficiency-test"
  | "dashboard"
  | "passage"
  | "quiz"
  | "missing-words"
  | "pronunciation"
  | "record"
  | "intonation"
  | "report"
  | "completed"
  | "teacher-dashboard"
  | "super-admin";

export default function App() {
  const {
    student,
    createStudent,
    restoreStudent,
    completeWithProficiency,
    addSession,
    advancePassage,
    reset,
    averageScore,
  } = useStudentStore();
  const [screen, setScreen] = useState<Screen>(() => {
    if (!student.name) return "login";
    if (!student.proficiencyDone) return "proficiency-test";
    return "dashboard";
  });
  const [pendingName, setPendingName] = useState("");
  const [pendingStudentName, setPendingStudentName] = useState("");
  const [recordingWordResults, setRecordingWordResults] = useState<
    WordResult[]
  >([]);
  const [loggedInTeacher, setLoggedInTeacher] = useState<TeacherAccount | null>(
    null,
  );

  const currentOffset = student.passageOffsets?.[student.grade] ?? 0;
  const passage = getPassageByGrade(student.grade, currentOffset);

  // Compute which activities are done for the current passage
  const completedActivities = student.sessions
    .filter((s) => s.passageId === passage.id)
    .map((s) => s.activity);

  const handleStudentLogin = (
    _studentId: string,
    name: string,
    grade: number,
  ) => {
    const savedProgress = findStudentProgress(name);
    if (savedProgress?.proficiencyDone) {
      restoreStudent(savedProgress);
      setScreen("dashboard");
      return;
    }
    setPendingStudentName(name);
    createStudent(name, grade);
    setScreen("proficiency-test");
  };

  const handleTeacherLogin = (teacher: TeacherAccount) => {
    setLoggedInTeacher(teacher);
    setScreen("teacher-dashboard");
  };

  const handleSuperAdminLogin = () => {
    setScreen("super-admin");
  };

  const handleOnboarding = (name: string) => {
    setPendingName(name);
    setScreen("proficiency-test");
  };

  const handleProficiencyComplete = (
    name: string,
    grade: number,
    score?: number,
  ) => {
    completeWithProficiency(name, grade, score ?? 0);
    setScreen("dashboard");
  };

  const handleQuizComplete = (
    score: number,
    passed: boolean,
    quizAnswers: number[],
  ) => {
    addSession({
      passageId: passage.id,
      grade: student.grade,
      score,
      activity: "quiz",
      quizAnswers,
      passageTitle: passage.title,
      wordResults: recordingWordResults,
    });
    // After quiz, always return to dashboard (not auto-advance)
    setScreen("dashboard");
    // Grade adaptation: if passed move up, if failed badly move down (handled by advancePassage inside store)
    if (passed) {
      // Check if all 5 activities are now done for this passage
      // We just completed quiz, other activities might still be pending
      // so just go back to dashboard to continue the sequence
    }
  };

  const handleMissingComplete = (score: number) => {
    addSession({
      passageId: passage.id,
      grade: student.grade,
      score,
      activity: "missing-words",
      passageTitle: passage.title,
    });
    setScreen("dashboard");
  };

  const handleRecordComplete = (
    wordResults: WordResult[],
    insertions: string[],
  ) => {
    setRecordingWordResults(wordResults);
    const correctCount = wordResults.filter(
      (w) => w.status === "correct",
    ).length;
    const accuracyScore =
      wordResults.length > 0
        ? Math.round((correctCount / wordResults.length) * 100)
        : 100;
    addSession({
      passageId: passage.id,
      grade: student.grade,
      score: accuracyScore,
      activity: "record",
      passageTitle: passage.title,
      wordResults,
      insertions,
    });
    // Auto-advance to quiz after record (existing behavior)
    setScreen("quiz");
  };

  const handlePronunciationComplete = () => {
    addSession({
      passageId: passage.id,
      grade: student.grade,
      score: 100,
      activity: "pronunciation",
      passageTitle: passage.title,
    });
    setScreen("dashboard");
  };

  const handleIntonationComplete = () => {
    addSession({
      passageId: passage.id,
      grade: student.grade,
      score: 100,
      activity: "intonation",
      passageTitle: passage.title,
    });
    // After intonation (last activity), check if all 5 are done → advance passage
    const allActivityIds = [
      "record",
      "quiz",
      "missing-words",
      "pronunciation",
      "intonation",
    ];
    const doneAfterIntonation = [
      ...completedActivities.filter((a) => a !== "intonation"),
      "intonation",
    ];
    const allDone = allActivityIds.every((a) =>
      doneAfterIntonation.includes(a),
    );
    if (allDone) {
      advancePassage(student.grade);
      const newOffset = currentOffset + 1;
      if (!hasMorePassages(student.grade, newOffset)) {
        setScreen("completed");
      } else {
        setScreen("dashboard");
      }
    } else {
      setScreen("dashboard");
    }
  };

  const handleReset = () => {
    reset();
    setScreen("login");
  };

  const handleBackToHome = () => {
    setScreen("login");
  };

  if (screen === "login") {
    return (
      <>
        <LoginPage
          onStudentLogin={handleStudentLogin}
          onTeacherLogin={handleTeacherLogin}
          onSuperAdminLogin={handleSuperAdminLogin}
        />
        <Toaster />
      </>
    );
  }

  if (screen === "super-admin") {
    return (
      <>
        <SuperAdminDashboard onBack={() => setScreen("login")} />
        <Toaster />
      </>
    );
  }

  if (screen === "teacher-dashboard") {
    return (
      <>
        <TeacherDashboard
          teacher={loggedInTeacher!}
          onBack={() => setScreen("login")}
        />
        <Toaster />
      </>
    );
  }

  if (screen === "onboarding") {
    return (
      <>
        <Onboarding onComplete={handleOnboarding} />
        <Toaster />
      </>
    );
  }

  if (screen === "proficiency-test") {
    return (
      <ProficiencyTest
        name={pendingStudentName || pendingName}
        onComplete={handleProficiencyComplete}
      />
    );
  }

  if (screen === "completed") {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-teal-50 to-cyan-50">
          <AppHeader />
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="text-center max-w-md">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-2xl font-bold text-teal-700 mb-4">
                Amazing Work, {student.name}!
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                You have completed all passages for{" "}
                <span className="font-semibold text-teal-700">
                  {getBadge(student.grade).emoji} {getBadge(student.grade).name}
                </span>
                ! 🎉
              </p>
              <p className="text-gray-500 mb-8">
                You read every passage and answered all the quizzes. That&apos;s
                a fantastic achievement!
              </p>
              <button
                type="button"
                data-ocid="completed.primary_button"
                onClick={handleBackToHome}
                className="bg-teal-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-teal-700 transition-colors text-lg"
              >
                Back to Home
              </button>
            </div>
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
        wordResults={recordingWordResults}
        onComplete={handleQuizComplete}
        onBack={() => setScreen("dashboard")}
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
      completedActivities={completedActivities}
      currentPassageTitle={passage.title}
    />
  );
}
