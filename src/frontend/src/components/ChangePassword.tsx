import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Props {
  studentId: string;
  studentName: string;
  onComplete: () => void;
}

export default function ChangePassword({
  studentId,
  studentName,
  onComplete,
}: Props) {
  const { updateStudentPassword } = useAuthStore();
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    setError("");
    if (!newPass.trim()) {
      setError("Please enter a new password.");
      return;
    }
    if (newPass.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPass !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }
    updateStudentPassword(studentId, newPass);
    setSuccess(true);
    setTimeout(() => onComplete(), 1500);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #0d9488 0%, #0891b2 50%, #0e7490 100%)",
      }}
    >
      <AppHeader />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 space-y-5">
            <div className="text-center space-y-1">
              <div className="text-4xl mb-2">🔑</div>
              <h2 className="text-2xl font-bold text-teal-700">
                Set Your Password
              </h2>
              <p className="text-gray-500 text-sm">
                Hi{" "}
                <span className="font-semibold text-teal-600">
                  {studentName}
                </span>
                ! You're using a system-generated password. Please set a new
                password to continue.
              </p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="new-pass" className="text-teal-700">
                New Password
              </Label>
              <Input
                id="new-pass"
                data-ocid="change_password.new_password.input"
                type="password"
                placeholder="Minimum 6 characters"
                value={newPass}
                onChange={(e) => {
                  setNewPass(e.target.value);
                  setError("");
                }}
                className="h-11 rounded-xl border-teal-200 focus:border-teal-400"
                autoFocus
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirm-pass" className="text-teal-700">
                Confirm Password
              </Label>
              <Input
                id="confirm-pass"
                data-ocid="change_password.confirm_password.input"
                type="password"
                placeholder="Re-enter new password"
                value={confirmPass}
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="h-11 rounded-xl border-teal-200 focus:border-teal-400"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  data-ocid="change_password.error_state"
                  className="text-red-500 text-sm"
                >
                  {error}
                </motion.p>
              )}
              {success && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  data-ocid="change_password.success_state"
                  className="text-green-600 text-sm font-medium text-center"
                >
                  ✅ Password updated! Redirecting...
                </motion.p>
              )}
            </AnimatePresence>

            <Button
              data-ocid="change_password.submit_button"
              onClick={handleSubmit}
              disabled={success}
              className="w-full h-12 text-base rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold"
            >
              Set Password & Continue 🎓
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
