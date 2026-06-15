"use client";

import { useRouter } from "next/navigation";
import ProgressAnimation from "@/components/ProgressAnimation";

export default function GeneratingPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push("/result");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 text-center">
        <h2 className="text-lg font-semibold text-slate-800">AI 正在生成你的视频广告</h2>
        <p className="text-sm text-slate-500">预计耗时 6–8 秒，请稍候</p>
      </div>

      <ProgressAnimation onComplete={handleComplete} />
    </div>
  );
}
