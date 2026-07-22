type CertificatesExportProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  primaryCta: string;
  locale: "zh" | "en";
};

export function CertificatesExport(props: CertificatesExportProps) {
  return (
    <section className="bg-slate-100 px-6 py-24 text-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.34em] text-sky-700">
            {props.eyebrow}
          </p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">
            {props.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">{props.description}</p>
          <a
            href={`/${props.locale}/downloads`}
            className="mt-8 inline-flex min-w-44 items-center justify-center rounded-sm bg-slate-950 px-6 py-3.5 text-sm font-semibold tracking-[0.12em] text-white transition hover:bg-slate-800"
          >
            {props.primaryCta}
          </a>
        </div>
        <div className="grid gap-4">
          {props.items.map((item) => (
            <div
              key={item}
              className="border border-slate-200 bg-white px-6 py-5 text-base text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
