import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
  onComplete: (name: string) => void;
}

export default function Onboarding({ onComplete }: Props) {
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <AppHeader />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-7xl mb-4">📚</div>
            <p className="text-amber-700 text-2xl font-medium">
              Adaptive Reading for Every Learner
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
            <div>
              <p className="block text-base font-semibold text-gray-700 mb-2">
                What's your name?
              </p>
              <Input
                id="student-name"
                data-ocid="onboarding.input"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && name.trim()) onComplete(name.trim());
                }}
                className="text-xl h-14 rounded-xl border-amber-200 focus:border-amber-400"
              />
            </div>
            <Button
              data-ocid="onboarding.submit_button"
              disabled={!name.trim()}
              onClick={() => onComplete(name.trim())}
              className="w-full h-14 text-xl rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold"
            >
              Start Proficiency Test! 🎓
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
