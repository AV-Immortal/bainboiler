# BAIN BOILER Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the bilingual `bainboiler` corporate website and CMS from scratch with a premium industrial homepage, locale auto-detection, modular content blocks, inquiry capture, and production-ready deployment structure.

**Architecture:** Use a single Git repository with `apps/web` for the public `Next.js` site and `apps/cms` for the `Strapi` content backend. The web app renders locale-prefixed routes, consumes normalized CMS data through mapper functions, and keeps each homepage/page module isolated under `src/modules/*` so future replacement is localized.

**Tech Stack:** `Next.js` App Router, `TypeScript`, `Tailwind CSS`, `next-intl`, `Strapi`, `Zod`, `React Hook Form`, `Vitest`, `Testing Library`

---

## Planned File Structure

### Repository root

- Create: `package.json` - npm workspace definition and top-level scripts
- Create: `apps/web/` - public website
- Create: `apps/cms/` - Strapi admin/API
- Create: `.editorconfig` - basic formatting consistency
- Modify: `.gitignore` - keep existing ignores and add app-specific outputs if missing

### Web app

- Create: `apps/web/src/app/[locale]/` - locale-prefixed pages
- Create: `apps/web/src/app/api/inquiry/route.ts` - inquiry API endpoint
- Create: `apps/web/src/components/layout/` - header, footer, locale switcher
- Create: `apps/web/src/lib/i18n/` - locale resolution and routing helpers
- Create: `apps/web/src/lib/cms/` - fetchers and mappers
- Create: `apps/web/src/modules/` - page modules with isolated folders and `README.md`
- Create: `apps/web/messages/` - static fallback translations
- Create: `apps/web/src/test/` - shared test setup

### CMS app

- Create: `apps/cms/src/api/site-setting/` - global site settings
- Create: `apps/cms/src/api/page-config/` - page/module order config
- Create: `apps/cms/src/api/product/` - product content type
- Create: `apps/cms/src/api/solution/` - solution content type
- Create: `apps/cms/src/api/project/` - case/project content type
- Create: `apps/cms/src/api/article/` - news content type
- Create: `apps/cms/src/api/video/` - video content type
- Create: `apps/cms/src/api/download/` - download assets

## Task 1: Bootstrap Workspace

**Files:**
- Create: `package.json`
- Create: `.editorconfig`
- Modify: `.gitignore`
- Create: `apps/web/*`
- Create: `apps/cms/*`

- [ ] **Step 1: Create the root workspace manifest**

Create `package.json` with npm workspaces and shared scripts:

```json
{
  "name": "bainboiler",
  "private": true,
  "workspaces": [
    "apps/web",
    "apps/cms"
  ],
  "scripts": {
    "dev:web": "npm run dev --workspace web",
    "dev:cms": "npm run develop --workspace cms",
    "build:web": "npm run build --workspace web",
    "build:cms": "npm run build --workspace cms",
    "lint:web": "npm run lint --workspace web",
    "test:web": "npm run test --workspace web"
  }
}
```

- [ ] **Step 2: Add editor settings**

Create `.editorconfig`:

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
```

- [ ] **Step 3: Extend `.gitignore` only if needed**

Ensure `.gitignore` still includes these lines:

```gitignore
apps/web/.next/
apps/web/coverage/
apps/cms/.strapi/
apps/cms/.tmp/
apps/cms/build/
apps/cms/dist/
```

- [ ] **Step 4: Scaffold the Next.js app**

Run:

```bash
npm create next-app@latest apps/web -- --ts --eslint --tailwind --app --src-dir --import-alias "@/*"
```

Expected: `Success! Created web at C:\Users\22638\Desktop\BOILER\apps\web`

- [ ] **Step 5: Scaffold the Strapi app**

Run:

```bash
npx create-strapi-app@latest apps/cms --typescript --no-run --skip-cloud
```

Expected: the generator completes and creates `apps/cms`

- [ ] **Step 6: Verify the workspace boots**

Run:

```bash
npm install
npm run lint:web
```

Expected: `✔ No ESLint warnings or errors`

- [ ] **Step 7: Commit the bootstrap**

```bash
git add package.json .editorconfig .gitignore apps/web apps/cms
git commit -m "chore: bootstrap bainboiler workspace"
```

## Task 2: Build Locale Routing And Site Shell

**Files:**
- Create: `apps/web/src/middleware.ts`
- Create: `apps/web/src/i18n/routing.ts`
- Create: `apps/web/src/lib/i18n/resolve-locale.ts`
- Create: `apps/web/src/lib/i18n/__tests__/resolve-locale.test.ts`
- Modify: `apps/web/src/app/layout.tsx`
- Create: `apps/web/src/app/[locale]/layout.tsx`
- Create: `apps/web/src/components/layout/site-header.tsx`
- Create: `apps/web/src/components/layout/site-footer.tsx`
- Create: `apps/web/src/components/layout/locale-switcher.tsx`
- Create: `apps/web/messages/zh.json`
- Create: `apps/web/messages/en.json`
- Test: `apps/web/src/lib/i18n/__tests__/resolve-locale.test.ts`

- [ ] **Step 1: Install i18n and test dependencies**

Run:

```bash
cd apps/web
npm install next-intl zod react-hook-form @hookform/resolvers
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event
```

Expected: packages install with no vulnerability blocker

- [ ] **Step 2: Write the failing locale resolution test**

Create `apps/web/src/lib/i18n/__tests__/resolve-locale.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { resolveLocale } from "../resolve-locale";

