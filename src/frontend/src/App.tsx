import AppHeader from "@/components/AppHeader";
import ChangePassword from "@/components/ChangePassword";
import ComprehensionQuiz from "@/components/ComprehensionQuiz";
import Dashboard from "@/components/Dashboard";
import LoginPage from "@/components/LoginPage";
import Onboarding from "@/components/Onboarding";
import PassageReader from "@/components/PassageReader";
import ProficiencyTest from "@/components/ProficiencyTest";
import ProgressReport from "@/components/ProgressReport";
import PronunciationPractice from "@/components/PronunciationPractice";
import ReadAndRecord from "@/components/ReadAndRecord";
import type { WordResult } from "@/components/ReadAndRecord";
import SuperAdminDashboard from "@/components/SuperAdminDashboard";
import TeacherDashboard from "@/components/TeacherDashboard";
import VocabBuilder from "@/components/VocabBuilder";
import VocabPracticeTest from "@/components/VocabPracticeTest";
import WeeklyVocabTest from "@/components/WeeklyVocabTest";
import { Toaster } from "@/components/ui/sonner";
import { getPassageByGrade } from "@/data/content";
import { getVocabByGrade } from "@/data/vocabData";
import type { StudentAccount, TeacherAccount } from "@/store/useAuthStore";
import type { WeeklyReportData } from "@/store/useStudentStore";
import { findStudentProgress, useStudentStore } from "@/store/useStudentStore";
import { getBadge } from "@/utils/badges";
import { getDayInfo, getStartDayForGrade } from "@/utils/dayPlan";
import { useState } from "react";

