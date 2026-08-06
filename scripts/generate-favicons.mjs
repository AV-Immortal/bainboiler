/**
 * 生成圆角 favicon webp 多尺寸
 *
 * 用法：node scripts/generate-favicons.mjs
 *
 * 输入：apps/web/public/brand/logo.webp (959x959)
 * 输出：apps/web/public/favicon-{16,32,180,512}.webp
 *       apps/web/public/brand/logo.webp 保持不动（分享卡用）
 *
 * 处理：缩放到目标尺寸 + 加圆角遮罩 + 转 webp（透明背景）
 */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const INPUT = path.join(ROOT, "apps/web/public/brand/logo.webp");
const OUT_DIR = path.join(ROOT, "apps/web/public");

const SIZES = [
  { size: 16, name: "favicon-16.webp" },
  { size: 32, name: "favicon-32.webp" },
  { size: 180, name: "apple-touch-icon-180.webp" },
  { size: 512, name: "icon-512.webp" },
];

/**
 * 生成圆角 SVG 遮罩
 * 圆角半径 = 尺寸的 22%（参考 iOS 标准）
 */
function roundedMask(size) {
  const radius = Math.round(size * 0.22);
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/>
    </svg>
  `);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  for (const { size, name } of SIZES) {
    const mask = roundedMask(size);
    const out = path.join(OUT_DIR, name);

    await sharp(INPUT)
      .resize(size, size, { fit: "cover" })
      .composite([{ input: mask, blend: "dest-in" }])
      .webp({ quality: 90, alphaQuality: 100, lossless: false })
      .toFile(out);

    const stat = await import("node:fs/promises").then((m) => m.stat(out));
    console.log(`  ✓ ${name}  ${size}×${size}  ${stat.size}B`);
  }

  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
