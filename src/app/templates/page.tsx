"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, ZoomIn, Layers, Waves, Sparkles, Move, Combine } from "lucide-react";
import { templates } from "@/data/mock";

const previewConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; gradient: string; accent: string }> = {
  "slow-zoom": { icon: ZoomIn, gradient: "from-slate-50 to-slate-200", accent: "bg-slate-100" },
  "light-flow": { icon: Sparkles, gradient: "from-amber-50 to-pink-100", accent: "bg-amber-100" },
  float: { icon: Waves, gradient: "from-sky-50 to-indigo-100", accent: "bg-sky-100" },
  parallax: { icon: Layers, gradient: "from-emerald-50 to-teal-100", accent: "bg-emerald-100" },
  assemble: { icon: Combine, gradient: "from-red-50 to-orange-100", accent: "bg-red-100" },
  drift: { icon: Move, gradient: "from-violet-50 to-purple-100", accent: "bg-violet-100" },
};

export default function TemplatesPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800">模板市场</h2>
        <p className="text-sm text-slate-500">
          选择一个经过投放验证的模板，上传你自己的产品图，即刻生成同款视频广告
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all"
          >
            {/* Preview */}
            {(() => {
              const cfg = previewConfig[t.motionStyle] ?? previewConfig["slow-zoom"];
              const PreviewIcon = cfg.icon;
              return (
                <div className={`flex h-40 items-center justify-center bg-gradient-to-br ${cfg.gradient}`}>
                  <div className="text-center">
                    <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${cfg.accent}`}>
                      <PreviewIcon className="h-7 w-7 text-slate-600" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-slate-700">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.industry}</p>
                  </div>
                </div>
              );
            })()}

            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-bg-light px-2 py-0.5 text-[10px] font-medium text-slate-600">
                  {t.scene}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-success">
                  <TrendingUp className="h-3 w-3" />
                  CTR +{t.ctrLift}%
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-500">{t.previewLabel}</p>

              <button
                onClick={() => router.push(`/create?template=${t.id}`)}
                className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded bg-primary-light px-3 py-2 text-xs font-medium text-white hover:opacity-90"
              >
                做同款
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
