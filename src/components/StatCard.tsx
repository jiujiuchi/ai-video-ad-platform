interface StatCardProps {
  label: string;
  value: string;
  suffix: string;
  highlight?: boolean;
}

export default function StatCard({ label, value, suffix, highlight }: StatCardProps) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        highlight
          ? "border-primary-light/30 bg-primary-light/5"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-800">{value}</p>
      <p className="mt-0.5 text-xs text-slate-400">{suffix}</p>
    </div>
  );
}
