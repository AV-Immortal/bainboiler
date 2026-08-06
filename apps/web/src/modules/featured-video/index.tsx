type FeaturedVideoProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  locale: "zh" | "en";
  videoUrl?: string;
  posterUrl?: string;
};

export function FeaturedVideo(props: FeaturedVideoProps) {
  return (
    <section
      id="featured-video"
      className="bg-slate-950 px-6 py-24 text-white"
    >
      <div className="anim-stagger mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden border border-white/10 bg-slate-900">
          {props.videoUrl ? (
            <video
              controls
              poster={props.posterUrl}
              className="aspect-[16/9] h-full w-full object-cover"
            >
              <source src={props.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div className="aspect-[16/9] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_30%),linear-gradient(135deg,_rgba(15,23,42,1),_rgba(2,6,23,1))] p-8">
              <div className="flex h-full items-end border border-white/10 p-8">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-300">
                  Video placeholder for factory, workshop, and delivery footage
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-[0.34em] text-sky-300">
            {props.eyebrow}
          </p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">
            {props.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">{props.description}</p>
          <a
            href={`/${props.locale}/videos`}
            className="mt-8 inline-flex min-w-44 items-center justify-center rounded-sm border border-white/20 px-6 py-3.5 text-sm font-semibold tracking-[0.12em] text-white transition hover:border-white/40 hover:bg-white/5"
          >
            {props.primaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
