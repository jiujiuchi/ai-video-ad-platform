"use client";

import { motion } from "framer-motion";
import { ZoomIn, Layers, Waves, Sparkles, Move, Combine } from "lucide-react";
import type { MotionStyle } from "@/data/mock";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ZoomIn,
  Layers,
  Waves,
  Sparkles,
  Move,
  Combine,
};

const intensityColors: Record<string, string> = {
  light: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  strong: "bg-orange-100 text-orange-700",
};

const intensityLabels: Record<string, string> = {
  light: "轻微",
  medium: "中等",
  strong: "强烈",
};

interface MotionStyleCardProps {
  style: MotionStyle;
  selected: boolean;
  onClick: () => void;
}

export default function MotionStyleCard({ style, selected, onClick }: MotionStyleCardProps) {
  const Icon = iconMap[style.icon] || Sparkles;

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-colors ${
        selected
          ? "border-primary-light bg-primary-light/5 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ${
          selected ? "bg-primary-light text-white" : "bg-bg-light text-slate-500"
        }`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-800">{style.name}</p>
        <p className="mt-0.5 text-xs text-slate-400">{style.description}</p>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${intensityColors[style.intensity]}`}
        >
          {intensityLabels[style.intensity]}
        </span>
        <span className="text-[10px] text-slate-400">{style.bestFor}</span>
      </div>
    </motion.button>
  );
}
