import type { WeeklyReportData } from "@/store/useStudentStore";
import { Download } from "lucide-react";

interface Props {
  report: WeeklyReportData;
  onDownloadPDF: () => void;
}

function avg(arr: number[]): number {
  if (arr.length === 0) return 0;
  return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
}

function trendIcon(trend: string): string {
  if (trend === "Improving") return "📈";
  if (trend === "Declining") return "📉";
  return "➡️";
}

function levelColor(level: string): { text: string; bg: string } {
  if (level === "Proficient")
    return { text: "text-green-700", bg: "bg-green-100" };
  if (level === "Progressing")
    return { text: "text-amber-700", bg: "bg-amber-100" };
  return { text: "text-red-700", bg: "bg-red-100" };
}

export default function WeeklyReport({ report, onDownloadPDF }: Props) {
  const lc = levelColor(report.comprehensionLevel);
  const avgReading = avg(report.readingScores);
  const avgComprehension = avg(report.comprehensionScores);
  const vocabScoreLabel =
    report.weeklyTestScore !== null
      ? `${report.weeklyTestScore}%`
      : "Not taken";

  return (
    <div
      data-ocid="weekly_report.card"
      className="bg-white rounded-3xl border-2 border-indigo-100 shadow-md overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-extrabold text-base">
              🗓️ Week {report.weekNumber} Report
            </p>
            <p className="text-white/70 text-xs mt-0.5">
              {report.startDate} — {report.endDate}
            </p>
          </div>
          <button
            type="button"
            data-ocid="weekly_report.download_button"
            onClick={onDownloadPDF}
            className="bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Download size={12} /> PDF
          </button>
        </div>
      </div>

      {/* Stat grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="bg-teal-50 rounded-2xl p-3 text-center">
          <p className="text-2xl font-extrabold text-teal-700">
            {report.passagesCompleted}
          </p>
          <p className="text-xs text-teal-600 font-semibold">Passages Done</p>
        </div>
        <div className="bg-amber-50 rounded-2xl p-3 text-center">
          <p className="text-2xl font-extrabold text-amber-700">
            {report.vocabWordsLearned}
          </p>
          <p className="text-xs text-amber-600 font-semibold">Vocab Words</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-3 text-center">
          <p className="text-2xl font-extrabold text-blue-700">
            {avgReading > 0 ? `${avgReading}%` : "—"}
          </p>
          <p className="text-xs text-blue-600 font-semibold">Avg Reading</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-3 text-center">
          <p className="text-2xl font-extrabold text-purple-700">
            {avgComprehension > 0 ? `${avgComprehension}%` : "—"}
          </p>
          <p className="text-xs text-purple-600 font-semibold">
            Avg Comprehension
          </p>
        </div>
      </div>

      {/* Weekly vocab test + level */}
      <div className="px-4 pb-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-indigo-50 rounded-2xl p-3 text-center">
            <p className="text-2xl font-extrabold text-indigo-700">
              {vocabScoreLabel}
            </p>
            <p className="text-xs text-indigo-600 font-semibold">
              Weekly Vocab Test
            </p>
          </div>
          <div className={`flex-1 ${lc.bg} rounded-2xl p-3 text-center`}>
            <p className={`text-lg font-extrabold ${lc.text}`}>
              {report.comprehensionLevel === "Proficient"
                ? "🌟"
                : report.comprehensionLevel === "Progressing"
                  ? "📈"
                  : "🌱"}{" "}
              {report.comprehensionLevel}
            </p>
            <p className={`text-xs font-semibold ${lc.text} opacity-80`}>
              Reading Level
            </p>
          </div>
        </div>

        <div
          className={`flex items-center gap-2 p-3 rounded-2xl ${
            report.improvementTrend === "Improving"
              ? "bg-green-50"
              : report.improvementTrend === "Declining"
                ? "bg-red-50"
                : "bg-gray-50"
          }`}
        >
          <span className="text-xl">{trendIcon(report.improvementTrend)}</span>
          <div>
            <p
              className={`font-bold text-sm ${
                report.improvementTrend === "Improving"
                  ? "text-green-700"
                  : report.improvementTrend === "Declining"
                    ? "text-red-700"
                    : "text-gray-600"
              }`}
            >
              {report.improvementTrend}
            </p>
            <p className="text-xs text-gray-500">Progress trend this week</p>
          </div>
        </div>
      </div>
    </div>
  );
}
