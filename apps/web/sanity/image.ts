import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { getSanityEnv } from "./env";

const builder = imageUrlBuilder({
  projectId: getSanityEnv().projectId,
  dataset: getSanityEnv().dataset,
});

/**
 * 构造 Sanity 图片 URL。
 *
 * 用法：
 *   urlFor(product.heroImage?.image).width(1200).fit("max").auto("format").url()
 *
 * 配合 next.config.ts 的 images.remotePatterns（cdn.sanity.io）。
 */
export function urlFor(source: SanityImageSource | undefined | null) {
  if (!source) {
    return {
      width: () => ({
        fit: () => ({
          auto: () => ({
            url: () => "",
          }),
        }),
      }),
      url: () => "",
    };
  }
  return builder.image(source);
}
