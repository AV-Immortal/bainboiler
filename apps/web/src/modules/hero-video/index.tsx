type HeroVideoProps = {
  locale: "zh" | "en";
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  videoUrl?: string;
  posterUrl?: string;
};

export function HeroVideo(props: HeroVideoProps) {
  const primaryHref = `/${props.locale}/contact`;
  const secondaryHref = "#featured-video";

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-slate-950 text-white">
      {props.videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={props.posterUrl}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        >
          <source src={props.videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_35%),linear-gradient(135deg,_rgba(15,23,42,0.95),_rgba(2,6,23,1))]" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(2,6,23,0.82)_48%,rgba(2,6,23,0.35)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:88px_88px] opacity-20" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-end px-6 pb-24 pt-32 md:pb-28">
        <div className="max-w-4xl">
          <p className="text-xs font-medium tracking-[0.42em] text-sky-300">
            BAIN BOILER
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] text-white md:text-7xl">
            {props.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
            {props.subheadline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={primaryHref}
              className="inline-flex min-w-40 items-center justify-center rounded-sm bg-sky-400 px-6 py-3.5 text-sm font-semibold tracking-[0.08em] text-slate-950 transition hover:bg-sky-300"
            >
              {props.primaryCta}
            </a>
            <a
              href={secondaryHref}
              className="inline-flex min-w-40 items-center justify-center rounded-sm border border-white/25 px-6 py-3.5 text-sm font-semibold tracking-[0.08em] text-white transition hover:border-white/45 hover:bg-white/5"
            >
              {props.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