describe("resolveLocale", () => {
  it("prefers cookie locale over browser hints", () => {
    const locale = resolveLocale({
      cookieLocale: "en",
      acceptLanguage: "zh-CN,zh;q=0.9,en;q=0.8",
      countryCode: "CN",
    });

    expect(locale).toBe("en");
  });

  it("defaults mainland China traffic to zh", () => {
    const locale = resolveLocale({
      acceptLanguage: "en-US,en;q=0.9",
      countryCode: "CN",
    });

    expect(locale).toBe("zh");
  });

  it("defaults non-China traffic to en", () => {
    const locale = resolveLocale({
      acceptLanguage: "fr-FR,fr;q=0.9",
      countryCode: "FR",
    });

    expect(locale).toBe("en");
  });
});
```

- [ ] **Step 3: Run the test to verify failure**

Run:

```bash
cd apps/web
npx vitest run src/lib/i18n/__tests__/resolve-locale.test.ts
```

Expected: FAIL with module not found for `../resolve-locale`

- [ ] **Step 4: Implement locale resolution and middleware**

Create `apps/web/src/lib/i18n/resolve-locale.ts`:

```ts
export type Locale = "zh" | "en";

type ResolveLocaleInput = {
  cookieLocale?: string | null;
  acceptLanguage?: string | null;
  countryCode?: string | null;
};

const SUPPORTED_LOCALES: Locale[] = ["zh", "en"];

