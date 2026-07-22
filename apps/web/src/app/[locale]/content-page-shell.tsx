import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type AppLocale } from "@/i18n/routing";
import type { ContentListItem } from "@/types/cms";

type LocaleParams = Promise<{ locale: string }>;

type ContentPageShellProps = {
  title: string;
  description: string;
  items?: ContentListItem[];
};

export async function resolveRouteLocale(
  params: LocaleParams,
): Promise<AppLocale> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return locale;
}

export function ContentPageShell({
  title,
  description,
  items = [],
}: ContentPageShellProps) {
  return (
    <section className="bg-white px-6 py-24 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">{description}</p>
        </div>
        {items.length > 0 ? (
          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-3xl border border-slate-200 p-8 transition hover:border-slate-400 hover:shadow-sm"
              >
                <h2 className="text-2xl font-semibold text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  {item.summary}
                </p>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
