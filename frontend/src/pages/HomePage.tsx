import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoUpload } from "@/components/PhotoUpload";
import { AnalysisLoader } from "@/components/AnalysisLoader";
import { ResultCard } from "@/components/ResultCard";
import { ShareButtons } from "@/components/ShareButtons";
import { AdSlot } from "@/components/AdSlot";
import { useAnalysis } from "@/hooks/useAnalysis";

const FLOATING_EMOJIS = ["🐶", "🐱", "🦊", "🐻", "🐰", "🦌", "🐹", "🐺", "🐧", "🦉", "🐿️", "🦕"];

function FloatingEmoji({ emoji, index }: { emoji: string; index: number }) {
  const duration = 3 + (index % 4) * 0.8;
  const delay = (index * 0.3) % 2;
  const x = ((index * 137.5) % 100);

  return (
    <motion.span
      className="absolute select-none text-2xl opacity-20 pointer-events-none"
      style={{ left: `${x}%`, top: "-2rem" }}
      animate={{ y: ["0vh", "110vh"] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
        repeatDelay: index * 0.5,
      }}
    >
      {emoji}
    </motion.span>
  );
}

export function HomePage() {
  const { t, i18n } = useTranslation();
  const isKorean = i18n.language === "ko" || i18n.language.startsWith("ko-");
  const { status, result, error, previewUrl, analyze, reset } = useAnalysis();

  return (
    <>
      <Helmet>
        <title>
          {isKorean
            ? "나는 어떤 동물상? - AI 동물상 테스트"
            : "What Animal Do I Look Like? - AI Animal Face Test"}
        </title>
        <meta
          name="description"
          content={
            isKorean
              ? "AI가 분석하는 나의 동물 얼굴형! 셀카 한 장으로 나와 닮은 동물을 찾아보세요. 강아지, 고양이, 여우 등 12가지 동물상 테스트."
              : "AI-powered animal face shape analysis! Upload your selfie and discover which of 12 animals you look like. Free online test."
          }
        />
        <meta
          name="keywords"
          content={
            isKorean
              ? "동물상 테스트, 동물 닮은꼴, AI 얼굴 분석, 관상 테스트, 동물상"
              : "animal face test, what animal do I look like, animal look alike, face shape test, AI face analysis"
          }
        />
        <meta property="og:title" content={isKorean ? "나는 어떤 동물상? - AI 동물상 테스트" : "What Animal Do I Look Like? - AI Animal Face Test"} />
        <meta
          property="og:description"
          content={
            isKorean
              ? "AI가 분석하는 나의 동물 얼굴형! 셀카 한 장으로 나와 닮은 동물을 찾아보세요."
              : "Upload your selfie and discover which animal you look like! Free AI-powered test."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://animal-face.quizlab.io/og-image.png" />
        <meta property="og:url" content="https://animal-face.quizlab.io/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isKorean ? "나는 어떤 동물상?" : "What Animal Do I Look Like?"} />
        <meta name="twitter:description" content={isKorean ? "AI가 분석하는 나의 동물 얼굴형!" : "AI-powered animal face test!"} />
        <meta name="twitter:image" content="https://animal-face.quizlab.io/og-image.png" />
        <link rel="canonical" href="https://animal-face.quizlab.io/" />
      </Helmet>

      <div className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {FLOATING_EMOJIS.map((emoji, i) => (
            <FloatingEmoji key={i} emoji={emoji} index={i} />
          ))}
        </div>

        <div className="relative mx-auto max-w-2xl px-4 py-12">
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-8"
              >
                <div className="text-center space-y-3">
                  <motion.h1
                    className="text-4xl font-black tracking-tight sm:text-5xl"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {t("home.title")}
                  </motion.h1>
                  <motion.p
                    className="text-base text-muted-foreground sm:text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {t("home.subtitle")}
                  </motion.p>
                </div>

                <AdSlot />

                <PhotoUpload onFile={analyze} />
              </motion.div>
            )}

            {(status === "uploading" || status === "analyzing") && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <AnalysisLoader />
              </motion.div>
            )}

            {status === "done" && result && (
              <motion.div
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-6"
              >
                <ResultCard result={result} previewUrl={previewUrl} />

                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    {t("result.share")}
                  </p>
                  <ShareButtons topAnimalId={result.topAnimal} />
                </div>

                <AdSlot />

                <Button variant="outline" onClick={reset} className="gap-2">
                  <RefreshCw className="size-4" />
                  {t("result.retake")}
                </Button>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-20 text-center"
              >
                <span className="text-5xl">😢</span>
                <p className="text-base font-medium text-foreground">{t("common.error")}</p>
                {error && (
                  <p className="text-xs text-muted-foreground max-w-sm">{error}</p>
                )}
                <Button onClick={reset}>{t("common.retry")}</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
