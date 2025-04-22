import { z } from "zod";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const backendUrlSchema = z.string().url({
  message: "Invalid backend URL format. Please check your NEXT_BACKEND_URL environment variable.",
}).min(1, {
  message: "Backend URL is required. Please set the NEXT_BACKEND_URL environment variable.",
});

type BackendUrlResult = {
  url: string | null;
  error: string | null;
};

export function getBackendUrl(): BackendUrlResult {
  const result = backendUrlSchema.safeParse(process.env.NEXT_BACKEND_URL);
  
  if (!result.success) {
    return {
      url: null,
      error: result.error.errors[0]?.message || "Failed to validate backend URL"
    };
  }

  return {
    url: result.data,
    error: null
  };
}

export const { url: BACKEND_URL, error: BACKEND_URL_ERROR } = getBackendUrl();
