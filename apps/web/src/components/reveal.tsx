/**
 * 视口进入动画相关
 *
 * 1) <Reveal> —— 服务端组件直接挂动画 className，CSS keyframes 自带 both
 * 2) useReveal —— 客户端 hook，基于 IntersectionObserver + WAAPI（不依赖任何库）
 * 3) prefers-reduced-motion —— 在 motion.css 内部已禁用
 */

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* 1. <Reveal> 服务端组件版                                              */
/* ------------------------------------------------------------------ */

type RevealVariant = "fade-up" | "fade-in" | "slide-in-left" | "stagger";

const variantClass: Record<RevealVariant, string> = {
  "fade-up": "anim-fade-up",
  "fade-in": "anim-fade-in",
  "slide-in-left": "anim-slide-in-left",
  stagger: "anim-stagger",
};

export function Reveal({
  children,
  variant = "fade-up",
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  variant?: RevealVariant;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const Component = Tag as keyof React.JSX.IntrinsicElements;
  return (
    <Component className={`${variantClass[variant]} ${className}`.trim()}>
      {children}
    </Component>
  );
}

/* ------------------------------------------------------------------ */
/* 2. useReveal 客户端 hook（视口外不播）                                */
/* ------------------------------------------------------------------ */

export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  once?: boolean;
}) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (options?.once !== false) observer.disconnect();
          } else if (options?.once === false) {
            setVisible(false);
          }
        }
      },
      { threshold: options?.threshold ?? 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.once]);

  return { ref, visible };
}
