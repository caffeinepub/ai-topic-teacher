import { useState } from "react";

export interface WordResult {
  original: string;
  status: "correct" | "mispronounced" | "missed";
  heard?: string;
}

export interface Session {
  id: string;
  passageId: string;
  grade: number;
  score: number;
  activity:
    | "quiz"
    | "missing-words"
    | "record"
    | "pronunciation"
    | "intonation"
    | "vocab_learn"
    | "vocab_test"
    | "weekly_vocab_test";
  timestamp: number;
  quizAnswers?: number[];
  passageTitle?: string;
  wordResults?: WordResult[];
  insertions?: string[];
}

export interface GradeHistoryEntry {
  grade: number;
  timestamp: number;
  reason: string;
}

export interface WeeklyReportData {
  weekNumber: number;
  startDate: string;
  endDate: string;
  passagesCompleted: number;
  vocabWordsLearned: number;
  weeklyTestScore: number | null;
  readingScores: number[];
  comprehensionScores: number[];
  comprehensionLevel: string;
  improvementTrend: string;
}

export interface StudentData {
  name: string;
  grade: number;
  sessions: Session[];
  badges: string[];
  streak: number;
  lastActivity: number;
  passageOffsets: Record<number, number>;
  proficiencyDone: boolean;
  proficiencyScore: number;
  proficiencyGrade: number;
  gradeHistory: GradeHistoryEntry[];
  vocabSentences?: Record<string, Record<string, string>>;
  weeklyReports?: WeeklyReportData[];
  dayStartDate?: number;
  currentDay200?: number;
}

const STORAGE_KEY = "readwise_student";
export const ALL_STUDENTS_KEY = "classio_all_students";

const defaultStudent: StudentData = {
  name: "",
  grade: 1,
  sessions: [],
  badges: [],
  streak: 1,
  lastActivity: 0,
  passageOffsets: {},
  proficiencyDone: false,
  proficiencyScore: 0,
  proficiencyGrade: 0,
  gradeHistory: [],
  vocabSentences: {},
  weeklyReports: [],
  currentDay200: 1,
};

export function migrateStudentData(parsed: StudentData): StudentData {
  if (!parsed.passageOffsets) parsed.passageOffsets = {};
  if (parsed.proficiencyDone === undefined) parsed.proficiencyDone = true;
  if (parsed.proficiencyScore === undefined) parsed.proficiencyScore = 0;
  if (parsed.proficiencyGrade === undefined) parsed.proficiencyGrade = 0;
  if (!parsed.gradeHistory) parsed.gradeHistory = [];
  if (!parsed.sessions) parsed.sessions = [];
  if (!parsed.badges) parsed.badges = [];
  if (!parsed.vocabSentences) parsed.vocabSentences = {};
  if (!parsed.weeklyReports) parsed.weeklyReports = [];
  if (!parsed.currentDay200) parsed.currentDay200 = 1;
  return parsed;
}

export function findStudentProgress(name: string): StudentData | null {
  try {
    const raw = localStorage.getItem(ALL_STUDENTS_KEY);
    if (!raw) return null;
    const all: StudentData[] = JSON.parse(raw);
    const found = all.find((s) => s.name === name);
    if (!found) return null;
    return migrateStudentData({ ...found });
  } catch {
    return null;
  }
}

function upsertAllStudents(data: StudentData) {
  try {
    const raw = localStorage.getItem(ALL_STUDENTS_KEY);
    const all: StudentData[] = raw ? JSON.parse(raw) : [];
    const idx = all.findIndex((s) => s.name === data.name);
    if (idx >= 0) all[idx] = data;
    else all.push(data);
    localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(all));
  } catch {
    // ignore storage errors
  }
}

