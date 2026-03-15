import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
  onComplete: (name: string, grade: number) => void;
}

export default function Onboarding({ onComplete }: Props) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(0);

  const gradeColors = [
    "bg-emerald-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-rose-500",
  ];

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <AppHeader />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-amber-700 text-lg">
              Adaptive Reading for Every Learner
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
            <div>
              <p className="block text-sm font-semibold text-gray-700 mb-2">
                What's your name?
              </p>
              <Input
                id="student-name"
                data-ocid="onboarding.input"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg h-12 rounded-xl border-amber-200 focus:border-amber-400"
              />
            </div>
            <div>
              <p className="block text-sm font-semibold text-gray-700 mb-3">
                Pick your grade
              </p>
              <div className="grid grid-cols-5 gap-2">
                {gradeColors.map((color, i) => (
                  <button
                    key={color}
                    type="button"
                    data-ocid={`onboarding.grade.${i + 1}`}
                    onClick={() => setGrade(i + 1)}
                    className={`p-3 rounded-xl text-white font-bold text-sm transition-all ${grade === i + 1 ? `${color} scale-110 shadow-md` : "bg-gray-200 text-gray-500 hover:bg-gray-300"}`}
                  >
                    {i + 1}
                    <div className="text-xs font-normal mt-0.5">Grade</div>
                  </button>
                ))}
              </div>
            </div>
            <Button
              data-ocid="onboarding.submit_button"
              disabled={!name.trim() || grade === 0}
              onClick={() => onComplete(name.trim(), grade)}
              className="w-full h-12 text-lg rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold"
            >
              Start Reading! 🚀
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
