"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, BarChart3, LayoutTemplate } from "lucide-react";

const navLinks = [
  { href: "/create", label: "生成视频", icon: Film },
  { href: "/templates", label: "模板市场", icon: LayoutTemplate },
  { href: "/dashboard", label: "效果看板", icon: BarChart3 },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary">
          <Film className="h-5 w-5 text-primary-light" />
          <span className="text-lg">VidMotion</span>
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary-light"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
