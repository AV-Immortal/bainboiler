import Link from "next/link";
import { getMessages } from "@/i18n/messages";
import type { AppLocale } from "@/i18n/routing";

export function SiteFooter({ locale }: { locale: AppLocale }) {
  const messages = getMessages(locale);

  return (
    <footer className="border-t border-white/10 bg-slate-950 px-6 py-12 text-sm text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="font-semibold text-white">{messages.footer.companyName}</p>
          <p>{messages.footer.brand}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href={`/${locale}/privacy-policy`}>{messages.footer.privacyPolicy}</Link>
          <Link href={`/${locale}/terms`}>{messages.footer.terms}</Link>
        </div>
      </div>
    </footer>
  );
}
