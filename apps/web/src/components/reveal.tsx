"use client";

/**
 * 视口进入动画相关
 *
 * 1) <Reveal> —— 服务端组件直接挂动画 className，CSS keyframes 自带 both
 * 2) useReveal —— 客户端 hook，基于 IntersectionObserver + WAAPI（不依赖任何库）
 * 3) prefers-reduced-motion —— 在 motion.css 内部已禁用
 */

import type { ReactNode } from "react";
import * as React from "react";
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
/* 1b. <RevealOnView> 客户端版：进入视口才触发                              */
/* ------------------------------------------------------------------ */

type RevealTag = "div" | "section" | "article" | "header" | "footer" | "main" | "aside" | "ul" | "ol" | "li";

/**
 * 用 IntersectionObserver 检测元素进入视口后再挂动画 class。
 * 进入前元素是不可见状态（opacity 0），避免「页面下方内容已经动画播完」的问题。
 *
 * 注意：服务端渲染时会输出一个隐藏的容器，hydration 后才挂 class 触发。
 */
export function RevealOnView({
  children,
  variant = "fade-up",
  as = "div",
  className = "",
  threshold = 0.15,
  once = true,
  rootMargin = "0px 0px -8% 0px",
}: {
  children: ReactNode;
  variant?: RevealVariant;
  as?: RevealTag;
  className?: string;
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  const fullClassName = [
    "reveal-on-view",
    visible ? variantClass[variant] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // 动态 tag 通过 React.createElement 渲染，绕过联合类型 props 推断问题
  return React.createElement(as, { ref, className: fullClassName }, children);
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
