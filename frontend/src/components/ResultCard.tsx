import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { animals } from "@/data/animals";
import type { AnalysisResult } from "@/lib/api";

interface ResultCardProps {
  result: AnalysisResult;
  previewUrl: string | null;
}

function useCountUp(target: number, duration = 1200) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCurrent(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return current;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function ResultCard({ result, previewUrl }: ResultCardProps) {
  const { t, i18n } = useTranslation();
  const isKorean = i18n.language === "ko" || i18n.language.startsWith("ko-");
  const animalInfo = animals.find((a) => a.id === result.topAnimal);
  const topMatch = result.matches.find((m) => m.id === result.topAnimal);
  const topPct = topMatch?.percentage ?? 0;
  const countedPct = useCountUp(topPct);
  const top3 = result.matches.slice(0, 3);

  if (!animalInfo) return null;

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -15, scale: 0.95 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
      className="w-full max-w-md mx-auto"
    >
      <Card
        className="overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${animalInfo.color}18 0%, ${animalInfo.color}08 100%)`,
          borderColor: `${animalInfo.color}40`,
        }}
      >
        <CardHeader className="pb-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-4"
          >
            {previewUrl && (
              <motion.div variants={itemVariants} className="relative">
                <img
                  src={previewUrl}
                  alt="Your photo"
                  className="size-24 rounded-full object-cover border-4"
                  style={{ borderColor: animalInfo.color }}
                />
                <span
                  className="absolute -bottom-2 -right-2 flex size-9 items-center justify-center rounded-full text-xl shadow-md"
                  style={{ backgroundColor: animalInfo.color + "22" }}
                >
                  {animalInfo.emoji}
                </span>
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="text-center">
              <p className="text-sm text-muted-foreground">{t("result.yourAnimal")}</p>
              <div className="mt-1 flex items-center justify-center gap-2">
                {!previewUrl && (
                  <span className="text-4xl">{animalInfo.emoji}</span>
                )}
                <CardTitle className="text-2xl font-bold">
                  {isKorean ? animalInfo.nameKo : animalInfo.nameEn}
                </CardTitle>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <p className="text-xs text-muted-foreground mb-1">{t("result.matchRate")}</p>
              <span
                className="text-5xl font-black tabular-nums"
                style={{ color: animalInfo.color }}
              >
                {countedPct}%
              </span>
            </motion.div>
          </motion.div>
        </CardHeader>

        <CardContent className="pt-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("result.matchRate")}
              </h3>
              <div className="space-y-2">
                {top3.map((match) => {
                  const info = animals.find((a) => a.id === match.id);
                  return (
                    <div key={match.id} className="flex items-center gap-2">
                      <span className="text-lg">{match.emoji}</span>
                      <span className="w-20 text-xs font-medium truncate">
                        {isKorean ? (info?.nameKo ?? match.name) : (info?.nameEn ?? match.name)}
                      </span>
                      <Progress
                        value={match.percentage}
                        className="flex-1 h-2"
                        style={
                          {
                            "--progress-color": info?.color ?? "#6B7280",
                          } as React.CSSProperties
                        }
                      />
                      <span className="w-9 text-right text-xs font-semibold tabular-nums">
                        {match.percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("result.personality")}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/80">
                {isKorean ? animalInfo.descriptionKo : animalInfo.descriptionEn}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("result.celebrities")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(isKorean ? animalInfo.celebritiesKo : animalInfo.celebritiesEn).map(
                  (celebrity) => (
                    <Badge
                      key={celebrity}
                      variant="secondary"
                      className="text-xs"
                    >
                      {celebrity}
                    </Badge>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
