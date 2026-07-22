type CmsFetchOptions = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export async function fetchJson<T>(
  input: string | URL,
  init: CmsFetchOptions = {},
): Promise<T> {
  const response = await fetch(input, {
    headers: {
      Accept: "application/json",
      ...init.headers,
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${String(input)}: ${response.status}`);
  }

  return (await response.json()) as T;
}
