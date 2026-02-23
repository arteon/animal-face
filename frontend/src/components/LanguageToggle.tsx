import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const isKorean = i18n.language === "ko" || i18n.language.startsWith("ko-");

  const toggle = () => {
    i18n.changeLanguage(isKorean ? "en" : "ko");
  };

  return (
    <Button variant="outline" size="sm" onClick={toggle} className="font-medium">
      {isKorean ? "English" : "한국어"}
    </Button>
  );
}
