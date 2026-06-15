"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Clock, TrendingUp, DollarSign } from "lucide-react";
import { landingStats } from "@/data/mock";

const features = [
  {
    icon: Zap,
    title: "零 Prompt 门槛",
    desc: "上传图片即自动分析主体，中小店主无需学习写提示词",
  },
  {
    icon: Clock,
    title: "3 分钟出片",
    desc: "从上传到生成可投放视频广告，全程不超过 3 分钟",
  },
  {
    icon: TrendingUp,
    title: "数据驱动优化",
    desc: "基于真实投放数据的质检评分体系，确保生成质量达标",
  },
  {
    icon: DollarSign,
    title: "降低 80% 成本",
    desc: "替代传统视频制作流程，单条广告成本从数千元降至近乎为零",
  },
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-light px-4 py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 75% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              3 步生成高质量视频广告
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/75 sm:text-lg">
              上传产品图 → AI 自动分析 → 输出可投放视频。
              制作周期从 5 天缩短到半天，专为中小广告主打造。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Link
              href="/create"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-slate-100"
            >
              开始生成
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              浏览模板
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid grid-cols-3 gap-4"
          >
            {landingStats.map((stat) => (
              <div key={stat.label} className="rounded-lg bg-white/10 p-4 backdrop-blur">
                <p className="text-xl font-bold sm:text-2xl">{stat.value}</p>
                <p className="text-xs text-white/70">{stat.label}</p>
                <p className="text-[10px] text-white/50">{stat.suffix}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-xl font-bold text-slate-800">
          为什么选择 VidMotion？
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light/10">
                <f.icon className="h-5 w-5 text-primary-light" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-800">{f.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center">
        <p className="text-xs text-slate-400">
          VidMotion — AI 视频广告生成平台 · 作品集项目 · 2026
        </p>
      </footer>
    </div>
  );
}
