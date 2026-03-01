import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <span className="text-6xl" aria-hidden="true">🔍</span>
      <h1 className="text-2xl font-bold text-foreground">{t("notFound.title")}</h1>
      <p className="text-sm text-muted-foreground max-w-sm">{t("notFound.message")}</p>
      <Button asChild>
        <Link to="/" className="gap-2">
          <Home className="size-4" />
          {t("notFound.goHome")}
        </Link>
      </Button>
    </div>
  );
}
