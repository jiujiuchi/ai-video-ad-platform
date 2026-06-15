"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { templates } from "@/data/mock";

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
            {/* Preview placeholder */}
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-500">{t.name}</p>
                <p className="mt-1 text-xs text-slate-400">{t.industry}</p>
              </div>
            </div>

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