type Screen =
  | "login"
  | "onboarding"
  | "change-password"
  | "proficiency-test"
  | "dashboard"
  | "passage"
  | "quiz"
  | "pronunciation"
  | "record"
  | "vocab_learn"
  | "vocab_test"
  | "weekly_vocab_test"
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
    advanceDay200,
    reset,
    averageScore,
    saveVocabSentences,
    addWeeklyReport,
  } = useStudentStore();
  const [screen, setScreen] = useState<Screen>(() => {
    if (!student.name) return "login";
    if (!student.proficiencyDone) return "proficiency-test";
    return "dashboard";
  });
  const [pendingName, setPendingName] = useState("");
  const [pendingStudentName, setPendingStudentName] = useState("");
  const [pendingStudentAccount, setPendingStudentAccount] =
    useState<StudentAccount | null>(null);
  const [loggedInStudentAccount, setLoggedInStudentAccount] =
    useState<StudentAccount | null>(null);
  const [passwordChangeSource, setPasswordChangeSource] = useState<
    "login" | "dashboard"
  >("login");
  const [recordingWordResults, setRecordingWordResults] = useState<
    WordResult[]
  >([]);
  const [loggedInTeacher, setLoggedInTeacher] = useState<TeacherAccount | null>(
    null,
  );

  // Derive current passage from day200 plan
  const currentDay200 = student.currentDay200 ?? 1;
  const dayInfo = getDayInfo(currentDay200);
  const passage = getPassageByGrade(dayInfo.grade, dayInfo.passageIndex);

  // Compute which activities are done for the current passage
  const completedActivities = student.sessions
    .filter((s) => s.passageId === passage.id)
    .map((s) => s.activity);

  const handleStudentLogin = (
    _studentId: string,
    name: string,
    grade: number,
    account?: StudentAccount,
  ) => {
    if (account?.mustChangePassword) {
      setPendingStudentAccount(account);
      setPendingStudentName(name);
      setPasswordChangeSource("login");
      createStudent(name, grade);
      setScreen("change-password");
      return;
    }

    setLoggedInStudentAccount(account ?? null);

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

  const handlePasswordChanged = () => {
    if (passwordChangeSource === "dashboard") {
      setScreen("dashboard");
      return;
    }
    if (!pendingStudentAccount) return;
    const name = pendingStudentAccount.name;
    const savedProgress = findStudentProgress(name);
    if (savedProgress?.proficiencyDone) {
      restoreStudent(savedProgress);
      setScreen("dashboard");
      return;
    }
    setScreen("proficiency-test");
  };

  const handleChangePasswordFromDashboard = () => {
    if (loggedInStudentAccount) {
      setPendingStudentAccount(loggedInStudentAccount);
    }
    setPasswordChangeSource("dashboard");
    setScreen("change-password");
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
    const startDay = getStartDayForGrade(grade);
    completeWithProficiency(name, grade, score ?? 0, startDay);
    setScreen("dashboard");
  };

  const handleQuizComplete = (
    score: number,
    passed: boolean,
    quizAnswers: number[],
  ) => {
    addSession({
      passageId: passage.id,
      grade: dayInfo.grade,
      score,
      activity: "quiz",
      quizAnswers,
      passageTitle: passage.title,
      wordResults: recordingWordResults,
    });
    if (passed) {
      // nothing extra
    }
    advanceDay200();
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
      grade: dayInfo.grade,
      score: accuracyScore,
      activity: "record",
      passageTitle: passage.title,
      wordResults,
      insertions,
    });
    advanceDay200();
    setScreen("quiz");
  };

  const handleVocabLearnComplete = (sentences: Record<string, string>) => {
    saveVocabSentences(passage.id, sentences);
    addSession({
      passageId: passage.id,
      grade: dayInfo.grade,
      score: 100,
      activity: "vocab_learn",
      passageTitle: passage.title,
    });
    advanceDay200();
    setScreen("dashboard");
  };

  const handleVocabTestComplete = (
    score: number,
    _answers: { word: string; correct: boolean }[],
  ) => {
    addSession({
      passageId: passage.id,
      grade: dayInfo.grade,
      score,
      activity: "vocab_test",
      passageTitle: passage.title,
    });
    advanceDay200();
    setScreen("dashboard");
  };

  const handlePronunciationComplete = () => {
    addSession({
      passageId: passage.id,
      grade: dayInfo.grade,
      score: 100,
      activity: "pronunciation",
      passageTitle: passage.title,
    });
    advanceDay200();
    setScreen("dashboard");
  };

  const handleWeeklyVocabTestComplete = (score: number) => {
    addSession({
      passageId: passage.id,
      grade: dayInfo.grade,
      score,
      activity: "weekly_vocab_test",
      passageTitle: passage.title,
    });

    // Build weekly report
    const now = Date.now();
    const weekStart = student.dayStartDate ?? now - 7 * 24 * 60 * 60 * 1000;
    const readingSessions = student.sessions.filter(
      (s) => s.activity === "record" && s.timestamp >= weekStart,
    );
    const quizSessions = student.sessions.filter(
      (s) => s.activity === "quiz" && s.timestamp >= weekStart,
    );
    const vocabLearnCount = student.sessions.filter(
      (s) => s.activity === "vocab_learn" && s.timestamp >= weekStart,
    ).length;
    const avgQuiz =
      quizSessions.length > 0
        ? Math.round(
            quizSessions.reduce((a, s) => a + s.score, 0) / quizSessions.length,
          )
        : 0;
    const comprehensionLevel =
      avgQuiz >= 80 ? "Proficient" : avgQuiz >= 50 ? "Progressing" : "Beginner";
    const readingScoresList = readingSessions.map((s) => s.score);
    const prevReadingScores = student.sessions
      .filter((s) => s.activity === "record" && s.timestamp < weekStart)
      .map((s) => s.score);
    const prevAvg =
      prevReadingScores.length > 0
        ? prevReadingScores.reduce((a, b) => a + b, 0) /
          prevReadingScores.length
        : null;
    const currAvg =
      readingScoresList.length > 0
        ? readingScoresList.reduce((a, b) => a + b, 0) /
          readingScoresList.length
        : null;
    const improvementTrend =
      prevAvg === null || currAvg === null
        ? "Steady"
        : currAvg > prevAvg + 5
          ? "Improving"
          : currAvg < prevAvg - 5
            ? "Declining"
            : "Steady";

    const weekNumber = (student.weeklyReports?.length ?? 0) + 1;
    const report: WeeklyReportData = {
      weekNumber,
      startDate: new Date(weekStart).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
      endDate: new Date(now).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      passagesCompleted: Math.max(1, Math.floor(vocabLearnCount)),
      vocabWordsLearned: vocabLearnCount * 8,
      weeklyTestScore: score,
      readingScores: readingScoresList,
      comprehensionScores: quizSessions.map((s) => s.score),
      comprehensionLevel,
      improvementTrend,
    };
    addWeeklyReport(report);
    setScreen("dashboard");
  };

  const handleReset = () => {
    reset();
    setScreen("login");
  };

  const handleBackToHome = () => {
    setScreen("login");
  };

  const handleDashboardNavigate = (s: string) => {
    if (s === "change-password") {
      handleChangePasswordFromDashboard();
      return;
    }
    setScreen(s as Screen);
  };

  // Weekly vocab words = all vocab from current passage
  const currentVocabWords = getVocabByGrade(
    dayInfo.grade,
    dayInfo.passageIndex,
  );

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

  if (screen === "change-password" && pendingStudentAccount) {
    return (
      <>
        <ChangePassword
          studentId={pendingStudentAccount.studentId}
          studentName={pendingStudentAccount.name}
          onComplete={handlePasswordChanged}
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
        startGrade={student.grade || 1}
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

  if (screen === "pronunciation") {
    return (
      <PronunciationPractice
        passage={passage}
        onComplete={handlePronunciationComplete}
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  if (screen === "vocab_learn") {
    return (
      <VocabBuilder
        grade={dayInfo.grade}
        passageIndex={dayInfo.passageIndex}
        onComplete={handleVocabLearnComplete}
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  if (screen === "vocab_test") {
    return (
      <VocabPracticeTest
        grade={dayInfo.grade}
        passageIndex={dayInfo.passageIndex}
        onComplete={handleVocabTestComplete}
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  if (screen === "weekly_vocab_test") {
    return (
      <WeeklyVocabTest
        grade={dayInfo.grade}
        weekWords={currentVocabWords}
        onComplete={handleWeeklyVocabTestComplete}
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
      onNavigate={handleDashboardNavigate}
      onBackToHome={handleBackToHome}
      completedActivities={completedActivities}
      currentPassageTitle={passage.title}
      currentDay200={currentDay200}
    />
  );
}