export function resolveLocale(input: ResolveLocaleInput): Locale {
  if (input.cookieLocale && SUPPORTED_LOCALES.includes(input.cookieLocale as Locale)) {
    return input.cookieLocale as Locale;
  }

  if (input.countryCode?.toUpperCase() === "CN") {
    return "zh";
  }

  if (input.acceptLanguage?.toLowerCase().includes("zh")) {
    return "zh";
  }

  return "en";
}
```

Create `apps/web/src/middleware.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { resolveLocale } from "@/lib/i18n/resolve-locale";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/zh") ||
    pathname.startsWith("/en") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const locale = resolveLocale({
    cookieLocale: request.cookies.get("locale")?.value,
    acceptLanguage: request.headers.get("accept-language"),
    countryCode: request.headers.get("x-vercel-ip-country"),
  });

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
```

- [ ] **Step 5: Add next-intl routing and fallback message files**

Create `apps/web/src/i18n/routing.ts`:

```ts
export const locales = ["zh", "en"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "en";
```

Create `apps/web/messages/zh.json`:

```json
{
  "nav": {
    "about": "关于我们",
    "products": "产品中心",
    "solutions": "解决方案",
    "projects": "工程案例",
    "contact": "联系我们"
  }
}
```

Create `apps/web/messages/en.json`:

```json
{
  "nav": {
    "about": "About",
    "products": "Products",
    "solutions": "Solutions",
    "projects": "Projects",
    "contact": "Contact"
  }
}
```

- [ ] **Step 6: Add locale layouts and shell components**

Create `apps/web/src/components/layout/locale-switcher.tsx`:

```tsx
"use client";

import { usePathname } from "next/navigation";

export function LocaleSwitcher({ locale }: { locale: "zh" | "en" }) {
  const pathname = usePathname();
  const targetZh = pathname.replace(/^\/(zh|en)/, "/zh");
  const targetEn = pathname.replace(/^\/(zh|en)/, "/en");

  return (
    <div className="flex items-center gap-2 text-sm text-slate-200">
      <a href={targetZh} onClick={() => document.cookie = "locale=zh;path=/;max-age=31536000"}>中文</a>
      <span>/</span>
      <a href={targetEn} onClick={() => document.cookie = "locale=en;path=/;max-age=31536000"}>EN</a>
    </div>
  );
}
```

Create `apps/web/src/components/layout/site-header.tsx`:

```tsx
import { LocaleSwitcher } from "./locale-switcher";

export function SiteHeader({ locale }: { locale: "zh" | "en" }) {
  return (
    <header className="absolute inset-x-0 top-0 z-20 border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href={`/${locale}`} className="text-lg font-semibold tracking-[0.18em] text-white">
          BAIN BOILER
        </a>
        <nav className="hidden gap-6 text-sm text-slate-200 md:flex">
          <a href={`/${locale}/about`}>About</a>
          <a href={`/${locale}/products`}>Products</a>
          <a href={`/${locale}/solutions`}>Solutions</a>
          <a href={`/${locale}/projects`}>Projects</a>
          <a href={`/${locale}/contact`}>Contact</a>
        </nav>
        <LocaleSwitcher locale={locale} />
      </div>
    </header>
  );
}
```

Create `apps/web/src/components/layout/site-footer.tsx`:

```tsx
export function SiteFooter({ locale }: { locale: "zh" | "en" }) {
  return (
    <footer className="bg-slate-950 px-6 py-12 text-sm text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:justify-between">
        <div>
          <p className="font-semibold text-white">Shanghai Baien Boiler Co., Ltd.</p>
          <p>BAIN BOILER</p>
        </div>
        <div className="flex gap-4">
          <a href={`/${locale}/privacy-policy`}>Privacy Policy</a>
          <a href={`/${locale}/terms`}>Terms</a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 7: Add the root and locale layouts**

Create `apps/web/src/app/layout.tsx`:

```tsx
import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
```

Create `apps/web/src/app/[locale]/layout.tsx`:

```tsx
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: "zh" | "en" }>;
}) {
  const { locale } = await params;

  return (
    <>
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </>
  );
}
```

- [ ] **Step 8: Run the locale test again**

Run:

```bash
cd apps/web
npx vitest run src/lib/i18n/__tests__/resolve-locale.test.ts
```

Expected: PASS

- [ ] **Step 9: Commit the locale shell**

```bash
git add apps/web/src/middleware.ts apps/web/src/lib/i18n apps/web/src/components/layout apps/web/src/app apps/web/messages apps/web/package.json
git commit -m "feat: add locale routing and site shell"
```

## Task 3: Model CMS Content Types

**Files:**
- Create: `apps/cms/src/api/site-setting/content-types/site-setting/schema.json`
- Create: `apps/cms/src/api/page-config/content-types/page-config/schema.json`
- Create: `apps/cms/src/api/product/content-types/product/schema.json`
- Create: `apps/cms/src/api/solution/content-types/solution/schema.json`
- Create: `apps/cms/src/api/project/content-types/project/schema.json`
- Create: `apps/cms/src/api/article/content-types/article/schema.json`
- Create: `apps/cms/src/api/video/content-types/video/schema.json`
- Create: `apps/cms/src/api/download/content-types/download/schema.json`
- Create: `apps/cms/config/plugins.ts`

- [ ] **Step 1: Create the site settings single type**

Create `apps/cms/src/api/site-setting/content-types/site-setting/schema.json`:

```json
{
  "kind": "singleType",
  "collectionName": "site_settings",
  "info": {
    "singularName": "site-setting",
    "pluralName": "site-settings",
    "displayName": "Site Setting"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "siteName": { "type": "string", "required": true },
    "defaultLocale": { "type": "enumeration", "enum": ["zh", "en"], "default": "en" },
    "contactEmail": { "type": "email" },
    "contactPhone": { "type": "string" },
    "whatsApp": { "type": "string" },
    "wechat": { "type": "string" }
  }
}
```

- [ ] **Step 2: Create the homepage/page config collection type**

Create `apps/cms/src/api/page-config/content-types/page-config/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "page_configs",
  "info": {
    "singularName": "page-config",
    "pluralName": "page-configs",
    "displayName": "Page Config"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "slug": { "type": "uid", "targetField": "title", "required": true },
    "title": { "type": "string", "required": true },
    "locale": { "type": "enumeration", "enum": ["zh", "en"], "required": true },
    "seoTitle": { "type": "string" },
    "seoDescription": { "type": "text" },
    "modules": { "type": "json", "required": true }
  }
}
```

- [ ] **Step 3: Create product, solution, project, article, video, and download schemas**

For each content type, use this pattern for bilingual fields. Example `apps/cms/src/api/product/content-types/product/schema.json`:

```json
{
  "kind": "collectionType",
  "collectionName": "products",
  "info": {
    "singularName": "product",
    "pluralName": "products",
    "displayName": "Product"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "locale": { "type": "enumeration", "enum": ["zh", "en"], "required": true },
    "title": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "title", "required": true },
    "summary": { "type": "text" },
    "highlights": { "type": "json" },
    "specs": { "type": "json" },
    "heroImage": { "type": "media", "multiple": false, "allowedTypes": ["images"] },
    "gallery": { "type": "media", "multiple": true, "allowedTypes": ["images"] },
    "videoUrl": { "type": "string" },
    "seoTitle": { "type": "string" },
    "seoDescription": { "type": "text" }
  }
}
```

Create matching schemas for:

- `solution` with `painPoints`, `recommendedProducts`, `caseStudySummary`
- `project` with `country`, `industry`, `boilerType`, `resultHighlights`
- `article` with `category`, `excerpt`, `content`
- `video` with `category`, `coverImage`, `videoUrl`, `featuredOnHomepage`
- `download` with `category`, `file`, `locale`, `relatedProductSlug`

- [ ] **Step 4: Enable upload and i18n-safe permissions configuration**

Create `apps/cms/config/plugins.ts`:

```ts
export default () => ({
  upload: {
    config: {
      sizeLimit: 250 * 1024 * 1024,
    },
  },
});
```

- [ ] **Step 5: Build the CMS to verify schemas compile**

Run:

```bash
cd apps/cms
npm run build
```

Expected: Strapi admin build finishes successfully

- [ ] **Step 6: Commit CMS models**

```bash
git add apps/cms/src/api apps/cms/config/plugins.ts
git commit -m "feat: add bainboiler cms content models"
```

## Task 4: Create Web Data Contracts And CMS Client

**Files:**
- Create: `apps/web/src/types/cms.ts`
- Create: `apps/web/src/lib/cms/fetch-json.ts`
- Create: `apps/web/src/lib/cms/mappers/homepage.ts`
- Create: `apps/web/src/lib/cms/mappers/__tests__/homepage.test.ts`
- Create: `apps/web/src/lib/cms/get-homepage.ts`
- Test: `apps/web/src/lib/cms/mappers/__tests__/homepage.test.ts`

- [ ] **Step 1: Write the failing homepage mapper test**

Create `apps/web/src/lib/cms/mappers/__tests__/homepage.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { mapHomepage } from "../homepage";

describe("mapHomepage", () => {
  it("maps hero and stats blocks from page config", () => {
    const result = mapHomepage({
      title: "Home",
      locale: "en",
      modules: [
        { key: "hero-video", headline: "Industrial Boiler Systems", subheadline: "Premium steam boiler solutions" },
        { key: "brand-stats", items: [{ label: "Countries", value: "30+" }] }
      ]
    });

    expect(result.hero.headline).toBe("Industrial Boiler Systems");
    expect(result.stats[0].value).toBe("30+");
  });
});
```

- [ ] **Step 2: Run the mapper test and confirm failure**

Run:

```bash
cd apps/web
npx vitest run src/lib/cms/mappers/__tests__/homepage.test.ts
```

Expected: FAIL with `Cannot find module '../homepage'`

- [ ] **Step 3: Implement the contracts and mapper**

Create `apps/web/src/types/cms.ts`:

```ts
export type HomepageModule =
  | { key: "hero-video"; headline: string; subheadline: string; primaryCta?: string; secondaryCta?: string; videoUrl?: string; posterUrl?: string }
  | { key: "brand-stats"; items: Array<{ label: string; value: string }> };

export type HomepageConfig = {
  title: string;
  locale: "zh" | "en";
  modules: HomepageModule[];
};

export type HomepageViewModel = {
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    videoUrl?: string;
    posterUrl?: string;
  };
  stats: Array<{ label: string; value: string }>;
};
```

Create `apps/web/src/lib/cms/mappers/homepage.ts`:

```ts
import type { HomepageConfig, HomepageViewModel } from "@/types/cms";

export function mapHomepage(config: HomepageConfig): HomepageViewModel {
  const heroModule = config.modules.find((module) => module.key === "hero-video");
  const statsModule = config.modules.find((module) => module.key === "brand-stats");

  return {
    hero: {
      headline: heroModule?.key === "hero-video" ? heroModule.headline : "",
      subheadline: heroModule?.key === "hero-video" ? heroModule.subheadline : "",
      primaryCta: heroModule?.key === "hero-video" ? heroModule.primaryCta ?? "Get Quote" : "Get Quote",
      secondaryCta: heroModule?.key === "hero-video" ? heroModule.secondaryCta ?? "Watch Video" : "Watch Video",
      videoUrl: heroModule?.key === "hero-video" ? heroModule.videoUrl : undefined,
      posterUrl: heroModule?.key === "hero-video" ? heroModule.posterUrl : undefined,
    },
    stats: statsModule?.key === "brand-stats" ? statsModule.items : [],
  };
}
```

Create `apps/web/src/lib/cms/fetch-json.ts`:

```ts
export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
```

- [ ] **Step 4: Add the homepage fetch function**

Create `apps/web/src/lib/cms/get-homepage.ts`:

```ts
import { fetchJson } from "./fetch-json";
import { mapHomepage } from "./mappers/homepage";
import type { HomepageConfig } from "@/types/cms";

export async function getHomepage(locale: "zh" | "en") {
  const baseUrl = process.env.CMS_BASE_URL;
  const config = await fetchJson<HomepageConfig>(`${baseUrl}/api/page-configs/home-${locale}`);
  return mapHomepage(config);
}
```

- [ ] **Step 5: Run the mapper test again**

Run:

```bash
cd apps/web
npx vitest run src/lib/cms/mappers/__tests__/homepage.test.ts
```

Expected: PASS

- [ ] **Step 6: Commit the CMS data layer**

```bash
git add apps/web/src/types apps/web/src/lib/cms
git commit -m "feat: add web cms contracts and homepage mapper"
```

## Task 5: Implement The Premium Homepage Modules

**Files:**
- Create: `apps/web/src/modules/hero-video/index.tsx`
- Create: `apps/web/src/modules/hero-video/README.md`
- Create: `apps/web/src/modules/brand-stats/index.tsx`
- Create: `apps/web/src/modules/company-intro/index.tsx`
- Create: `apps/web/src/modules/product-categories/index.tsx`
- Create: `apps/web/src/modules/industry-solutions/index.tsx`
- Create: `apps/web/src/modules/project-showcase/index.tsx`
- Create: `apps/web/src/modules/certificates-export/index.tsx`
- Create: `apps/web/src/modules/featured-video/index.tsx`
- Create: `apps/web/src/modules/latest-news/index.tsx`
- Create: `apps/web/src/modules/contact-cta/index.tsx`
- Create: `apps/web/src/app/[locale]/page.tsx`
- Test: `apps/web/src/modules/hero-video/hero-video.test.tsx`

- [ ] **Step 1: Write the failing homepage hero render test**

Create `apps/web/src/modules/hero-video/hero-video.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroVideo } from "./index";

describe("HeroVideo", () => {
  it("renders the main headline and CTA buttons", () => {
    render(
      <HeroVideo
        headline="Industrial Boiler Systems"
        subheadline="Premium steam and hot water boiler solutions"
        primaryCta="Get Quote"
        secondaryCta="Watch Video"
      />
    );

    expect(screen.getByText("Industrial Boiler Systems")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Get Quote" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Watch Video" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the hero test to verify failure**

Run:

```bash
cd apps/web
npx vitest run src/modules/hero-video/hero-video.test.tsx
```

Expected: FAIL with missing `./index`

- [ ] **Step 3: Implement the hero and stat modules**

Create `apps/web/src/modules/hero-video/index.tsx`:

```tsx
type HeroVideoProps = {
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  videoUrl?: string;
  posterUrl?: string;
};

export function HeroVideo(props: HeroVideoProps) {
  return (
    <section className="relative isolate min-h-[90vh] overflow-hidden bg-slate-950 text-white">
      {props.videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={props.posterUrl}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        >
          <source src={props.videoUrl} type="video/mp4" />
        </video>
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/40" />
      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-end px-6 pb-20 pt-32">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm tracking-[0.3em] text-sky-300">INDUSTRIAL THERMAL SYSTEMS</p>
          <h1 className="text-5xl font-semibold leading-tight md:text-7xl">{props.headline}</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200">{props.subheadline}</p>
          <div className="mt-8 flex gap-4">
            <a href="#contact-cta" className="rounded bg-sky-500 px-6 py-3 font-medium text-slate-950">{props.primaryCta}</a>
            <a href="#featured-video" className="rounded border border-white/30 px-6 py-3">{props.secondaryCta}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

Create `apps/web/src/modules/brand-stats/index.tsx`:

```tsx
export function BrandStats({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="border-l border-slate-200 pl-4">
            <p className="text-3xl font-semibold text-slate-900">{item.value}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement the remaining homepage modules as isolated sections**

For each module folder, create one `index.tsx` and one concise `README.md`. Example `apps/web/src/modules/company-intro/index.tsx`:

```tsx
export function CompanyIntro() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm tracking-[0.22em] text-sky-700">ABOUT BAIN BOILER</p>
          <h2 className="mt-4 text-4xl font-semibold text-slate-950">Advanced boiler engineering backed by manufacturing strength.</h2>
        </div>
        <p className="text-lg leading-8 text-slate-600">
          Shanghai Baien Boiler Co., Ltd. serves domestic and international customers with steam,
          hot water, and thermal oil systems for industrial applications.
        </p>
      </div>
    </section>
  );
}
```

Create `apps/web/src/modules/hero-video/README.md`:

```md
# hero-video

- Page: homepage
- Purpose: render the premium first screen with background video and primary conversion CTA
- CMS fields: `headline`, `subheadline`, `primaryCta`, `secondaryCta`, `videoUrl`, `posterUrl`
- Replace this module by editing only `src/modules/hero-video`
```

Repeat the same isolation pattern for:

- `product-categories`
- `industry-solutions`
- `project-showcase`
- `certificates-export`
- `featured-video`
- `latest-news`
- `contact-cta`

- [ ] **Step 5: Compose the homepage page file**

Create `apps/web/src/app/[locale]/page.tsx`:

```tsx
import { getHomepage } from "@/lib/cms/get-homepage";
import { HeroVideo } from "@/modules/hero-video";
import { BrandStats } from "@/modules/brand-stats";
import { CompanyIntro } from "@/modules/company-intro";

type PageProps = {
  params: Promise<{ locale: "zh" | "en" }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const homepage = await getHomepage(locale);

  return (
    <>
      <HeroVideo {...homepage.hero} />
      <BrandStats items={homepage.stats} />
      <CompanyIntro />
    </>
  );
}
```

- [ ] **Step 6: Run the hero test and lint**

Run:

```bash
cd apps/web
npx vitest run src/modules/hero-video/hero-video.test.tsx
npm run lint
```

Expected: test PASS and lint clean

- [ ] **Step 7: Commit the homepage**

```bash
git add apps/web/src/modules apps/web/src/app/[locale]/page.tsx
git commit -m "feat: implement bainboiler homepage modules"
```

## Task 6: Implement Core Content Pages

**Files:**
- Create: `apps/web/src/app/[locale]/about/page.tsx`
- Create: `apps/web/src/app/[locale]/products/page.tsx`
- Create: `apps/web/src/app/[locale]/products/[slug]/page.tsx`
- Create: `apps/web/src/app/[locale]/solutions/page.tsx`
- Create: `apps/web/src/app/[locale]/projects/page.tsx`
- Create: `apps/web/src/app/[locale]/news/page.tsx`
- Create: `apps/web/src/app/[locale]/videos/page.tsx`
- Create: `apps/web/src/app/[locale]/downloads/page.tsx`
- Create: `apps/web/src/app/[locale]/contact/page.tsx`
- Create: `apps/web/src/app/[locale]/privacy-policy/page.tsx`
- Create: `apps/web/src/app/[locale]/terms/page.tsx`
- Create: `apps/web/src/lib/cms/get-list-page.ts`
- Test: `apps/web/src/lib/cms/mappers/__tests__/content-list.test.ts`

- [ ] **Step 1: Write the failing content list mapper test**

Create `apps/web/src/lib/cms/mappers/__tests__/content-list.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { mapContentList } from "../content-list";

describe("mapContentList", () => {
  it("maps API records into card items", () => {
    const result = mapContentList(
      [
        { title: "WNS Steam Boiler", slug: "wns-steam-boiler", summary: "High efficiency steam system" }
      ],
      "/products"
    );

    expect(result[0]).toEqual({
      title: "WNS Steam Boiler",
      href: "/products/wns-steam-boiler",
      summary: "High efficiency steam system"
    });
  });
});
```

- [ ] **Step 2: Run the content list test to verify failure**

Run:

```bash
cd apps/web
npx vitest run src/lib/cms/mappers/__tests__/content-list.test.ts
```

Expected: FAIL with missing mapper

- [ ] **Step 3: Implement the reusable content list mapper**

Create `apps/web/src/lib/cms/mappers/content-list.ts`:

```ts
type RecordItem = { title: string; slug: string; summary?: string | null };

export function mapContentList(records: RecordItem[], basePath: string) {
  return records.map((record) => ({
    title: record.title,
    href: `${basePath}/${record.slug}`,
    summary: record.summary ?? "",
  }));
}
```

- [ ] **Step 4: Create the first three content pages**

Create `apps/web/src/app/[locale]/about/page.tsx`:

```tsx
export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="text-5xl font-semibold text-slate-950">About BAIN BOILER</h1>
      <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600">
        We build industrial boiler systems for domestic and global clients with a focus on reliability,
        efficiency, and long-term thermal performance.
      </p>
    </main>
  );
}
```

Create `apps/web/src/app/[locale]/products/page.tsx`:

```tsx
export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="text-5xl font-semibold text-slate-950">Products</h1>
      <p className="mt-6 text-slate-600">Steam boilers, hot water boilers, thermal oil systems, and custom equipment.</p>
    </main>
  );
}
```

Create `apps/web/src/app/[locale]/contact/page.tsx`:

```tsx
export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="text-5xl font-semibold text-slate-950">Contact</h1>
      <p className="mt-6 text-slate-600">Use the inquiry form, email, phone, WhatsApp, or WeChat to reach our team.</p>
    </main>
  );
}
```

- [ ] **Step 5: Repeat the same pattern for the remaining pages**

Create equivalent page skeletons for:

- `solutions`
- `projects`
- `news`
- `videos`
- `downloads`
- `privacy-policy`
- `terms`
- `products/[slug]`

Each page should export a server component with a page title and one lead paragraph so routes exist early.

- [ ] **Step 6: Run tests and build**

Run:

```bash
cd apps/web
npx vitest run src/lib/cms/mappers/__tests__/content-list.test.ts
npm run build
```

Expected: PASS and a successful Next.js production build

- [ ] **Step 7: Commit the content pages**

```bash
git add apps/web/src/app apps/web/src/lib/cms/mappers/content-list.ts
git commit -m "feat: add core bilingual content routes"
```

## Task 7: Build Inquiry Flow And Validation

**Files:**
- Create: `apps/web/src/lib/validation/inquiry.ts`
- Create: `apps/web/src/lib/validation/__tests__/inquiry.test.ts`
- Create: `apps/web/src/components/forms/inquiry-form.tsx`
- Create: `apps/web/src/app/api/inquiry/route.ts`
- Modify: `apps/web/src/modules/contact-cta/index.tsx`
- Test: `apps/web/src/lib/validation/__tests__/inquiry.test.ts`

- [ ] **Step 1: Write the failing inquiry validation test**

Create `apps/web/src/lib/validation/__tests__/inquiry.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { inquirySchema } from "../inquiry";

