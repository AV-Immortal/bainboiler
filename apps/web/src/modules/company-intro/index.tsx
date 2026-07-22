type CompanyIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: Array<{ label: string; value: string }>;
};

export function CompanyIntro(props: CompanyIntroProps) {
  return (
    <section className="bg-white px-6 py-24 text-slate-950">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.34em] text-sky-700">
            {props.eyebrow}
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
            {props.title}
          </h2>
        </div>
        <div>
          <p className="text-lg leading-8 text-slate-600">{props.description}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {props.highlights.map((item) => (
              <div
                key={`${item.label}-${item.value}`}
                className="border border-slate-200 bg-slate-50 px-5 py-5"
              >
                <p className="text-2xl font-semibold text-slate-950">{item.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
