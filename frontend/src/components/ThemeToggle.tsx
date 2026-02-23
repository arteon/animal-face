import { Sun, Moon, SunMoon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

const ICONS = {
  light: Sun,
  dark: Moon,
  auto: SunMoon,
} as const;

const LABELS = {
  light: "Light mode",
  dark: "Dark mode",
  auto: "Auto (timezone)",
} as const;

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const Icon = ICONS[theme];

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      aria-label={LABELS[theme]}
      title={LABELS[theme]}
      className="gap-1.5"
    >
      <Icon className="size-4" />
      <span className="text-xs hidden sm:inline">
        {theme === "light" ? "Light" : theme === "dark" ? "Dark" : "Auto"}
      </span>
    </Button>
  );
}
