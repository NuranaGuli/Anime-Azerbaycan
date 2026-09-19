import type { ApiError } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export class ApiRequestError extends Error implements ApiError {
  status?: number;
  fieldErrors?: Record<string, string>;

  constructor(message: string, status?: number, fieldErrors?: Record<string, string>) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  signal?: AbortSignal;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, signal } = options;

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      credentials: "include", 
      signal,
    });
  } catch {
    throw new ApiRequestError("Şəbəkə xətası baş verdi. İnternet bağlantınızı yoxlayın.");
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw new ApiRequestError(
      data?.message || "Naməlum xəta baş verdi.",
      response.status,
      data?.fieldErrors
    );
  }

  return data as T;
}

export const apiClient = {
  get: <T>(path: string, signal?: AbortSignal) => request<T>(path, { method: "GET", signal }),
  post: <T>(path: string, body?: unknown, signal?: AbortSignal) => request<T>(path, { method: "POST", body, signal }),
  put: <T>(path: string, body?: unknown, signal?: AbortSignal) => request<T>(path, { method: "PUT", body, signal }),
  patch: <T>(path: string, body?: unknown, signal?: AbortSignal) => request<T>(path, { method: "PATCH", body, signal }),
  delete: <T>(path: string, signal?: AbortSignal) => request<T>(path, { method: "DELETE", signal }),
};
