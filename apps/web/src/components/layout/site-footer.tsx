import Link from "next/link";
import { getMessages } from "@/i18n/messages";
import type { AppLocale } from "@/i18n/routing";

export function SiteFooter({ locale }: { locale: AppLocale }) {
  const messages = getMessages(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
      {/* 顶部主区：4 列 */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* 1. 品牌介绍 */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="block text-xl font-semibold tracking-[0.18em] text-white transition hover:text-sky-300"
            >
              {messages.footer.brand}
            </Link>
            <p className="mt-3 text-xs uppercase tracking-[0.28em] text-sky-300">
              {messages.footer.companyTagline}
            </p>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              {messages.footer.companyDescription}
            </p>
            <p className="mt-6 text-xs leading-6 text-slate-500">
              {messages.footer.companyName}
            </p>
          </div>

          {/* 2. 快速链接 */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white">
              {messages.footer.quickLinks}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <FooterLink href={`/${locale}/products`}>
                {messages.nav.products}
              </FooterLink>
              <FooterLink href={`/${locale}/solutions`}>
                {messages.nav.solutions}
              </FooterLink>
              <FooterLink href={`/${locale}/projects`}>
                {messages.nav.projects}
              </FooterLink>
              <FooterLink href={`/${locale}/about`}>
                {messages.nav.about}
              </FooterLink>
              <FooterLink href={`/${locale}/contact`}>
                {messages.nav.contact}
              </FooterLink>
            </ul>
          </div>

          {/* 3. 资源中心 */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white">
              {messages.footer.resources}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <FooterLink href={`/${locale}/videos`}>
                {locale === "zh" ? "视频中心" : "Videos"}
              </FooterLink>
              <FooterLink href={`/${locale}/downloads`}>
                {locale === "zh" ? "下载中心" : "Downloads"}
              </FooterLink>
              <FooterLink href={`/${locale}/news`}>
                {locale === "zh" ? "新闻动态" : "News"}
              </FooterLink>
            </ul>
          </div>

          {/* 4. 联系方式 */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white">
              {messages.footer.contact}
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <ContactLine
                label={messages.footer.emailLabel}
                value={messages.footer.contactEmail}
                href={`mailto:${messages.footer.contactEmail}`}
                icon="mail"
              />
              <ContactLine
                label={messages.footer.phoneLabel}
                value={messages.footer.contactPhone}
                href={`tel:${messages.footer.contactPhone.replace(/[\s-]/g, "")}`}
                icon="phone"
              />
              <ContactLine
                label={messages.footer.whatsappLabel}
                value={messages.footer.contactWhatsapp}
                href={`https://wa.me/${messages.footer.contactWhatsapp.replace(/[^\d+]/g, "")}`}
                icon="whatsapp"
              />
              <ContactLine
                label={messages.footer.wechatLabel}
                value={messages.footer.contactWechat}
                icon="wechat"
              />
              <li className="space-y-1">
                <span className="block text-xs uppercase tracking-[0.22em] text-slate-500">
                  {messages.footer.addressLabel}
                </span>
                <span className="block text-sm leading-6 text-slate-300">
                  {messages.footer.contactAddress}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 底部分隔线 + 版权条 */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              © {year} {messages.footer.copyright}
            </span>
            <span aria-hidden>·</span>
            <span>{messages.footer.icpPlaceholder}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link
              href={`/${locale}/privacy-policy`}
              className="transition hover:text-sky-300"
            >
              {messages.footer.privacyPolicy}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="transition hover:text-sky-300"
            >
              {messages.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                     */
/* ------------------------------------------------------------------ */

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="inline-flex items-center text-slate-300 transition hover:text-sky-300"
      >
        <span
          aria-hidden
          className="mr-2 inline-block h-px w-3 bg-slate-600 transition-all group-hover:w-5 group-hover:bg-sky-300"
        />
        {children}
      </Link>
    </li>
  );
}

type IconKey = "mail" | "phone" | "whatsapp" | "wechat";

function ContactLine({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  icon: IconKey;
}) {
  const content = (
    <span className="flex items-start gap-3">
      <ContactIcon icon={icon} />
      <span className="min-w-0 flex-1">
        <span className="block text-xs uppercase tracking-[0.22em] text-slate-500">
          {label}
        </span>
        <span className="mt-1 block break-all text-sm leading-6 text-slate-200">
          {value}
        </span>
      </span>
    </span>
  );

  return (
    <li>
      {href ? (
        <a
          href={href}
          className="block transition hover:text-sky-300"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}

function ContactIcon({ icon }: { icon: IconKey }) {
  // 紧凑的 inline SVG 图标，16×16，工业风格（线性、细描边、sky-300）
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "mt-1 shrink-0 text-sky-300",
  };

  switch (icon) {
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M20 12a8 8 0 1 1-3.2-6.4L20 4l-1.3 3.2A8 8 0 0 1 20 12z" />
          <path d="M9 9c.5-.6 1.3-.6 1.7 0l.6 1c.3.4.2 1-.2 1.4l-.4.4c.6 1 1.5 1.9 2.5 2.5l.4-.4c.4-.4 1-.5 1.4-.2l1 .6c.6.4.6 1.2 0 1.7L15 17c-3.5 0-7-3.5-7-7l1-1z" />
        </svg>
      );
    case "wechat":
      return (
        <svg {...common}>
          <ellipse cx="9" cy="10" rx="6" ry="4.5" />
          <ellipse cx="15" cy="14.5" rx="5" ry="4" />
          <circle cx="7.5" cy="9.5" r="0.6" fill="currentColor" />
          <circle cx="10.5" cy="9.5" r="0.6" fill="currentColor" />
        </svg>
      );
  }
}
