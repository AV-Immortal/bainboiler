import { urlFor } from "../../../sanity/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

type HeroVideoProps = {
  locale: "zh" | "en";
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  videoUrl?: string;
  posterUrl?: string;
  // 新增：背景配置（来自 Sanity）
  backgroundType?: "color" | "gradient" | "image";
  backgroundColor?: string;
  backgroundGradient?: { from?: string; to?: string; angle?: number };
  backgroundImage?: SanityImageSource;
  backgroundOverlayOpacity?: number;
};

export function HeroVideo(props: HeroVideoProps) {
  const primaryHref = `/${props.locale}/contact`;
  const secondaryHref = "#featured-video";

  // 构建背景样式
  const bgStyle: React.CSSProperties = {};
  const bgType = props.backgroundType ?? "color";

  if (bgType === "color" && props.backgroundColor) {
    bgStyle.background = props.backgroundColor;
  } else if (
    bgType === "gradient" &&
    props.backgroundGradient?.from &&
    props.backgroundGradient?.to
  ) {
    const angle = props.backgroundGradient.angle ?? 135;
    bgStyle.background = `linear-gradient(${angle}deg, ${props.backgroundGradient.from}, ${props.backgroundGradient.to})`;
  } else if (bgType === "image" && props.backgroundImage) {
    const imgUrl = urlFor(props.backgroundImage)
      .width(1920)
      .fit("max")
      .auto("format")
      .url();
    if (imgUrl) bgStyle.backgroundImage = `url(${imgUrl})`;
    bgStyle.backgroundSize = "cover";
    bgStyle.backgroundPosition = "center";
  }

  // 蒙层透明度（仅 image 模式）
  const overlayOpacity = Math.max(0, Math.min(100, props.backgroundOverlayOpacity ?? 50));
  const overlayAlpha = (100 - overlayOpacity) / 100; // 蒙层 alpha = 1 - 透出率

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-slate-950 text-white">
      {/* 背景层：图片 / 渐变 / 纯色 */}
      {bgType === "image" && props.backgroundImage ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={bgStyle}
        />
      ) : bgType === "gradient" ? (
        <div aria-hidden className="absolute inset-0" style={bgStyle} />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={bgStyle.background ? bgStyle : undefined}
        />
      )}

      {/* 蒙层（仅 image 模式） */}
      {bgType === "image" && overlayAlpha > 0 ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-slate-950"
          style={{ opacity: overlayAlpha }}
        />
      ) : null}

      {/* 装饰网格（仅在没图片时显示） */}
      {bgType !== "image" && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_35%),linear-gradient(135deg,_rgba(15,23,42,0.95),_rgba(2,6,23,1))]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(2,6,23,0.82)_48%,rgba(2,6,23,0.35)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:88px_88px] opacity-20" />
        </>
      )}

      {/* 视频层（可选，覆盖在背景上） */}
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
      ) : null}

      {/* 内容层 */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-end px-6 pb-24 pt-32 md:pb-28">
        <div className="anim-stagger max-w-4xl">
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
