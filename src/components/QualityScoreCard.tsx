"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import type { QualityScores } from "@/data/mock";

interface QualityScoreCardProps {
  scores: QualityScores;
}

const scoreConfig = [
  { key: "contentAccuracy" as const, label: "内容准确性", desc: "主体识别与特征保留" },
  { key: "motionSmoothness" as const, label: "动作连贯性", desc: "帧间过渡流畅度" },
  { key: "colorConsistency" as const, label: "色彩一致性", desc: "全片色调与主体色差" },
];

function scoreColor(score: number): string {
  if (score >= 90) return "text-success";
  if (score >= 70) return "text-warning";
  return "text-red-500";
}

function scoreBg(score: number): string {
  if (score >= 90) return "bg-success/10";
  if (score >= 70) return "bg-warning/10";
  return "bg-red-50";
}

export default function QualityScoreCard({ scores }: QualityScoreCardProps) {
  const statusConfig = {
    ready: { icon: CheckCircle2, label: "可投放", bg: "bg-success/10", text: "text-success" },
    needs_review: { icon: AlertTriangle, label: "需人工审核", bg: "bg-warning/10", text: "text-warning" },
    failed: { icon: XCircle, label: "未通过", bg: "bg-red-50", text: "text-red-500" },
  };

  const status = statusConfig[scores.status];
  const StatusIcon = status.icon;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">AI 质检评分</h3>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.bg} ${status.text}`}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          {status.label}
        </span>
      </div>

      <div className="mb-4 flex items-center justify-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx={50}
              cy={50}
              r={42}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth={8}
            />
            <motion.circle
              cx={50}
              cy={50}
              r={42}
              fill="none"
              stroke={scores.overall >= 90 ? "#10B981" : scores.overall >= 70 ? "#F59E0B" : "#EF4444"}
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 42}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              animate={{
                strokeDashoffset: 2 * Math.PI * 42 * (1 - scores.overall / 100),
              }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
          </svg>
          <span className="absolute text-2xl font-bold text-slate-800">
            {scores.overall}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {scoreConfig.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between rounded bg-bg-light px-3 py-2"
          >
            <div>
              <span className="text-xs font-medium text-slate-700">{item.label}</span>
              <span className="ml-1.5 text-[10px] text-slate-400">{item.desc}</span>
            </div>
            <span className={`text-sm font-bold ${scoreColor(scores[item.key])}`}>
              {scores[item.key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
