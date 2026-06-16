"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AISuggestion {
  subject: string;
  category: string;
  suggestedIntensity: "light" | "medium" | "strong";
  bgType: string;
  quality: "good" | "acceptable" | "poor";
}

interface ImageUploaderProps {
  onImageAccepted: (file: File, suggestion: AISuggestion) => void;
  onImageRemoved: () => void;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/bmp"];
const MAX_SIZE = 20 * 1024 * 1024; // 20MB

function analyzeImage(file: File): Promise<AISuggestion> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      const ratio = img.width / img.height;
      const isSquare = ratio > 0.8 && ratio < 1.25;

      // Simulated AI analysis — in production this would call a vision model
      setTimeout(() => {
        resolve({
          subject: isSquare ? "产品主体（居中构图）" : "产品主体（宽幅构图）",
          category: "电商零售",
          suggestedIntensity: "medium",
          bgType: "纯色背景",
          quality: "good",
        });
      }, 1200);
    };
  });
}

export default function ImageUploader({ onImageAccepted, onImageRemoved }: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [suggestion, setSuggestion] = useState<AISuggestion | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (f: File): string | null => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      return "仅支持 JPG、PNG、WebP、BMP 格式的图片";
    }
    if (f.size > MAX_SIZE) {
      return "图片大小不能超过 20MB";
    }
    return null;
  };

  const handleFile = useCallback(
    async (f: File) => {
      setError(null);
      const validationError = validateFile(f);
      if (validationError) {
        setError(validationError);
        return;
      }

      setFile(f);
      setPreview(URL.createObjectURL(f));
      setAnalyzing(true);
      setSuggestion(null);

      try {
        const result = await analyzeImage(f);
        setSuggestion(result);
        onImageAccepted(f, result);
      } finally {
        setAnalyzing(false);
      }
    },
    [onImageAccepted]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setSuggestion(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
    onImageRemoved();
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
              dragOver
                ? "border-primary-light bg-primary-light/5"
                : "border-slate-300 hover:border-slate-400 bg-white"
            }`}
          >
            <Upload className="h-10 w-10 text-slate-400" />
            <p className="mt-3 text-sm font-medium text-slate-600">
              点击或拖拽上传商品图片
            </p>
            <p className="mt-1 text-xs text-slate-400">
              支持 JPG / PNG / WebP，最大 20MB，建议尺寸 ≥ 400×300
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/bmp"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white"
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative aspect-square w-full sm:w-48">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="商品预览"
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 px-4 pb-4 sm:py-4">
                <p className="text-sm font-medium text-slate-700">
                  {file?.name}
                </p>
                <p className="text-xs text-slate-400">
                  {(file && (file.size / 1024 / 1024).toFixed(1))} MB
                </p>

                {analyzing && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-primary-light">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-light border-t-transparent" />
                    正在分析图片...
                  </div>
                )}

                {suggestion && (
                  <div className="mt-3 space-y-1.5 rounded bg-bg-light p-3">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-success">
                      <CheckCircle2 className="h-4 w-4" />
                      图片质量良好，已自动识别内容
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-slate-500">
                      <span>主体：{suggestion.subject}</span>
                      <span>品类：{suggestion.category}</span>
                      <span>背景：{suggestion.bgType}</span>
                      <span>
                        推荐运动强度：
                        <span className="font-medium text-primary-light">
                          {suggestion.suggestedIntensity === "light"
                            ? "轻微"
                            : suggestion.suggestedIntensity === "medium"
                            ? "中等"
                            : "强烈"}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-1.5 border-t border-red-100 bg-red-50 px-4 py-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
