"use client";

/**
 * TextReveal — 文字逐字渐入
 *
 * - 把字符串拆成字符，每个字一个 <span>
 * - 用 WAAPI 给每个字 30-50ms 错落动画
 * - prefers-reduced-motion 时直接显示完整文字
 * - SSR-safe：初始文字直接可见，hydration 后再播动画
 *
 * 用法：<TextReveal as="h1" text={headline} className="..." />
 */

import { useEffect, useRef } from "react";

type TextRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  /** 每个字之间的间隔（毫秒） */
  stagger?: number;
  /** 单个字动画时长（毫秒） */
  duration?: number;
  className?: string;
};

export function TextReveal({
  text,
  as: Tag = "h1",
  stagger = 32,
  duration = 600,
  className,
}: TextRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // 还原 prefers-reduced-motion：直接保持可见
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const spans = el.querySelectorAll<HTMLSpanElement>("[data-tr]");
    // SSR 已经渲染了可见文字，hydration 后再重置为不可见 + 触发动画
    spans.forEach((s) => {
      s.style.opacity = "0";
      s.style.transform = "translate3d(0, 0.6em, 0)";
    });

    // 用 WAAPI 给每个字依次播放
    const animations: Animation[] = [];
    spans.forEach((s, i) => {
      const anim = s.animate(
        [
          { opacity: 0, transform: "translate3d(0, 0.6em, 0)" },
          { opacity: 1, transform: "translate3d(0, 0, 0)" },
        ],
        {
          duration,
          delay: i * stagger,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "both",
        },
      );
      animations.push(anim);
    });

    return () => {
      for (const a of animations) a.cancel();
    };
  }, [text, stagger, duration]);

  // 拆分字符，但保留 word-break 友好的 inline-block span
  // （中文字符之间没有空格，所以直接逐字拆；英文则用 word + 空格保留布局）
  const chars = Array.from(text);

  return (
    <Tag ref={ref as never} className={className}>
      {chars.map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          data-tr
          style={{
            display: ch === " " ? "inline" : "inline-block",
            whiteSpace: ch === " " ? "pre" : "normal",
            willChange: "transform, opacity",
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </Tag>
  );
}
