import { useState, useCallback } from "react";
import { analyzeImage, type AnalysisResult } from "@/lib/api";

export type AnalysisStatus = "idle" | "uploading" | "analyzing" | "done" | "error";

export interface AnalysisState {
  status: AnalysisStatus;
  result: AnalysisResult | null;
  error: string | null;
  previewUrl: string | null;
}

export function useAnalysis() {
  const [state, setState] = useState<AnalysisState>({
    status: "idle",
    result: null,
    error: null,
    previewUrl: null,
  });

  const analyze = useCallback(async (file: File) => {
    const previewUrl = URL.createObjectURL(file);

    setState({
      status: "uploading",
      result: null,
      error: null,
      previewUrl,
    });

    await new Promise((resolve) => setTimeout(resolve, 600));

    setState((prev) => ({ ...prev, status: "analyzing" }));

    try {
      const result = await analyzeImage(file);
      setState((prev) => ({ ...prev, status: "done", result }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: err instanceof Error ? err.message : "Unknown error",
      }));
    }
  }, []);

  const reset = useCallback(() => {
    setState((prev) => {
      if (prev.previewUrl) {
        URL.revokeObjectURL(prev.previewUrl);
      }
      return { status: "idle", result: null, error: null, previewUrl: null };
    });
  }, []);

  return { ...state, analyze, reset };
}
