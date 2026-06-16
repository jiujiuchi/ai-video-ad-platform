"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Download, Copy, Play, RotateCcw } from "lucide-react";
import QualityScoreCard from "@/components/QualityScoreCard";
import { mockQualityScores } from "@/data/mock";

// Public domain sample videos for demo — each tab shows a different motion style variant
const demoVideos = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
];

export default function ResultPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">生成完成</h2>
            <p className="text-sm text-slate-500">AI 已为你生成广告视频</p>
          </div>
          <button
            onClick={() => router.push("/create")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            再次生成
          </button>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Video player area */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-black">
            <video
              key={activeTab}
              controls
              autoPlay
              loop
              className="w-full"
              poster="/placeholder.svg"
            >
              <source src={demoVideos[activeTab]} type="video/mp4" />
            </video>
          </div>

          {/* Tab switcher */}
          <div className="mt-3 flex gap-2">
            {["镜头缓推", "背景视差", "光影流转"].map((label, i) => (
              <button
                key={label}
                onClick={() => setActiveTab(i)}
                className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === i
                    ? "bg-primary-light text-white"
                    : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Play className="mr-1 inline h-3 w-3" />
                {label}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary-light px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <Download className="h-4 w-4" />
              下载视频
            </button>
            <button
              onClick={() => router.push("/create")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary-light bg-white px-4 py-2 text-sm font-medium text-primary-light hover:bg-primary-light/5"
            >
              <Copy className="h-4 w-4" />
              做同款
            </button>
          </div>
        </div>

        {/* Quality score */}
        <div>
          <QualityScoreCard scores={mockQualityScores} />
        </div>
      </div>
    </div>
  );
}
