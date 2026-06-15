"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, Route, Film, CheckCircle } from "lucide-react";
import { generationPhases } from "@/data/mock";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scan,
  Route,
  Film,
  CheckCircle,
};

const phaseLabels = [
  "分析主体特征",
  "构建运动路径",
  "渲染视频帧",
  "质检评分",
];

interface ProgressAnimationProps {
  onComplete: () => void;
}

export default function ProgressAnimation({ onComplete }: ProgressAnimationProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 7000; // 7s total
    const phaseDuration = totalDuration / phaseLabels.length;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 100 / (totalDuration / 100);
        return next >= 100 ? 100 : next;
      });
    }, 100);

    const phaseTimers = phaseLabels.map((_, i) =>
      setTimeout(() => setPhaseIndex(i), i * phaseDuration)
    );

    const doneTimer = setTimeout(onComplete, totalDuration);

    return () => {
      clearInterval(interval);
      phaseTimers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  const currentPhase = generationPhases[Math.min(phaseIndex, generationPhases.length - 1)];
  const CurrentIcon = iconMap[currentPhase.icon] || Film;

  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Progress bar */}
      <div className="mb-8 h-1.5 w-64 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          className="h-full rounded-full bg-primary-light"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Phase indicator */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phaseIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light/10">
            <CurrentIcon className="h-8 w-8 text-primary-light" />
          </div>
          <p className="text-lg font-semibold text-slate-800">{currentPhase.label}</p>
          <p className="max-w-xs text-center text-sm text-slate-500">{currentPhase.detail}</p>
        </motion.div>
      </AnimatePresence>

      {/* Phase dots */}
      <div className="mt-8 flex items-center gap-2">
        {phaseLabels.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full transition-colors ${
                i < phaseIndex
                  ? "bg-success"
                  : i === phaseIndex
                  ? "bg-primary-light"
                  : "bg-slate-300"
              }`}
            />
            {i < phaseLabels.length - 1 && (
              <div
                className={`h-px w-6 transition-colors ${
                  i < phaseIndex ? "bg-success" : "bg-slate-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-9 text-[10px] text-slate-400">
        {phaseLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
