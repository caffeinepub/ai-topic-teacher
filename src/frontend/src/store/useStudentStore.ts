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
    | "intonation";
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
};

export function migrateStudentData(parsed: StudentData): StudentData {
  if (!parsed.passageOffsets) parsed.passageOffsets = {};
  if (parsed.proficiencyDone === undefined) parsed.proficiencyDone = true;
  if (parsed.proficiencyScore === undefined) parsed.proficiencyScore = 0;
  if (parsed.proficiencyGrade === undefined) parsed.proficiencyGrade = 0;
  if (!parsed.gradeHistory) parsed.gradeHistory = [];
  if (!parsed.sessions) parsed.sessions = [];
  if (!parsed.badges) parsed.badges = [];
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

    if (session.activity === "quiz") {
      const prevGrade = updated.grade;
      if (session.score >= 80 && updated.grade < 5) {
        updated.grade = updated.grade + 1;
      } else if (session.score < 50 && updated.grade > 1) {
        updated.grade = updated.grade - 1;
      }
      if (updated.grade !== prevGrade) {
        const entry: GradeHistoryEntry = {
          grade: updated.grade,
          timestamp: Date.now(),
          reason: "Quiz Performance",
        };
        updated.gradeHistory = [...(student.gradeHistory ?? []), entry];
      }
    }

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
    updateGrade,
    reset,
    averageScore,
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
