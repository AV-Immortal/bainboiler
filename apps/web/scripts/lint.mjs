import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const requiredFiles = [
  "package.json",
  "tsconfig.json",
  "next.config.ts",
  "next-env.d.ts",
  "postcss.config.mjs",
  "eslint.config.mjs",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/globals.css",
];

const textExtensions = new Set([".css", ".d.ts", ".json", ".mjs", ".ts", ".tsx"]);
const errors = [];

for (const relativePath of requiredFiles) {
  const absolutePath = path.join(projectRoot, relativePath);

  if (!existsSync(absolutePath)) {
    errors.push(`Missing required file: ${relativePath}`);
  }
}

for (const relativePath of ["package.json", "tsconfig.json"]) {
  const absolutePath = path.join(projectRoot, relativePath);

  if (!existsSync(absolutePath)) {
    continue;
  }

  try {
    JSON.parse(readFileSync(absolutePath, "utf8"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    errors.push(`Invalid JSON in ${relativePath}: ${message}`);
  }
}

function walk(directoryPath) {
  for (const entry of readdirSync(directoryPath)) {
    const absolutePath = path.join(directoryPath, entry);
    const stats = statSync(absolutePath);

    if (stats.isDirectory()) {
      walk(absolutePath);
      continue;
    }

    const extension = path.extname(entry);

    if (!textExtensions.has(extension)) {
      continue;
    }

    const content = readFileSync(absolutePath, "utf8");
    const relativePath = path.relative(projectRoot, absolutePath).replaceAll("\\", "/");

    if (content.includes("\r")) {
      errors.push(`CRLF detected in ${relativePath}`);
    }

    if (content.includes("\t")) {
      errors.push(`Tab indentation detected in ${relativePath}`);
    }
  }
}

walk(path.join(projectRoot, "src"));
walk(path.join(projectRoot, "scripts"));

if (errors.length > 0) {
  console.error("Lint failed:");

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log("Lint passed: bootstrap files are present and formatted consistently.");
