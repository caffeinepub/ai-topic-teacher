import AppHeader from "@/components/AppHeader";
import ProgressReport from "@/components/ProgressReport";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAllStudentsStore } from "@/store/useStudentStore";
import type { StudentData } from "@/store/useStudentStore";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";
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

interface Props {
  onBack: () => void;
}

export default function TeacherDashboard({ onBack }: Props) {
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { students, deleteStudent } = useAllStudentsStore();

  const handleDelete = (name: string) => {
    deleteStudent(name);
    setDeleteConfirm(null);
    if (expandedStudent === name) setExpandedStudent(null);
  };

  // Summary stats
  const mostActive =
    students.length > 0
      ? students.reduce((a, b) =>
          b.sessions.length > a.sessions.length ? b : a,
        ).name
      : "—";
  const highestAvg =
    students.length > 0
      ? students.reduce((a, b) => (avgScore(b) > avgScore(a) ? b : a)).name
      : "—";

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />

      {/* Header */}
      <div className="bg-amber-500 text-white px-4 pt-5 pb-6">
        <button
          type="button"
          data-ocid="teacher.back.button"
          onClick={onBack}
          className="text-white/80 text-sm mb-3"
        >
          ← Back to Home
        </button>
        <h2 className="text-2xl font-bold">🏫 Teacher Dashboard</h2>
        <p className="text-white/70 text-sm mt-1">
          {students.length} student{students.length !== 1 ? "s" : ""} enrolled
        </p>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Summary Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-3xl font-bold text-amber-500">
              {students.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Total Students</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-sm font-bold text-blue-600 truncate">
              {mostActive}
            </p>
            <p className="text-xs text-gray-500 mt-1">Most Active</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-sm font-bold text-green-600 truncate">
              {highestAvg}
            </p>
            <p className="text-xs text-gray-500 mt-1">Top Scorer</p>
          </div>
        </div>

        {/* Student List */}
        {students.length === 0 ? (
          <div
            data-ocid="teacher.students.empty_state"
            className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100"
          >
            <div className="text-5xl mb-3">👩‍🎓</div>
            <p className="text-gray-500 font-medium">No students yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Students will appear here after they complete registration.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {students.map((st, idx) => (
              <div
                key={st.name}
                data-ocid={`teacher.students.item.${idx + 1}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Row header */}
                <div
                  className="flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-amber-50 transition-colors"
                  onClick={() =>
                    setExpandedStudent(
                      expandedStudent === st.name ? null : st.name,
                    )
                  }
                  // biome-ignore lint/a11y/useSemanticElements: div for layout
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    setExpandedStudent(
                      expandedStudent === st.name ? null : st.name,
                    )
                  }
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-lg flex-shrink-0">
                    {st.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-800 truncate">
                        {st.name}
                      </p>
                      <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">
                        Grade {st.grade}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {st.sessions.length} sessions · Avg {avgScore(st)}% ·
                      Last: {formatDate(st.lastActivity)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      data-ocid={`teacher.students.delete_button.${idx + 1}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirm(st.name);
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    {expandedStudent === st.name ? (
                      <ChevronDown size={18} className="text-gray-400" />
                    ) : (
                      <ChevronRight size={18} className="text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded report */}
                {expandedStudent === st.name && (
                  <div className="border-t border-gray-100">
                    <ProgressReport
                      student={st}
                      averageScore={avgScore(st)}
                      onBack={() => setExpandedStudent(null)}
                      onReset={() => {}}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div
          data-ocid="teacher.delete.dialog"
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              Delete Student?
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Remove{" "}
              <span className="font-semibold text-gray-700">
                {deleteConfirm}
              </span>
              's data? This cannot be undone.
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
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
