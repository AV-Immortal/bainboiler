type IndustrySolutionsProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: Array<{
    title: string;
    description: string;
    href?: string | null;
    meta?: string | null;
  }>;
  locale: "zh" | "en";
};

export function IndustrySolutions(props: IndustrySolutionsProps) {
  const defaultHref = `/${props.locale}/solutions`;
  const actionLabel = props.locale === "zh" ? "查看方案" : "View Solution";

  return (
    <section className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.34em] text-sky-300">
              {props.eyebrow}
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">
              {props.title}
            </h2>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            {props.description}
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {props.items.map((item) => (
            <a
              key={item.title}
              href={item.href ?? defaultHref}
              className="group border border-white/10 bg-white/3 p-8 transition hover:-translate-y-1 hover:border-sky-300/30 hover:bg-white/5"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                {item.meta ?? "Industry"}
              </p>
              <h3 className="mt-5 text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-300">
                {item.description}
              </p>
              <p className="mt-8 text-sm font-semibold tracking-[0.12em] text-sky-300">
                {actionLabel}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