describe("inquirySchema", () => {
  it("accepts a valid inquiry payload", () => {
    const parsed = inquirySchema.safeParse({
      name: "Alice",
      email: "alice@example.com",
      country: "Indonesia",
      boilerType: "Steam Boiler",
      message: "Need 4 ton steam boiler quotation",
    });

    expect(parsed.success).toBe(true);
  });

  it("rejects empty message", () => {
    const parsed = inquirySchema.safeParse({
      name: "Alice",
      email: "alice@example.com",
      country: "Indonesia",
      boilerType: "Steam Boiler",
      message: "",
    });

    expect(parsed.success).toBe(false);
  });
});
```

- [ ] **Step 2: Run the inquiry test and confirm failure**

Run:

```bash
cd apps/web
npx vitest run src/lib/validation/__tests__/inquiry.test.ts
```

Expected: FAIL with missing schema file

- [ ] **Step 3: Implement the schema and form**

Create `apps/web/src/lib/validation/inquiry.ts`:

```ts
import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  country: z.string().min(2),
  boilerType: z.string().min(2),
  message: z.string().min(10),
  website: z.string().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
```

Create `apps/web/src/components/forms/inquiry-form.tsx`:

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { inquirySchema, type InquiryInput } from "@/lib/validation/inquiry";

export function InquiryForm() {
  const { register, handleSubmit, reset } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
  });

  async function onSubmit(values: InquiryInput) {
    await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <input {...register("name")} placeholder="Name" className="border px-4 py-3" />
      <input {...register("email")} placeholder="Email" className="border px-4 py-3" />
      <input {...register("country")} placeholder="Country" className="border px-4 py-3" />
      <input {...register("boilerType")} placeholder="Boiler Type" className="border px-4 py-3" />
      <textarea {...register("message")} placeholder="Project details" className="min-h-32 border px-4 py-3" />
      <input {...register("website")} tabIndex={-1} autoComplete="off" className="hidden" />
      <button type="submit" className="rounded bg-sky-500 px-5 py-3 font-medium text-slate-950">Send Inquiry</button>
    </form>
  );
}
```

