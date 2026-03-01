import { Sun, Moon, SunMoon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

const ICONS = {
  light: Sun,
  dark: Moon,
  auto: SunMoon,
} as const;

const LABEL_KEYS = {
  light: "theme.lightLabel",
  dark: "theme.darkLabel",
  auto: "theme.autoLabel",
} as const;

const SHORT_KEYS = {
  light: "theme.light",
  dark: "theme.dark",
  auto: "theme.auto",
} as const;

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const Icon = ICONS[theme];

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      aria-label={t(LABEL_KEYS[theme])}
      title={t(LABEL_KEYS[theme])}
      className="gap-1.5"
    >
      <Icon className="size-4" />
      <span className="text-xs hidden sm:inline">
        {t(SHORT_KEYS[theme])}
      </span>
    </Button>
  );
}
