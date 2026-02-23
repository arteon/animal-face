import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark" | "auto";

const STORAGE_KEY = "animal-face-theme";

function getSystemPrefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function isDarkByTimezone(): boolean {
  try {
    const now = new Date();
    const hours = now.getHours();
    // Dark mode between 7PM (19:00) and 7AM (07:00) local time
    return hours >= 19 || hours < 7;
  } catch {
    return getSystemPrefersDark();
  }
}

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme === "auto") {
    // Primary: timezone-based, fallback: system preference
    return isDarkByTimezone() ? "dark" : "light";
  }
  return theme;
}

function applyTheme(resolved: "light" | "dark") {
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "auto";
    return (localStorage.getItem(STORAGE_KEY) as Theme) || "auto";
  });

  const resolved = resolveTheme(theme);

  useEffect(() => {
    applyTheme(resolved);
  }, [resolved]);

  // Re-check auto mode every minute (for timezone transitions)
  useEffect(() => {
    if (theme !== "auto") return;
    const interval = setInterval(() => {
      applyTheme(resolveTheme("auto"));
    }, 60_000);
    return () => clearInterval(interval);
  }, [theme]);

  // Listen for system preference changes when in auto mode
  useEffect(() => {
    if (theme !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme(resolveTheme("auto"));
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }, []);

  // Cycle: light → dark → auto → light
  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "light" ? "dark" : prev === "dark" ? "auto" : "light";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return { theme, resolved, setTheme, toggleTheme };
}
