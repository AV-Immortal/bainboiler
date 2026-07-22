type ProductCategoriesProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: Array<{
    title: string;
    description: string;
    href?: string | null;
    meta?: string | null;
  }>;
  locale: "zh" | "en";
};

export function ProductCategories(props: ProductCategoriesProps) {
  const defaultHref = `/${props.locale}/products`;

  return (
    <section className="bg-slate-100 px-6 py-24 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.34em] text-sky-700">
            {props.eyebrow}
          </p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">
            {props.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">{props.description}</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {props.items.map((item) => (
            <a
              key={item.title}
              href={item.href ?? defaultHref}
              className="group block border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-sky-700">
                {item.meta ?? "Category"}
              </p>
              <h3 className="mt-5 text-2xl font-semibold text-slate-950">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {item.description}
              </p>
              <p className="mt-8 text-sm font-semibold tracking-[0.12em] text-slate-950">
                Explore
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
