import { defineType, defineField } from "sanity";

export const brandStats = defineType({
  name: "homepage.brandStats",
  title: "Brand Stats",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "统计项",
      type: "array",
      of: [{ type: "statItem" }],
      validation: (r) => r.min(2).max(8),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "📊 Brand Stats",
      subtitle: `${items?.length ?? 0} 项`,
    }),
  },
});
