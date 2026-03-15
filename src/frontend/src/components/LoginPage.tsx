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
      color: "teal",
    },
    {
      key: "teacher" as const,
      emoji: "🏫",
      label: "Teacher",
      sub: "Manage students",
      color: "cyan",
    },
    {
      key: "admin" as const,
      emoji: "🔐",
      label: "Super Admin",
      sub: "Manage system",
      color: "indigo",
    },
  ];

  const colorMap = {
    teal: {
      active: "bg-teal-500 border-teal-600 text-white shadow-teal-200",
      inactive:
        "bg-white border-teal-200 text-teal-800 hover:border-teal-400 hover:bg-teal-50",
      sub_active: "text-teal-100",
      sub_inactive: "text-teal-500",
      input: "border-teal-200 focus:border-teal-400",
      btn: "bg-teal-500 hover:bg-teal-600",
      card: "border-teal-100",
    },
    cyan: {
      active: "bg-cyan-500 border-cyan-600 text-white shadow-cyan-200",
      inactive:
        "bg-white border-cyan-200 text-cyan-800 hover:border-cyan-400 hover:bg-cyan-50",
      sub_active: "text-cyan-100",
      sub_inactive: "text-cyan-500",
      input: "border-cyan-200 focus:border-cyan-400",
      btn: "bg-cyan-600 hover:bg-cyan-700",
      card: "border-cyan-100",
    },
    indigo: {
      active: "bg-indigo-600 border-indigo-700 text-white shadow-indigo-200",
      inactive:
        "bg-white border-indigo-200 text-indigo-800 hover:border-indigo-400 hover:bg-indigo-50",
      sub_active: "text-indigo-100",
      sub_inactive: "text-indigo-500",
      input: "border-indigo-200 focus:border-indigo-400",
      btn: "bg-indigo-600 hover:bg-indigo-700",
      card: "border-indigo-100",
    },
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #0d9488 0%, #0891b2 50%, #0e7490 100%)",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10 bg-white"
        style={{ transform: "translate(-40%, -40%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 bg-white"
        style={{ transform: "translate(30%, 30%)" }}
      />

      <AppHeader />

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Hero text */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">📚</div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight drop-shadow">
              Welcome to Classio!
            </h2>
            <p className="text-cyan-100 mt-2 text-lg font-semibold tracking-widest uppercase">
              Learn and Lead
            </p>
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
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelected(role.key)}
                  className={`rounded-3xl p-4 flex flex-col items-center gap-2 border-2 transition-all shadow-lg ${
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
                className="bg-white rounded-3xl shadow-xl p-6 space-y-4 border border-teal-100"
              >
                <p className="font-semibold text-teal-700 flex items-center gap-2">
                  <span>🎒</span> Student Login
                </p>
                <div className="space-y-1">
                  <Label htmlFor="stu-id" className="text-teal-700">
                    Student ID
                  </Label>
                  <Input
                    id="stu-id"
                    data-ocid="login.student.input"
                    placeholder="e.g. STU001"
                    value={stuId}
                    onChange={(e) => {
                      setStuId(e.target.value);
                      setStuError("");
                    }}
                    className="h-11 rounded-xl border-teal-200 focus:border-teal-400 focus:ring-teal-200"
                    autoFocus
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="stu-contact" className="text-teal-700">
                    Contact Number
                  </Label>
                  <Input
                    id="stu-contact"
                    data-ocid="login.student.contact.input"
                    placeholder="Mobile number"
                    value={stuContact}
                    onChange={(e) => {
                      setStuContact(e.target.value);
                      setStuError("");
                    }}
                    className="h-11 rounded-xl border-teal-200 focus:border-teal-400"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="stu-pass" className="text-teal-700">
                    Password
                  </Label>
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
                    className="h-11 rounded-xl border-teal-200 focus:border-teal-400"
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
                  className="w-full h-12 text-base rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold"
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
                className="bg-white rounded-3xl shadow-xl p-6 space-y-4 border border-cyan-100"
              >
                <p className="font-semibold text-cyan-700 flex items-center gap-2">
                  <span>🏫</span> Teacher Login
                </p>
                <div className="space-y-1">
                  <Label htmlFor="tch-id" className="text-cyan-700">
                    Teacher ID
                  </Label>
                  <Input
                    id="tch-id"
                    data-ocid="login.teacher.input"
                    placeholder="e.g. TCH001"
                    value={tchId}
                    onChange={(e) => {
                      setTchId(e.target.value);
                      setTchError("");
                    }}
                    className="h-11 rounded-xl border-cyan-200 focus:border-cyan-400"
                    autoFocus
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="tch-pass" className="text-cyan-700">
                    Password
                  </Label>
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
                    className="h-11 rounded-xl border-cyan-200 focus:border-cyan-400"
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
                  className="w-full h-12 text-base rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold"
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
                className="bg-white rounded-3xl shadow-xl p-6 space-y-4 border border-indigo-100"
              >
                <p className="font-semibold text-indigo-700 flex items-center gap-2">
                  <span>🔐</span> Super Admin Login
                </p>
                <div className="space-y-1">
                  <Label htmlFor="admin-user" className="text-indigo-700">
                    Username
                  </Label>
                  <Input
                    id="admin-user"
                    data-ocid="login.admin.input"
                    placeholder="Username"
                    value={adminUser}
                    onChange={(e) => {
                      setAdminUser(e.target.value);
                      setAdminError("");
                    }}
                    className="h-11 rounded-xl border-indigo-200 focus:border-indigo-400"
                    autoFocus
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="admin-pass" className="text-indigo-700">
                    Password
                  </Label>
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
                    className="h-11 rounded-xl border-indigo-200 focus:border-indigo-400"
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
                  className="w-full h-12 text-base rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
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
