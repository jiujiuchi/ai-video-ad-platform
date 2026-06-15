"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Info } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import MotionStyleCard from "@/components/MotionStyleCard";
import { motionStyles, scenes } from "@/data/mock";

type Step = "upload" | "configure";

interface AISuggestion {
  subject: string;
  category: string;
  suggestedIntensity: "light" | "medium" | "strong";
  bgType: string;
  quality: "good" | "acceptable" | "poor";
}

export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("upload");
  const [hasImage, setHasImage] = useState(false);
  const [selectedScene, setSelectedScene] = useState(scenes[0].id);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [promptText, setPromptText] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [suggestion, setSuggestion] = useState<AISuggestion | null>(null);

  const canGenerate = hasImage && selectedStyle;

  const handleGenerate = () => {
    if (!canGenerate) return;
    router.push("/generating");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Step indicator */}
      <div className="mb-6 flex items-center justify-center gap-2">
        {["upload", "configure"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                step === s
                  ? "bg-primary-light text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm font-medium ${
                step === s ? "text-slate-800" : "text-slate-400"
              }`}
            >
              {s === "upload" ? "上传素材" : "选择效果"}
            </span>
            {i < 1 && <div className="mx-2 h-px w-8 bg-slate-300" />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {step === "upload" ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-800">上传商品图片</h2>
              <p className="text-sm text-slate-500">
                上传后 AI 将自动分析图片内容，帮你推荐最佳配置
              </p>
            </div>

            <ImageUploader
              onImageAccepted={(_, s) => {
                setHasImage(true);
                setSuggestion(s);
              }}
              onImageRemoved={() => {
                setHasImage(false);
                setSuggestion(null);
              }}
            />

            {/* Scene selection */}
            <div className="mt-6">
              <h3 className="mb-2 text-sm font-medium text-slate-700">选择投放场景</h3>
              <div className="grid gap-2 sm:grid-cols-3">
                {scenes.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => setSelectedScene(scene.id)}
                    className={`rounded-lg border-2 p-3 text-left transition-colors ${
                      selectedScene === scene.id
                        ? "border-primary-light bg-primary-light/5"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <p className="text-sm font-medium text-slate-800">{scene.name}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{scene.description}</p>
                    {selectedScene === scene.id && suggestion && (
                      <p className="mt-1 text-[10px] text-primary-light">
                        推荐强度：{suggestion.suggestedIntensity === "light" ? "轻微" : suggestion.suggestedIntensity === "medium" ? "中等" : "强烈"}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setStep("configure")}
                disabled={!hasImage}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary-light px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                下一步
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="configure"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-800">选择运动效果</h2>
              <p className="text-sm text-slate-500">
                用可视化卡片选择效果，不需要写复杂提示词
              </p>
            </div>

            {/* Motion style grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {motionStyles.map((style) => (
                <MotionStyleCard
                  key={style.id}
                  style={style}
                  selected={selectedStyle === style.id}
                  onClick={() => setSelectedStyle(style.id)}
                />
              ))}
            </div>

            {/* Advanced: prompt tweak */}
            <div className="mt-6">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600"
              >
                <Info className="h-3 w-3" />
                高级设置（可选调整提示词）
              </button>
              {showAdvanced && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mt-2"
                >
                  <textarea
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder="这里显示 AI 自动生成的提示词，你可以自由修改..."
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary-light focus:outline-none"
                    rows={3}
                    maxLength={120}
                  />
                  <p className="mt-1 text-right text-xs text-slate-400">
                    {promptText.length}/120
                  </p>
                </motion.div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setStep("upload")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                <ChevronLeft className="h-4 w-4" />
                上一步
              </button>
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary-light px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                开始生成
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
