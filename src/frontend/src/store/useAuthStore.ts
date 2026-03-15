import { useState } from "react";

export interface TeacherAccount {
  id: string;
  name: string;
  schoolName: string;
  phone: string;
  email: string;
  password: string;
  createdAt: number;
}

export interface StudentAccount {
  studentId: string;
  name: string;
  contactNumber: string;
  password: string;
  teacherId: string;
  grade: number;
  createdAt: number;
}

const TEACHERS_KEY = "classio_teachers";
const STUDENTS_KEY = "classio_student_accounts";

function loadTeachers(): TeacherAccount[] {
  try {
    const raw = localStorage.getItem(TEACHERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadStudents(): StudentAccount[] {
  try {
    const raw = localStorage.getItem(STUDENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTeachers(list: TeacherAccount[]) {
  localStorage.setItem(TEACHERS_KEY, JSON.stringify(list));
}

function saveStudents(list: StudentAccount[]) {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(list));
}

export function generateTeacherId(existingTeachers: TeacherAccount[]): string {
  const max = existingTeachers.reduce((acc, t) => {
    const num = Number.parseInt(t.id.replace("TCH", ""), 10);
    return num > acc ? num : acc;
  }, 0);
  return `TCH${String(max + 1).padStart(3, "0")}`;
}

export function generateStudentId(existingStudents: StudentAccount[]): string {
  const max = existingStudents.reduce((acc, s) => {
    const num = Number.parseInt(s.studentId.replace("STU", ""), 10);
    return num > acc ? num : acc;
  }, 0);
  return `STU${String(max + 1).padStart(3, "0")}`;
}

export function useAuthStore() {
  const [teachers, setTeachers] = useState<TeacherAccount[]>(loadTeachers);
  const [students, setStudents] = useState<StudentAccount[]>(loadStudents);

  const addTeacher = (data: Omit<TeacherAccount, "id" | "createdAt">) => {
    const all = loadTeachers();
    const newTeacher: TeacherAccount = {
      ...data,
      id: generateTeacherId(all),
      createdAt: Date.now(),
    };
    const updated = [...all, newTeacher];
    saveTeachers(updated);
    setTeachers(updated);
    return newTeacher;
  };

  const removeTeacher = (id: string) => {
    const updated = teachers.filter((t) => t.id !== id);
    saveTeachers(updated);
    setTeachers(updated);
    // Also remove their students
    const updatedStudents = students.filter((s) => s.teacherId !== id);
    saveStudents(updatedStudents);
    setStudents(updatedStudents);
  };

  const addStudent = (
    data: Omit<StudentAccount, "studentId" | "createdAt">,
  ) => {
    const all = loadStudents();
    const newStudent: StudentAccount = {
      ...data,
      studentId: generateStudentId(all),
      createdAt: Date.now(),
    };
    const updated = [...all, newStudent];
    saveStudents(updated);
    setStudents(updated);
    return newStudent;
  };

  const removeStudent = (studentId: string) => {
    const updated = students.filter((s) => s.studentId !== studentId);
    saveStudents(updated);
    setStudents(updated);
  };

  const getStudentsByTeacher = (teacherId: string) =>
    students.filter((s) => s.teacherId === teacherId);

  const verifyStudent = (
    studentId: string,
    contactNumber: string,
    password: string,
  ): StudentAccount | null => {
    const all = loadStudents();
    return (
      all.find(
        (s) =>
          s.studentId === studentId &&
          s.contactNumber === contactNumber &&
          s.password === password,
      ) ?? null
    );
  };

  const verifyTeacher = (
    teacherId: string,
    password: string,
  ): TeacherAccount | null => {
    const all = loadTeachers();
    return (
      all.find((t) => t.id === teacherId && t.password === password) ?? null
    );
  };

  return {
    teachers,
    students,
    addTeacher,
    removeTeacher,
    addStudent,
    removeStudent,
    getStudentsByTeacher,
    generateStudentId: () => generateStudentId(loadStudents()),
    generateTeacherId: () => generateTeacherId(loadTeachers()),
    verifyStudent,
    verifyTeacher,
  };
}
