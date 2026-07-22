type ContactCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  locale: "zh" | "en";
};

export function ContactCta(props: ContactCtaProps) {
  return (
    <section
      id="contact-cta"
      className="bg-slate-950 px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_30%),linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(2,6,23,1))] px-8 py-12 md:px-12 md:py-14">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.34em] text-sky-300">
              {props.eyebrow}
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
              {props.title}
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              {props.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <a
              href={`/${props.locale}/contact`}
              className="inline-flex min-w-40 items-center justify-center rounded-sm bg-sky-400 px-6 py-3.5 text-sm font-semibold tracking-[0.12em] text-slate-950 transition hover:bg-sky-300"
            >
              {props.primaryCta}
            </a>
            <a
              href={`/${props.locale}/downloads`}
              className="inline-flex min-w-40 items-center justify-center rounded-sm border border-white/20 px-6 py-3.5 text-sm font-semibold tracking-[0.12em] text-white transition hover:border-white/40 hover:bg-white/5"
            >
              {props.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
