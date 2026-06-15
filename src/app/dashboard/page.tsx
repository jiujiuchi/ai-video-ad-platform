"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Film, Clock, BadgeCheck } from "lucide-react";
import StatCard from "@/components/StatCard";
import { weeklyTrend, sceneCTRData, mockHistory } from "@/data/mock";

const statCards = [
  { label: "总生成数", value: "4,286", suffix: "本月累计", icon: Film },
  { label: "平均制作周期", value: "0.5", suffix: "人天/条", icon: Clock },
  { label: "质检通过率", value: "91%", suffix: "综合合格率", icon: BadgeCheck },
];

const statusBadge: Record<string, string> = {
  ready: "bg-success/10 text-success",
  generating: "bg-warning/10 text-warning",
  failed: "bg-red-50 text-red-500",
};

const statusLabel: Record<string, string> = {
  ready: "已上线",
  generating: "生成中",
  failed: "未通过",
};

export default function DashboardPage() {
  const [historyTab, setHistoryTab] = useState<"all" | "ready" | "failed">("all");

  const filteredHistory =
    historyTab === "all"
      ? mockHistory
      : mockHistory.filter((h) => h.status === historyTab);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800">效果看板</h2>
        <p className="text-sm text-slate-500">AI 视频广告投放数据概览</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        {statCards.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            suffix={stat.suffix}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-lg border border-slate-200 bg-white p-4"
        >
          <h3 className="mb-3 text-sm font-semibold text-slate-800">每周生成量趋势</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="generations"
                stroke="#2563EB"
                strokeWidth={2}
                dot={{ fill: "#2563EB", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-lg border border-slate-200 bg-white p-4"
        >
          <h3 className="mb-3 text-sm font-semibold text-slate-800">
            各场景 CTR 对比
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={sceneCTRData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="scene" tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <Tooltip />
              <Bar dataKey="aiVideoCTR" name="AI 视频" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Bar
                dataKey="traditionalVideoCTR"
                name="传统视频"
                fill="#CBD5E1"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* History */}
      <div className="mt-6 rounded-lg border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h3 className="text-sm font-semibold text-slate-800">生成历史</h3>
          <div className="flex gap-1">
            {(["all", "ready", "failed"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setHistoryTab(tab)}
                className={`rounded px-2.5 py-1 text-xs font-medium ${
                  historyTab === tab
                    ? "bg-primary-light text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {tab === "all" ? "全部" : tab === "ready" ? "已上线" : "未通过"}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 px-4 py-3"
            >
              <div className="h-10 w-10 flex-shrink-0 rounded bg-bg-light" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {item.scene} · {item.id}
                </p>
                <p className="text-xs text-slate-400">{item.createdAt}</p>
              </div>
              {item.status === "ready" && (
                <span className="text-sm font-semibold text-success">
                  {item.score}
                </span>
              )}
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${statusBadge[item.status]}`}
              >
                {statusLabel[item.status]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
