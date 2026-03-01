import { useTranslation } from "react-i18next";

export function AdSlot() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto my-2 flex w-full max-w-xl items-center justify-center px-4 py-2 text-[10px] text-muted-foreground/30">
      {t("ad.sponsored")}
    </div>
  );
}
