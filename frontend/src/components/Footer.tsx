import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { PawPrint } from "lucide-react";

export function Footer() {
  const { i18n } = useTranslation();
  const isKorean = i18n.language === "ko" || i18n.language.startsWith("ko-");

  return (
    <footer className="mt-auto w-full">
      <Separator />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-6 text-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <PawPrint className="size-4" />
          <span className="text-sm font-medium">
            {isKorean ? "동물상 테스트" : "Animal Face Test"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {isKorean
            ? "© 2025 동물상 테스트. 업로드한 사진은 분석 후 즉시 삭제됩니다."
            : "© 2025 Animal Face Test. Uploaded photos are deleted immediately after analysis."}
        </p>
        <p className="text-xs text-muted-foreground/60">
          {isKorean
            ? "이 서비스는 재미를 위한 AI 분석으로, 실제 외모를 평가하지 않습니다."
            : "This service uses AI analysis for entertainment purposes only."}
        </p>
      </div>
    </footer>
  );
}
