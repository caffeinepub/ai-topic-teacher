import AppHeader from "@/components/AppHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";
import type { TeacherAccount } from "@/store/useAuthStore";
import { Check, Copy, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";

interface Props {
  onBack: () => void;
}

export default function SuperAdminDashboard({ onBack }: Props) {
  const { teachers, addTeacher, removeTeacher } = useAuthStore();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [createdTeacher, setCreatedTeacher] = useState<TeacherAccount | null>(
    null,
  );
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    name: "",
    schoolName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const handleAdd = () => {
    setFormError("");
    if (
      !form.name.trim() ||
      !form.schoolName.trim() ||
      !form.phone.trim() ||
      !form.password.trim()
    ) {
      setFormError("Name, school name, phone, and password are required.");
      return;
    }
    const teacher = addTeacher(form);
    setCreatedTeacher(teacher);
    setForm({ name: "", schoolName: "", phone: "", email: "", password: "" });
  };

  const handleCopy = () => {
    if (!createdTeacher) return;
    const text = `Teacher ID: ${createdTeacher.id}\nName: ${createdTeacher.name}\nSchool: ${createdTeacher.schoolName}\nPassword: ${createdTeacher.password}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = (id: string) => {
    removeTeacher(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />

      {/* Header */}
      <div className="bg-purple-600 text-white px-4 pt-5 pb-6">
        <button
          type="button"
          data-ocid="admin.back.button"
          onClick={onBack}
          className="text-white/80 text-sm mb-3 hover:text-white transition-colors"
        >
          ← Back to Home
        </button>
        <h2 className="text-2xl font-bold">🔐 Super Admin Dashboard</h2>
        <p className="text-white/70 text-sm mt-1">
          {teachers.length} teacher{teachers.length !== 1 ? "s" : ""} registered
        </p>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Created Teacher Success Card */}
        {createdTeacher && (
          <div
            data-ocid="admin.teacher.success_state"
            className="bg-green-50 border-2 border-green-400 rounded-2xl p-5 space-y-3"
          >
            <div className="flex items-center gap-2 text-green-700">
              <Check size={20} />
              <p className="font-bold text-lg">Teacher Created Successfully!</p>
            </div>
            <div className="bg-white rounded-xl p-4 font-mono text-sm space-y-1 border border-green-200">
              <p>
                <span className="text-gray-500">Teacher ID:</span>{" "}
                <span className="font-bold text-purple-700 text-base">
                  {createdTeacher.id}
                </span>
              </p>
              <p>
                <span className="text-gray-500">Name:</span>{" "}
                {createdTeacher.name}
              </p>
              <p>
                <span className="text-gray-500">School:</span>{" "}
                {createdTeacher.schoolName}
              </p>
              <p>
                <span className="text-gray-500">Password:</span>{" "}
                {createdTeacher.password}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                data-ocid="admin.teacher.copy.button"
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-xl border-green-300 text-green-700 hover:bg-green-100"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy Credentials"}
              </Button>
              <Button
                data-ocid="admin.teacher.success.close_button"
                size="sm"
                variant="ghost"
                onClick={() => setCreatedTeacher(null)}
                className="rounded-xl text-gray-500"
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}

        {/* Add Teacher Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <UserPlus size={20} className="text-purple-600" />
            <h3 className="font-bold text-gray-800 text-lg">Add New Teacher</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="tch-name">Teacher Name *</Label>
              <Input
                id="tch-name"
                data-ocid="admin.teacher.name.input"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border-gray-200"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tch-school">School Name *</Label>
              <Input
                id="tch-school"
                data-ocid="admin.teacher.school.input"
                placeholder="School name"
                value={form.schoolName}
                onChange={(e) =>
                  setForm({ ...form, schoolName: e.target.value })
                }
                className="rounded-xl border-gray-200"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tch-phone">Phone *</Label>
              <Input
                id="tch-phone"
                data-ocid="admin.teacher.phone.input"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-xl border-gray-200"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tch-email">Email</Label>
              <Input
                id="tch-email"
                data-ocid="admin.teacher.email.input"
                type="email"
                placeholder="Email (optional)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl border-gray-200"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="tch-pass">Password *</Label>
              <Input
                id="tch-pass"
                data-ocid="admin.teacher.password.input"
                placeholder="Set a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="rounded-xl border-gray-200"
              />
            </div>
          </div>

          {formError && (
            <p
              data-ocid="admin.teacher.form.error_state"
              className="text-red-500 text-sm"
            >
              {formError}
            </p>
          )}

          <Button
            data-ocid="admin.teacher.add.primary_button"
            onClick={handleAdd}
            className="w-full rounded-xl bg-purple-600 hover:bg-purple-700 text-white h-11"
          >
            Create Teacher Account
          </Button>
        </div>

        {/* Teachers List */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-700 text-base px-1">
            All Teachers
          </h3>

          {teachers.length === 0 ? (
            <div
              data-ocid="admin.teachers.empty_state"
              className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100"
            >
              <div className="text-5xl mb-3">👩‍🏫</div>
              <p className="text-gray-500 font-medium">No teachers yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Add a teacher above to get started.
              </p>
            </div>
          ) : (
            teachers.map((teacher, idx) => (
              <div
                key={teacher.id}
                data-ocid={`admin.teachers.item.${idx + 1}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-lg flex-shrink-0">
                  {teacher.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800 truncate">
                      {teacher.name}
                    </p>
                    <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">
                      {teacher.id}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 truncate">
                    {teacher.schoolName} · {teacher.phone}
                  </p>
                </div>
                <button
                  type="button"
                  data-ocid={`admin.teachers.delete_button.${idx + 1}`}
                  onClick={() => setDeleteConfirm(teacher.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div
          data-ocid="admin.delete.dialog"
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              Remove Teacher?
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              This will also remove all students created by this teacher. This
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                data-ocid="admin.delete.cancel_button"
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                data-ocid="admin.delete.confirm_button"
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
