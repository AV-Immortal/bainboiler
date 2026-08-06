import { defineType, defineField } from "sanity";

export const heroVideo = defineType({
  name: "homepage.heroVideo",
  title: "Hero Video",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow 文字（可选）",
      type: "localeString",
    }),
    defineField({
      name: "headline",
      title: "主标题",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subheadline",
      title: "副标题",
      type: "localeText",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "primaryCta",
      title: "主按钮文字",
      type: "localeString",
    }),
    defineField({
      name: "primaryCtaHref",
      title: "主按钮链接",
      type: "string",
      description: "默认 /<locale>/contact",
    }),
    defineField({
      name: "secondaryCta",
      title: "次按钮文字",
      type: "localeString",
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "次按钮链接",
      type: "string",
      description: "默认跳到 #featured-video",
    }),
    defineField({
      name: "videoUrl",
      title: "视频地址（mp4 直链或外链）",
      type: "url",
    }),
    defineField({
      name: "poster",
      title: "视频封面图",
      type: "imageWithAlt",
    }),

    /* ---------------- 背景配置（可灵活切换） ---------------- */

    defineField({
      name: "backgroundType",
      title: "Hero 背景类型",
      type: "string",
      description:
        "选择 hero 区域的背景渲染方式。image 模式需要上传背景图；color 用纯色；gradient 用渐变。",
      options: {
        list: [
          { title: "🎨 纯色（color）", value: "color" },
          { title: "🌅 渐变（gradient）", value: "gradient" },
          { title: "🖼  图片（image）", value: "image" },
        ],
        layout: "radio",
      },
      initialValue: "color",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "backgroundColor",
      title: "背景色（backgroundType=color 时使用）",
      type: "string",
      description: "HEX 颜色值，例如 #0F3460（深蓝）",
      hidden: ({ parent }) => parent?.backgroundType !== "color",
    }),

    defineField({
      name: "backgroundGradient",
      title: "背景渐变（backgroundType=gradient 时使用）",
      type: "object",
      hidden: ({ parent }) => parent?.backgroundType !== "gradient",
      fields: [
        defineField({
          name: "from",
          title: "起始色",
          type: "string",
          description: "HEX 颜色值",
        }),
        defineField({
          name: "to",
          title: "结束色",
          type: "string",
          description: "HEX 颜色值",
        }),
        defineField({
          name: "angle",
          title: "渐变角度（度数）",
          type: "number",
          initialValue: 135,
        }),
      ],
    }),

    defineField({
      name: "backgroundImage",
      title: "背景图（backgroundType=image 时使用）",
      type: "imageWithAlt",
      description: "推荐尺寸 1920×1080 或更大，≤ 500KB 的 webp/jpg",
      hidden: ({ parent }) => parent?.backgroundType !== "image",
    }),

    defineField({
      name: "backgroundOverlayOpacity",
      title: "背景图暗化蒙层（0=无蒙层, 80=几乎全黑）",
      type: "number",
      validation: (r) => r.min(0).max(100),
      initialValue: 50,
      description: "在背景图上叠加深色蒙层，提升前景文字可读性。",
      hidden: ({ parent }) => parent?.backgroundType !== "image",
    }),
  ],
  preview: {
    select: {
      title: "headline.zh",
      subtitle: "headline.en",
      bgType: "backgroundType",
    },
    prepare: ({ title, subtitle, bgType }) => ({
      title: `🎬 Hero · ${title ?? "无标题"} · ${bgType ?? "color"}`,
      subtitle,
    }),
  },
});
