export async function fetchWithError(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);

  if (!res.ok) {
    const error = new Error("API Error") as Error & { status: number };
    error.status = res.status;
    throw error;
  }

  return res.json();
}
