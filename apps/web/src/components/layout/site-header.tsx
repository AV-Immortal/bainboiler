import Link from "next/link";
import { getMessages } from "@/i18n/messages";
import type { AppLocale } from "@/i18n/routing";
import { LocaleSwitcher } from "./locale-switcher";

export function SiteHeader({ locale }: { locale: AppLocale }) {
  const messages = getMessages(locale);

  return (
    <header className="absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-slate-950/40 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
        <Link href={`/${locale}`} className="text-lg font-semibold tracking-[0.18em] text-white">
          BAIN BOILER
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
          <Link href={`/${locale}/about`}>{messages.nav.about}</Link>
          <Link href={`/${locale}/products`}>{messages.nav.products}</Link>
          <Link href={`/${locale}/solutions`}>{messages.nav.solutions}</Link>
          <Link href={`/${locale}/projects`}>{messages.nav.projects}</Link>
          <Link href={`/${locale}/contact`}>{messages.nav.contact}</Link>
        </nav>
        <LocaleSwitcher locale={locale} labels={messages.localeSwitcher} />
      </div>
    </header>
  );
}
