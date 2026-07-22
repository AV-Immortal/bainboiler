type BrandStatsProps = {
  items: Array<{ label: string; value: string }>;
};

export function BrandStats({ items }: BrandStatsProps) {
  return (
    <section className="relative z-10 -mt-20 px-6 pb-8">
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-sm border border-white/10 bg-slate-900/90 shadow-[0_30px_80px_rgba(2,6,23,0.35)] backdrop-blur md:grid-cols-4">
        {items.map((item) => (
          <div
            key={`${item.label}-${item.value}`}
            className="border-b border-white/8 bg-slate-950/85 px-6 py-8 last:border-b-0 md:border-b-0 md:border-r md:border-white/8 md:last:border-r-0"
          >
            <p className="text-4xl font-semibold text-white">{item.value}</p>
            <p className="mt-3 text-xs tracking-[0.28em] text-slate-400 uppercase">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
