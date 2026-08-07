"use client";

/**
 * CountUp — 数字滚动动画
 *
 * - 进入视口后才触发（IntersectionObserver）
 * - 用 requestAnimationFrame 平滑递增到目标值
 * - 保留后缀（+ / % / H 等）
 * - prefers-reduced-motion 时直接显示终值
 * - 服务端安全（initial render = 0，避免 hydration mismatch）
 */

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** 例如 "30+" / "12" / "100%" / "24H" —— 自动拆出数字 + 后缀 */
  value: string;
  /** 动画时长（毫秒） */
  duration?: number;
  /** className 直接挂到外层 <span> */
  className?: string;
};

const NUMBER_RE = /(\d+(?:\.\d+)?)([\s\S]*)/;

function parseValue(raw: string): { num: number; suffix: string } {
  const m = NUMBER_RE.exec(raw.trim());
  if (!m) return { num: 0, suffix: raw };
  return { num: Number.parseFloat(m[1]), suffix: m[2] ?? "" };
}

function formatValue(num: number, suffix: string, original: string): string {
  // 保留原始字符串里的整数/小数位数（如 "1.5" 不要被格式化成 "2"）
  const decimals = (original.match(/\.(\d+)/)?.[1] ?? "").length;
  const fixed = decimals > 0 ? num.toFixed(decimals) : Math.round(num).toString();
  return `${fixed}${suffix}`;
}

export function CountUp({ value, duration = 1800, className }: CountUpProps) {
  const { num, suffix } = parseValue(value);
  const ref = useRef<HTMLSpanElement | null>(null);
  // SSR-safe 初始值：先渲染 0，避免 hydration mismatch
  const [display, setDisplay] = useState<string>(() => formatValue(0, suffix, value));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // 还原 prefers-reduced-motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || num === 0) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // ease-out cubic：起手快、收尾慢
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(formatValue(num * eased, suffix, value));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            run();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
    // 仅在 num/suffix 变化时重启动画
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
