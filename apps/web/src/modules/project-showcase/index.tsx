type ProjectShowcaseProps = {
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

export function ProjectShowcase(props: ProjectShowcaseProps) {
  const defaultHref = `/${props.locale}/projects`;
  const actionLabel = props.locale === "zh" ? "查看案例" : "View Project";

  return (
    <section className="bg-white px-6 py-24 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.34em] text-sky-700">
            {props.eyebrow}
          </p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">
            {props.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">{props.description}</p>
        </div>
        <div className="anim-stagger mt-12 grid gap-6 lg:grid-cols-2">
          {props.items.map((item) => (
            <a
              key={item.title}
              href={item.href ?? defaultHref}
              className="relative overflow-hidden border border-slate-200 bg-slate-950 p-8 text-white transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.18)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.22),_transparent_35%)]" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.28em] text-sky-300">
                  {item.meta ?? "Project"}
                </p>
                <h3 className="mt-5 text-3xl font-semibold">{item.title}</h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  {item.description}
                </p>
                <p className="mt-8 text-sm font-semibold tracking-[0.12em] text-white">
                  {actionLabel}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
