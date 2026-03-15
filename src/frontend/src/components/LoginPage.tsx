import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const TEACHER_PIN = "1234";

interface Props {
  onStudentLogin: (name: string) => void;
  onTeacherLogin: () => void;
}

export default function LoginPage({ onStudentLogin, onTeacherLogin }: Props) {
  const [selected, setSelected] = useState<"student" | "teacher" | null>(null);
  const [studentName, setStudentName] = useState("");
  const [teacherPin, setTeacherPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const handleTeacherSubmit = () => {
    if (teacherPin === TEACHER_PIN) {
      onTeacherLogin();
    } else {
      setPinError(true);
    }
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

          {/* Role selector cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.button
              type="button"
              data-ocid="login.student.tab"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelected("student");
                setPinError(false);
              }}
              className={`rounded-3xl p-6 flex flex-col items-center gap-3 border-2 transition-all shadow-md ${
                selected === "student"
                  ? "bg-amber-500 border-amber-600 text-white shadow-amber-200"
                  : "bg-white border-amber-200 text-amber-800 hover:border-amber-400"
              }`}
            >
              <span className="text-5xl">🎒</span>
              <span className="font-bold text-lg">I am a Student</span>
              <span
                className={`text-xs ${selected === "student" ? "text-amber-100" : "text-amber-500"}`}
              >
                Start learning!
              </span>
            </motion.button>

            <motion.button
              type="button"
              data-ocid="login.teacher.tab"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelected("teacher");
                setPinError(false);
              }}
              className={`rounded-3xl p-6 flex flex-col items-center gap-3 border-2 transition-all shadow-md ${
                selected === "teacher"
                  ? "bg-blue-600 border-blue-700 text-white shadow-blue-200"
                  : "bg-white border-blue-200 text-blue-800 hover:border-blue-400"
              }`}
            >
              <span className="text-5xl">🏫</span>
              <span className="font-bold text-lg">I am a Teacher</span>
              <span
                className={`text-xs ${selected === "teacher" ? "text-blue-100" : "text-blue-500"}`}
              >
                View dashboard
              </span>
            </motion.button>
          </div>

          {/* Expanded form */}
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
                <p className="font-semibold text-gray-700">What's your name?</p>
                <Input
                  data-ocid="login.student.input"
                  placeholder="Enter your name..."
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && studentName.trim())
                      onStudentLogin(studentName.trim());
                  }}
                  className="h-12 text-lg rounded-xl border-amber-200 focus:border-amber-400"
                  autoFocus
                />
                <Button
                  data-ocid="login.student.submit_button"
                  disabled={!studentName.trim()}
                  onClick={() => onStudentLogin(studentName.trim())}
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
                <p className="font-semibold text-gray-700">Enter Teacher PIN</p>
                <Input
                  data-ocid="login.teacher.input"
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="4-digit PIN"
                  value={teacherPin}
                  onChange={(e) => {
                    setTeacherPin(e.target.value);
                    setPinError(false);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleTeacherSubmit()}
                  className={`h-12 text-center text-2xl tracking-widest rounded-xl border-2 ${
                    pinError
                      ? "border-red-400"
                      : "border-blue-200 focus:border-blue-400"
                  }`}
                  autoFocus
                />
                <AnimatePresence>
                  {pinError && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      data-ocid="login.teacher.error_state"
                      className="text-red-500 text-sm"
                    >
                      Incorrect PIN. Please try again.
                    </motion.p>
                  )}
                </AnimatePresence>
                <Button
                  data-ocid="login.teacher.submit_button"
                  disabled={teacherPin.length < 4}
                  onClick={handleTeacherSubmit}
                  className="w-full h-12 text-base rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Enter Dashboard 🏫
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