export function useStudentStore() {
  const [student, setStudentState] = useState<StudentData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return migrateStudentData(parsed);
      }
      return defaultStudent;
    } catch {
      return defaultStudent;
    }
  });

  const save = (data: StudentData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setStudentState(data);
    if (data.name) upsertAllStudents(data);
  };

  const restoreStudent = (savedData: StudentData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
    setStudentState(savedData);
  };

  const createStudent = (name: string, grade: number) => {
    save({
      ...defaultStudent,
      name,
      grade,
      lastActivity: Date.now(),
      proficiencyDone: false,
    });
  };

  const completeWithProficiency = (
    name: string,
    grade: number,
    score: number,
    startDay200?: number,
  ) => {
    const entry: GradeHistoryEntry = {
      grade,
      timestamp: Date.now(),
      reason: "Proficiency Test",
    };
    save({
      ...defaultStudent,
      name,
      grade,
      lastActivity: Date.now(),
      proficiencyDone: true,
      proficiencyScore: score,
      proficiencyGrade: grade,
      gradeHistory: [entry],
      dayStartDate: Date.now(),
      currentDay200: startDay200 ?? 1,
    });
  };

  const advancePassage = (grade: number) => {
    const current = student.passageOffsets[grade] ?? 0;
    save({
      ...student,
      passageOffsets: {
        ...student.passageOffsets,
        [grade]: current + 1,
      },
    });
  };

  const advanceDay200 = () => {
    const current = student.currentDay200 ?? 1;
    const next = Math.min(200, current + 1);
    save({ ...student, currentDay200: next });
  };

  const setDay200 = (day: number) => {
    save({ ...student, currentDay200: Math.max(1, Math.min(200, day)) });
  };

  const addSession = (session: Omit<Session, "id" | "timestamp">) => {
    const newSession: Session = {
      ...session,
      id: Math.random().toString(36).slice(2),
      timestamp: Date.now(),
    };
    const updated: StudentData = {
      ...student,
      sessions: [...student.sessions, newSession],
      lastActivity: Date.now(),
    };

    const badges = new Set(updated.badges);
    const quizCount = updated.sessions.filter(
      (s) => s.activity === "quiz",
    ).length;
    const recordCount = updated.sessions.filter(
      (s) => s.activity === "record",
    ).length;
    const missingCount = updated.sessions.filter(
      (s) => s.activity === "missing-words",
    ).length;
    const pronCount = updated.sessions.filter(
      (s) => s.activity === "pronunciation",
    ).length;
    if (quizCount >= 3) badges.add("Quiz Champion");
    if (recordCount >= 2) badges.add("Recording Star");
    if (missingCount >= 2) badges.add("Word Wizard");
    if (pronCount >= 2) badges.add("Pronunciation Pro");
    if (updated.sessions.length >= 5) badges.add("Chunk Master");
    updated.badges = Array.from(badges);

    save(updated);
    return updated.grade;
  };

  const saveVocabSentences = (
    passageId: string,
    sentences: Record<string, string>,
  ) => {
    save({
      ...student,
      vocabSentences: {
        ...(student.vocabSentences ?? {}),
        [passageId]: sentences,
      },
    });
  };

  const addWeeklyReport = (report: WeeklyReportData) => {
    save({
      ...student,
      weeklyReports: [...(student.weeklyReports ?? []), report],
    });
  };

  const updateGrade = (grade: number) => {
    save({ ...student, grade });
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setStudentState(defaultStudent);
  };

  const averageScore = () => {
    const quizSessions = student.sessions.filter((s) => s.activity === "quiz");
    if (quizSessions.length === 0) return 0;
    return Math.round(
      quizSessions.reduce((a, s) => a + s.score, 0) / quizSessions.length,
    );
  };

  return {
    student,
    createStudent,
    restoreStudent,
    completeWithProficiency,
    addSession,
    advancePassage,
    advanceDay200,
    setDay200,
    updateGrade,
    reset,
    averageScore,
    saveVocabSentences,
    addWeeklyReport,
  };
}

export function useAllStudentsStore() {
  const [students, setStudents] = useState<StudentData[]>(() => {
    try {
      const raw = localStorage.getItem(ALL_STUDENTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const deleteStudent = (name: string) => {
    const updated = students.filter((s) => s.name !== name);
    localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(updated));
    setStudents(updated);
  };

  return { students, deleteStudent };
}
