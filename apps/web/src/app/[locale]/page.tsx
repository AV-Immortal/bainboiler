import { notFound } from "next/navigation";
import { getMessages } from "@/i18n/messages";
import { isValidLocale } from "@/i18n/routing";

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale);

  return (
    <section className="flex min-h-screen items-center bg-slate-950 px-6 pt-24 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">BAIN BOILER</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">{messages.home.heroTitle}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{messages.home.heroDescription}</p>
      </div>
    </section>
  );
}