- [ ] **Step 4: Implement the API route with honeypot spam guard**

Create `apps/web/src/app/api/inquiry/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation/inquiry";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const parsed = inquirySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  console.log("Inquiry received", parsed.data);

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 5: Wire the form into the CTA module**

Modify `apps/web/src/modules/contact-cta/index.tsx`:

```tsx
import { InquiryForm } from "@/components/forms/inquiry-form";

export function ContactCta() {
  return (
    <section id="contact-cta" className="bg-slate-950 py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm tracking-[0.24em] text-sky-300">GET A QUOTE</p>
          <h2 className="mt-4 text-4xl font-semibold">Talk to the BAIN BOILER team.</h2>
        </div>
        <InquiryForm />
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Run validation tests and lint**

Run:

```bash
cd apps/web
npx vitest run src/lib/validation/__tests__/inquiry.test.ts
npm run lint
```

Expected: PASS and lint clean

- [ ] **Step 7: Commit the inquiry flow**

```bash
git add apps/web/src/lib/validation apps/web/src/components/forms apps/web/src/app/api/inquiry apps/web/src/modules/contact-cta
git commit -m "feat: add validated inquiry flow"
```

## Task 8: Finish SEO, Metadata, And Deployment Readiness

**Files:**
- Create: `apps/web/src/lib/seo/build-metadata.ts`
- Create: `apps/web/src/lib/seo/__tests__/build-metadata.test.ts`
- Modify: `apps/web/src/app/[locale]/layout.tsx`
- Create: `apps/web/.env.example`
- Create: `README.md`
- Create: `docs/deployment.md`
- Test: `apps/web/src/lib/seo/__tests__/build-metadata.test.ts`

- [ ] **Step 1: Write the failing metadata builder test**

Create `apps/web/src/lib/seo/__tests__/build-metadata.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildMetadata } from "../build-metadata";

describe("buildMetadata", () => {
  it("creates alternate locale links", () => {
    const metadata = buildMetadata({
      locale: "en",
      pathname: "/products",
      title: "Products",
      description: "Industrial boiler systems",
    });

    expect(metadata.alternates?.languages?.["zh-CN"]).toBe("https://www.bainboiler.com/zh/products");
    expect(metadata.alternates?.languages?.en).toBe("https://www.bainboiler.com/en/products");
  });
});
```

- [ ] **Step 2: Run the metadata test and confirm failure**

Run:

```bash
cd apps/web
npx vitest run src/lib/seo/__tests__/build-metadata.test.ts
```

Expected: FAIL with missing metadata builder

- [ ] **Step 3: Implement the metadata helper**

Create `apps/web/src/lib/seo/build-metadata.ts`:

```ts
import type { Metadata } from "next";

type Input = {
  locale: "zh" | "en";
  pathname: string;
  title: string;
  description: string;
};

export function buildMetadata(input: Input): Metadata {
  const base = "https://www.bainboiler.com";
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: `${base}/${input.locale}${input.pathname}`,
      languages: {
        "zh-CN": `${base}/zh${input.pathname}`,
        en: `${base}/en${input.pathname}`,
      },
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url: `${base}/${input.locale}${input.pathname}`,
    },
  };
}
```

- [ ] **Step 4: Apply metadata in the locale layout**

Modify `apps/web/src/app/[locale]/layout.tsx` to export `generateMetadata`:

```tsx
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { buildMetadata } from "@/lib/seo/build-metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: "zh" | "en" }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    pathname: "",
    title: locale === "zh" ? "上海百恩锅炉有限公司" : "BAIN BOILER",
    description: locale === "zh" ? "面向全球客户的工业锅炉系统与热能解决方案。" : "Industrial boiler systems and thermal solutions for global clients.",
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: "zh" | "en" }>;
}) {
  const { locale } = await params;

  return (
    <>
      <SiteHeader locale={locale} />
      {children}
      <SiteFooter locale={locale} />
    </>
  );
}
```

- [ ] **Step 5: Add environment and deployment docs**

Create `apps/web/.env.example`:

```env
CMS_BASE_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=https://www.bainboiler.com
```

Create `docs/deployment.md`:

```md
# Deployment

## Web

- Build: `npm run build:web`
- Start: `npm run start --workspace web`
- Required env: `CMS_BASE_URL`, `NEXT_PUBLIC_SITE_URL`

## CMS

- Build: `npm run build:cms`
- Start: `npm run start --workspace cms`
- Put CMS behind `cms.bainboiler.com`
- Restrict admin access with strong credentials and HTTPS
```

Create `README.md`:

```md
# bainboiler

## Apps

- `apps/web`: bilingual Next.js corporate website
- `apps/cms`: Strapi content management backend

## Commands

- `npm run dev:web`
- `npm run dev:cms`
- `npm run test:web`
- `npm run build:web`
- `npm run build:cms`
```

- [ ] **Step 6: Run the metadata test and final verification**

Run:

```bash
cd apps/web
npx vitest run src/lib/seo/__tests__/build-metadata.test.ts
npm run build
```

Expected: PASS and successful production build

- [ ] **Step 7: Commit the release-ready setup**

```bash
git add apps/web/src/lib/seo apps/web/src/app/[locale]/layout.tsx apps/web/.env.example README.md docs/deployment.md
git commit -m "feat: finalize seo and deployment readiness"
```

## Coverage Check

- Spec architecture is covered by Tasks 1 to 4.
- Homepage and modular UI requirements are covered by Task 5.
- Core bilingual content pages are covered by Task 6.
- Inquiry conversion requirements are covered by Task 7.
- SEO, locale alternates, and deployment readiness are covered by Task 8.
- CMS structure for non-technical editors is covered by Task 3, with data normalization in Task 4.

## Notes For Execution

- Keep each module folder isolated and avoid moving shared logic into page files.
- When connecting to the real CMS API, adapt mapper functions instead of leaking raw Strapi payloads into UI components.
- Use real company assets as soon as available: logo, boiler imagery, certificates, brochures, and compressed homepage video.
- If media assets are not ready during early implementation, stub them with local static files under `apps/web/public/` rather than external placeholders.
