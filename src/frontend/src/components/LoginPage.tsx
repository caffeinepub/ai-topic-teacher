import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";
import type { TeacherAccount } from "@/store/useAuthStore";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const SUPER_ADMIN_USER = "Classio123";
const SUPER_ADMIN_PASS = "Classio@123";

interface Props {
  onStudentLogin: (studentId: string, name: string, grade: number) => void;
  onTeacherLogin: (teacher: TeacherAccount) => void;
  onSuperAdminLogin: () => void;
}

export default function LoginPage({
  onStudentLogin,
  onTeacherLogin,
  onSuperAdminLogin,
}: Props) {
  const { verifyStudent, verifyTeacher } = useAuthStore();
  const [selected, setSelected] = useState<
    "student" | "teacher" | "admin" | null
  >(null);

  // Student form
  const [stuId, setStuId] = useState("");
  const [stuContact, setStuContact] = useState("");
  const [stuPass, setStuPass] = useState("");
  const [stuError, setStuError] = useState("");

  // Teacher form
  const [tchId, setTchId] = useState("");
  const [tchPass, setTchPass] = useState("");
  const [tchError, setTchError] = useState("");

  // Admin form
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");

  const handleStudentSubmit = () => {
    setStuError("");
    if (!stuId.trim() || !stuContact.trim() || !stuPass.trim()) {
      setStuError("All fields are required.");
      return;
    }
    const account = verifyStudent(stuId.trim(), stuContact.trim(), stuPass);
    if (!account) {
      setStuError("Invalid Student ID, contact number, or password.");
      return;
    }
    onStudentLogin(account.studentId, account.name, account.grade);
  };

  const handleTeacherSubmit = () => {
    setTchError("");
    const teacher = verifyTeacher(tchId.trim(), tchPass);
    if (!teacher) {
      setTchError("Invalid Teacher ID or password.");
      return;
    }
    onTeacherLogin(teacher);
  };

  const handleAdminSubmit = () => {
    setAdminError("");
    if (adminUser === SUPER_ADMIN_USER && adminPass === SUPER_ADMIN_PASS) {
      onSuperAdminLogin();
    } else {
      setAdminError("Invalid username or password.");
    }
  };

  const roles = [
    {
      key: "student" as const,
      emoji: "🎒",
      label: "Student",
      sub: "Start learning!",
      color: "amber",
    },
    {
      key: "teacher" as const,
      emoji: "🏫",
      label: "Teacher",
      sub: "Manage students",
      color: "blue",
    },
    {
      key: "admin" as const,
      emoji: "🔐",
      label: "Super Admin",
      sub: "Manage system",
      color: "purple",
    },
  ];

  const colorMap = {
    amber: {
      active: "bg-amber-500 border-amber-600 text-white shadow-amber-200",
      inactive:
        "bg-white border-amber-200 text-amber-800 hover:border-amber-400",
      sub_active: "text-amber-100",
      sub_inactive: "text-amber-500",
    },
    blue: {
      active: "bg-blue-600 border-blue-700 text-white shadow-blue-200",
      inactive: "bg-white border-blue-200 text-blue-800 hover:border-blue-400",
      sub_active: "text-blue-100",
      sub_inactive: "text-blue-500",
    },
    purple: {
      active: "bg-purple-600 border-purple-700 text-white shadow-purple-200",
      inactive:
        "bg-white border-purple-200 text-purple-800 hover:border-purple-400",
      sub_active: "text-purple-100",
      sub_inactive: "text-purple-500",
    },
  };

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <AppHeader />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">📚</div>
            <h2 className="text-2xl font-bold text-amber-800">
              Welcome to Classio!
            </h2>
            <p className="text-amber-600 mt-1">Who are you today?</p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {roles.map((role) => {
              const c = colorMap[role.color as keyof typeof colorMap];
              const isActive = selected === role.key;
              return (
                <motion.button
                  key={role.key}
                  type="button"
                  data-ocid={`login.${role.key}.tab`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelected(role.key)}
                  className={`rounded-3xl p-4 flex flex-col items-center gap-2 border-2 transition-all shadow-md ${
                    isActive ? c.active : c.inactive
                  }`}
                >
                  <span className="text-4xl">{role.emoji}</span>
                  <span className="font-bold text-sm">{role.label}</span>
                  <span
                    className={`text-xs ${isActive ? c.sub_active : c.sub_inactive}`}
                  >
                    {role.sub}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {selected === "student" && (
              <motion.div
                key="student-form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl shadow-lg p-6 space-y-4 border border-amber-100"
              >
                <p className="font-semibold text-gray-700">Student Login</p>
                <div className="space-y-1">
                  <Label htmlFor="stu-id">Student ID</Label>
                  <Input
                    id="stu-id"
                    data-ocid="login.student.input"
                    placeholder="e.g. STU001"
                    value={stuId}
                    onChange={(e) => {
                      setStuId(e.target.value);
                      setStuError("");
                    }}
                    className="h-11 rounded-xl border-amber-200 focus:border-amber-400"
                    autoFocus
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="stu-contact">Contact Number</Label>
                  <Input
                    id="stu-contact"
                    data-ocid="login.student.contact.input"
                    placeholder="Mobile number"
                    value={stuContact}
                    onChange={(e) => {
                      setStuContact(e.target.value);
                      setStuError("");
                    }}
                    className="h-11 rounded-xl border-amber-200 focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="stu-pass">Password</Label>
                  <Input
                    id="stu-pass"
                    data-ocid="login.student.password.input"
                    type="password"
                    placeholder="Password"
                    value={stuPass}
                    onChange={(e) => {
                      setStuPass(e.target.value);
                      setStuError("");
                    }}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleStudentSubmit()
                    }
                    className="h-11 rounded-xl border-amber-200 focus:border-amber-400"
                  />
                </div>
                <AnimatePresence>
                  {stuError && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      data-ocid="login.student.error_state"
                      className="text-red-500 text-sm"
                    >
                      {stuError}
                    </motion.p>
                  )}
                </AnimatePresence>
                <Button
                  data-ocid="login.student.submit_button"
                  onClick={handleStudentSubmit}
                  className="w-full h-12 text-base rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold"
                >
                  Start Learning 🎓
                </Button>
              </motion.div>
            )}

            {selected === "teacher" && (
              <motion.div
                key="teacher-form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl shadow-lg p-6 space-y-4 border border-blue-100"
              >
                <p className="font-semibold text-gray-700">Teacher Login</p>
                <div className="space-y-1">
                  <Label htmlFor="tch-id">Teacher ID</Label>
                  <Input
                    id="tch-id"
                    data-ocid="login.teacher.input"
                    placeholder="e.g. TCH001"
                    value={tchId}
                    onChange={(e) => {
                      setTchId(e.target.value);
                      setTchError("");
                    }}
                    className="h-11 rounded-xl border-blue-200 focus:border-blue-400"
                    autoFocus
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="tch-pass">Password</Label>
                  <Input
                    id="tch-pass"
                    data-ocid="login.teacher.password.input"
                    type="password"
                    placeholder="Password"
                    value={tchPass}
                    onChange={(e) => {
                      setTchPass(e.target.value);
                      setTchError("");
                    }}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleTeacherSubmit()
                    }
                    className="h-11 rounded-xl border-blue-200 focus:border-blue-400"
                  />
                </div>
                <AnimatePresence>
                  {tchError && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      data-ocid="login.teacher.error_state"
                      className="text-red-500 text-sm"
                    >
                      {tchError}
                    </motion.p>
                  )}
                </AnimatePresence>
                <Button
                  data-ocid="login.teacher.submit_button"
                  onClick={handleTeacherSubmit}
                  className="w-full h-12 text-base rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Enter Dashboard 🏫
                </Button>
              </motion.div>
            )}

            {selected === "admin" && (
              <motion.div
                key="admin-form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl shadow-lg p-6 space-y-4 border border-purple-100"
              >
                <p className="font-semibold text-gray-700">Super Admin Login</p>
                <div className="space-y-1">
                  <Label htmlFor="admin-user">Username</Label>
                  <Input
                    id="admin-user"
                    data-ocid="login.admin.input"
                    placeholder="Username"
                    value={adminUser}
                    onChange={(e) => {
                      setAdminUser(e.target.value);
                      setAdminError("");
                    }}
                    className="h-11 rounded-xl border-purple-200 focus:border-purple-400"
                    autoFocus
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="admin-pass">Password</Label>
                  <Input
                    id="admin-pass"
                    data-ocid="login.admin.password.input"
                    type="password"
                    placeholder="Password"
                    value={adminPass}
                    onChange={(e) => {
                      setAdminPass(e.target.value);
                      setAdminError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleAdminSubmit()}
                    className="h-11 rounded-xl border-purple-200 focus:border-purple-400"
                  />
                </div>
                <AnimatePresence>
                  {adminError && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      data-ocid="login.admin.error_state"
                      className="text-red-500 text-sm"
                    >
                      {adminError}
                    </motion.p>
                  )}
                </AnimatePresence>
                <Button
                  data-ocid="login.admin.submit_button"
                  onClick={handleAdminSubmit}
                  className="w-full h-12 text-base rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                >
                  Enter Admin Panel 🔐
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
