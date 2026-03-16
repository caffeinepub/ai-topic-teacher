import AppHeader from "@/components/AppHeader";
import ProgressReport from "@/components/ProgressReport";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TeacherAccount } from "@/store/useAuthStore";
import { useAuthStore } from "@/store/useAuthStore";
import type { StudentData } from "@/store/useStudentStore";
import { useAllStudentsStore } from "@/store/useStudentStore";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

function formatDate(ts: number) {
  if (!ts) return "Never";
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function avgScore(student: StudentData) {
  const quizSessions = student.sessions.filter((s) => s.activity === "quiz");
  if (quizSessions.length === 0) return 0;
  return Math.round(
    quizSessions.reduce((a, s) => a + s.score, 0) / quizSessions.length,
  );
}

function getComprehensionLevel(student: StudentData | undefined): {
  label: string;
  color: string;
  bg: string;
  icon: string;
} | null {
  if (!student) return null;
  const quizSessions = student.sessions.filter((s) => s.activity === "quiz");
  if (quizSessions.length === 0) return null;
  const avg = Math.round(
    quizSessions.reduce((a, s) => a + s.score, 0) / quizSessions.length,
  );
  if (avg >= 80)
    return {
      label: "Proficient",
      color: "text-green-700",
      bg: "bg-green-100",
      icon: "🌟",
    };
  if (avg >= 50)
    return {
      label: "Progressing",
      color: "text-amber-700",
      bg: "bg-amber-100",
      icon: "📈",
    };
  return {
    label: "Beginner",
    color: "text-red-700",
    bg: "bg-red-100",
    icon: "🌱",
  };
}

function generatePassword(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  return Array.from(
    { length: 8 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

interface Props {
  teacher: TeacherAccount;
  onBack: () => void;
}

export default function TeacherDashboard({ teacher, onBack }: Props) {
  const { addStudent, removeStudent, getStudentsByTeacher } = useAuthStore();
  const { students: progressStudents } = useAllStudentsStore();

  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [createdStudent, setCreatedStudent] = useState<{
    studentId: string;
    name: string;
    password: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(
    new Set(),
  );

  const [form, setForm] = useState({ name: "", contactNumber: "", grade: "1" });
  const [formError, setFormError] = useState("");

  const myStudents = getStudentsByTeacher(teacher.id);

  const handleAdd = () => {
    setFormError("");
    if (!form.name.trim() || !form.contactNumber.trim()) {
      setFormError("Name and contact number are required.");
      return;
    }
    const password = generatePassword();
    const student = addStudent({
      name: form.name.trim(),
      contactNumber: form.contactNumber.trim(),
      password,
      teacherId: teacher.id,
      grade: Number.parseInt(form.grade, 10),
    });
    setCreatedStudent({
      studentId: student.studentId,
      name: student.name,
      password,
    });
    setForm({ name: "", contactNumber: "", grade: "1" });
  };

  const handleCopy = () => {
    if (!createdStudent) return;
    const text = `Student ID: ${createdStudent.studentId}\nName: ${createdStudent.name}\nPassword: ${createdStudent.password}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = (studentId: string) => {
    removeStudent(studentId);
    setDeleteConfirm(null);
    if (expandedStudent === studentId) setExpandedStudent(null);
  };

  const togglePasswordVisibility = (studentId: string) => {
    setVisiblePasswords((prev) => {
      const next = new Set(prev);
      if (next.has(studentId)) {
        next.delete(studentId);
      } else {
        next.add(studentId);
      }
      return next;
    });
  };

  const getProgressData = (studentName: string) =>
    progressStudents.find((s) => s.name === studentName);

  const mostActive =
    myStudents.length > 0
      ? myStudents.reduce((a, b) => {
          const aP = getProgressData(a.name);
          const bP = getProgressData(b.name);
          return (bP?.sessions.length ?? 0) > (aP?.sessions.length ?? 0)
            ? b
            : a;
        }).name
      : "—";

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />

      {/* Header */}
      <div className="bg-blue-600 text-white px-4 pt-5 pb-6">
        <button
          type="button"
          data-ocid="teacher.back.button"
          onClick={onBack}
          className="text-white/80 text-sm mb-3 hover:text-white transition-colors"
        >
          ← Back to Home
        </button>
        <h2 className="text-2xl font-bold">🏫 Teacher Dashboard</h2>
        <p className="text-white/80 text-sm mt-0.5">
          {teacher.name} · {teacher.schoolName}
        </p>
        <p className="text-white/60 text-xs mt-1">
          {myStudents.length} student{myStudents.length !== 1 ? "s" : ""}{" "}
          enrolled
        </p>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Summary Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-3xl font-bold text-blue-600">
              {myStudents.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Total Students</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-sm font-bold text-amber-600 truncate">
              {mostActive}
            </p>
            <p className="text-xs text-gray-500 mt-1">Most Active</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-sm font-bold text-purple-600">{teacher.id}</p>
            <p className="text-xs text-gray-500 mt-1">Your ID</p>
          </div>
        </div>

        {/* Created Student Success Card */}
        {createdStudent && (
          <div
            data-ocid="teacher.student.success_state"
            className="bg-green-50 border-2 border-green-400 rounded-2xl p-5 space-y-3"
          >
            <div className="flex items-center gap-2 text-green-700">
              <Check size={20} />
              <p className="font-bold text-lg">Student Created Successfully!</p>
            </div>
            <div className="bg-white rounded-xl p-4 font-mono text-sm space-y-1 border border-green-200">
              <p>
                <span className="text-gray-500">Student ID:</span>{" "}
                <span className="font-bold text-blue-700 text-base">
                  {createdStudent.studentId}
                </span>
              </p>
              <p>
                <span className="text-gray-500">Name:</span>{" "}
                {createdStudent.name}
              </p>
              <p>
                <span className="text-gray-500">Password:</span>{" "}
                <span className="font-bold text-orange-600">
                  {createdStudent.password}
                </span>
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                data-ocid="teacher.student.copy.button"
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-xl border-green-300 text-green-700 hover:bg-green-100"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy Credentials"}
              </Button>
              <Button
                data-ocid="teacher.student.success.close_button"
                size="sm"
                variant="ghost"
                onClick={() => setCreatedStudent(null)}
                className="rounded-xl text-gray-500"
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}

        {/* Add Student Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <UserPlus size={20} className="text-blue-600" />
            <h3 className="font-bold text-gray-800 text-lg">Add New Student</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="stu-name">Student Name *</Label>
              <Input
                id="stu-name"
                data-ocid="teacher.student.name.input"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border-gray-200"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="stu-contact">Contact Number *</Label>
              <Input
                id="stu-contact"
                data-ocid="teacher.student.contact.input"
                placeholder="Mobile number"
                value={form.contactNumber}
                onChange={(e) =>
                  setForm({ ...form, contactNumber: e.target.value })
                }
                className="rounded-xl border-gray-200"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="stu-grade">Grade</Label>
              <Select
                value={form.grade}
                onValueChange={(v) => setForm({ ...form, grade: v })}
              >
                <SelectTrigger
                  data-ocid="teacher.student.grade.select"
                  id="stu-grade"
                  className="rounded-xl border-gray-200"
                >
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((g) => (
                    <SelectItem key={g} value={String(g)}>
                      Grade {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {formError && (
            <p
              data-ocid="teacher.student.form.error_state"
              className="text-red-500 text-sm"
            >
              {formError}
            </p>
          )}

          <Button
            data-ocid="teacher.student.add.primary_button"
            onClick={handleAdd}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white h-11"
          >
            Create Student Account
          </Button>
        </div>

        {/* Students List */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-700 text-base px-1">
            Your Students
          </h3>

          {myStudents.length === 0 ? (
            <div
              data-ocid="teacher.students.empty_state"
              className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100"
            >
              <div className="text-5xl mb-3">👩‍🎓</div>
              <p className="text-gray-500 font-medium">No students yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Add students above to get started.
              </p>
            </div>
          ) : (
            myStudents.map((stu, idx) => {
              const progress = getProgressData(stu.name);
              const isPasswordVisible = visiblePasswords.has(stu.studentId);
              const comprehensionLevel = getComprehensionLevel(progress);
              return (
                <div
                  key={stu.studentId}
                  data-ocid={`teacher.students.item.${idx + 1}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div
                    className="flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-blue-50 transition-colors"
                    onClick={() =>
                      setExpandedStudent(
                        expandedStudent === stu.studentId
                          ? null
                          : stu.studentId,
                      )
                    }
                    // biome-ignore lint/a11y/useSemanticElements: div for layout
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      setExpandedStudent(
                        expandedStudent === stu.studentId
                          ? null
                          : stu.studentId,
                      )
                    }
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg flex-shrink-0">
                      {stu.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-gray-800 truncate">
                          {stu.name}
                        </p>
                        <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">
                          {stu.studentId}
                        </Badge>
                        <Badge className="bg-gray-100 text-gray-600 border-0 text-xs">
                          Grade {stu.grade}
                        </Badge>
                        {/* Comprehension Level Badge */}
                        {comprehensionLevel ? (
                          <span
                            data-ocid={`teacher.comprehension_level_badge.${idx + 1}`}
                            className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${comprehensionLevel.bg} ${comprehensionLevel.color}`}
                            title="Comprehension Level based on quiz scores"
                          >
                            {comprehensionLevel.icon} {comprehensionLevel.label}
                          </span>
                        ) : (
                          <span
                            data-ocid={`teacher.comprehension_level_badge.${idx + 1}`}
                            className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"
                            title="No quiz data yet"
                          >
                            ⬜ Not assessed
                          </span>
                        )}
                        {/* Weekly Vocab Badge */}
                        {(() => {
                          const weeklyVocabSessions =
                            progress?.sessions.filter(
                              (s) => s.activity === "weekly_vocab_test",
                            ) ?? [];
                          const latestWeeklyScore =
                            weeklyVocabSessions.length > 0
                              ? weeklyVocabSessions[
                                  weeklyVocabSessions.length - 1
                                ].score
                              : null;
                          return latestWeeklyScore !== null ? (
                            <span
                              data-ocid={`teacher.weekly_vocab_badge.${idx + 1}`}
                              className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700"
                              title="Latest Weekly Vocab Test Score"
                            >
                              📚 Vocab: {latestWeeklyScore}%
                            </span>
                          ) : (
                            <span
                              data-ocid={`teacher.weekly_vocab_badge.${idx + 1}`}
                              className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"
                              title="No weekly vocab test taken yet"
                            >
                              📚 Vocab: —
                            </span>
                          );
                        })()}
                        {stu.mustChangePassword ? (
                          <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">
                            🔑 System Password
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                            ✅ Password Set
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <p className="text-xs text-gray-400">
                          📱 {stu.contactNumber}
                          {progress
                            ? ` · ${progress.sessions.length} sessions · Avg ${avgScore(progress)}% · Last: ${formatDate(progress.lastActivity)}`
                            : " · No activity yet"}
                        </p>
                      </div>
                      {/* Password row */}
                      <div
                        className="flex items-center gap-1.5 mt-1"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        role="presentation"
                      >
                        <span className="text-xs text-gray-400">Password:</span>
                        <span className="text-xs font-mono text-gray-700">
                          {isPasswordVisible
                            ? stu.password
                            : "•".repeat(stu.password.length)}
                        </span>
                        <button
                          type="button"
                          data-ocid={`teacher.students.password_toggle.${idx + 1}`}
                          onClick={() =>
                            togglePasswordVisibility(stu.studentId)
                          }
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          title={
                            isPasswordVisible
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {isPasswordVisible ? (
                            <EyeOff size={12} />
                          ) : (
                            <Eye size={12} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        data-ocid={`teacher.students.delete_button.${idx + 1}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirm(stu.studentId);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                      {expandedStudent === stu.studentId ? (
                        <ChevronDown size={18} className="text-gray-400" />
                      ) : (
                        <ChevronRight size={18} className="text-gray-400" />
                      )}
                    </div>
                  </div>

                  {expandedStudent === stu.studentId && progress && (
                    <div className="border-t border-gray-100">
                      {/* Comprehension level card in expanded view */}
                      <div
                        data-ocid="student.comprehension_level_card"
                        className="mx-4 mt-4 mb-2"
                      >
                        {comprehensionLevel ? (
                          <div
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${comprehensionLevel.bg} border-opacity-50`}
                          >
                            <span className="text-2xl">
                              {comprehensionLevel.icon}
                            </span>
                            <div>
                              <p
                                className={`font-bold text-sm ${comprehensionLevel.color}`}
                              >
                                Comprehension Level: {comprehensionLevel.label}
                              </p>
                              <p className="text-xs text-gray-500">
                                Based on avg quiz score: {avgScore(progress)}%
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-gray-50 border-gray-200">
                            <span className="text-2xl">⬜</span>
                            <div>
                              <p className="font-bold text-sm text-gray-500">
                                Comprehension Level: Not assessed
                              </p>
                              <p className="text-xs text-gray-400">
                                Student has not completed any quizzes yet.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <ProgressReport
                        student={progress}
                        averageScore={avgScore(progress)}
                        onBack={() => setExpandedStudent(null)}
                        onReset={() => {}}
                      />
                    </div>
                  )}
                  {expandedStudent === stu.studentId && !progress && (
                    <div className="border-t border-gray-100 px-4 py-6 text-center text-gray-400 text-sm">
                      No learning activity yet for this student.
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div
          data-ocid="teacher.delete.dialog"
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              Remove Student?
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Remove this student? Their login credentials will be deleted. This
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                data-ocid="teacher.delete.cancel_button"
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                data-ocid="teacher.delete.confirm_button"
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 text-white"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
