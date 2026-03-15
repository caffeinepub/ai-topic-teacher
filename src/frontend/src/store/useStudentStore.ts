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
};

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
        if (!parsed.passageOffsets) parsed.passageOffsets = {};
        if (parsed.proficiencyDone === undefined) parsed.proficiencyDone = true;
        return parsed;
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

  const createStudent = (name: string, grade: number) => {
    save({
      ...defaultStudent,
      name,
      grade,
      lastActivity: Date.now(),
      proficiencyDone: true,
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
    const updated = {
      ...student,
      sessions: [...student.sessions, newSession],
      lastActivity: Date.now(),
    };

    if (session.activity === "quiz") {
      if (session.score >= 80 && updated.grade < 5)
        updated.grade = updated.grade + 1;
      else if (session.score < 50 && updated.grade > 1)
        updated.grade = updated.grade - 1;
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
