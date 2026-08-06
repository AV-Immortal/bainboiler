import Link from "next/link";
import { getMessages } from "@/i18n/messages";
import type { AppLocale } from "@/i18n/routing";
import { LocaleSwitcher } from "./locale-switcher";

export function SiteHeader({ locale }: { locale: AppLocale }) {
  const messages = getMessages(locale);

  return (
    <header className="anim-fade-in absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-slate-950/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-base font-semibold tracking-[0.2em] text-white transition hover:text-sky-300"
        >
          {locale === "zh" ? "百恩锅炉" : "BAIN BOILER"}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
          <Link
            href={`/${locale}/about`}
            className="transition hover:text-white"
          >
            {messages.nav.about}
          </Link>
          <Link
            href={`/${locale}/products`}
            className="transition hover:text-white"
          >
            {messages.nav.products}
          </Link>
          <Link
            href={`/${locale}/solutions`}
            className="transition hover:text-white"
          >
            {messages.nav.solutions}
          </Link>
          <Link
            href={`/${locale}/projects`}
            className="transition hover:text-white"
          >
            {messages.nav.projects}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="rounded-sm border border-sky-400/40 px-4 py-2 text-sky-300 transition hover:border-sky-300 hover:bg-sky-400/10"
          >
            {messages.nav.contact}
          </Link>
        </nav>
        <LocaleSwitcher locale={locale} labels={messages.localeSwitcher} />
      </div>
    </header>
  );
}
