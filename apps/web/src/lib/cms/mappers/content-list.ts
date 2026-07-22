import type { ContentListItem } from "../../../types/cms";

export type ContentRecordItem = {
  title: string;
  slug: string;
  summary?: string | null;
};

function normalizeBasePath(basePath: string) {
  return basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
}

export function mapContentList(
  records: ContentRecordItem[],
  basePath: string,
): ContentListItem[] {
  const normalizedBasePath = normalizeBasePath(basePath);

  return records.map((record) => ({
    title: record.title,
    href: `${normalizedBasePath}/${record.slug}`,
    summary: record.summary ?? "",
  }));
}
