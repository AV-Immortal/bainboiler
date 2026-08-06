#!/usr/bin/env node
/**
 * Pre-compress all files in dist/ to .gz
 * Runs after `sanity build` in Docker.
 *
 * Why: nginx gzip_static can serve .gz files directly without CPU work.
 * Without this, 5MB Sanity Studio JS bundle takes 8+ seconds to download.
 * With pre-compressed .gz, browser fetches ~1.6MB and nginx sends it as-is.
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { promisify } from "node:util";
import { gzip } from "node:zlib";

const gz = promisify(gzip);

const distDir = process.argv[2] || "dist";
if (!existsSync(distDir)) {
  console.error(`[pre-compress] ${distDir} not found, skipping`);
  process.exit(0);
}

const targets = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(js|css|html|json|svg|webmanifest)$/.test(entry.name)) {
      // skip already-compressed
      if (p.endsWith(".gz")) continue;
      targets.push(p);
    }
  }
}
walk(distDir);

console.log(`[pre-compress] compressing ${targets.length} files in ${distDir}/`);
let totalBefore = 0;
let totalAfter = 0;
for (const file of targets) {
  const buf = readFileSync(file);
  const gzBuf = await gz(buf, { level: 6 });
  writeFileSync(`${file}.gz`, gzBuf);
  totalBefore += buf.length;
  totalAfter += gzBuf.length;
  const ratio = ((1 - gzBuf.length / buf.length) * 100).toFixed(1);
  const sizeStr = buf.length > 1024 ? `${(buf.length / 1024).toFixed(1)}KB` : `${buf.length}B`;
  const gzStr = gzBuf.length > 1024 ? `${(gzBuf.length / 1024).toFixed(1)}KB` : `${gzBuf.length}B`;
  console.log(`  ${relative(distDir, file)}: ${sizeStr} -> ${gzStr} (${ratio}% smaller)`);
}
const totalRatio = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
console.log(
  `[pre-compress] done. Total: ${(totalBefore / 1024).toFixed(1)}KB -> ${(totalAfter / 1024).toFixed(1)}KB (${totalRatio}% smaller)`
);
