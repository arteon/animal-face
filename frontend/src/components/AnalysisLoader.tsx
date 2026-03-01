import { useEffect, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const ANIMAL_EMOJIS = ["🐶", "🐱", "🦊", "🐻", "🐰", "🦌", "🐹", "🐺", "🐧", "🦉", "🐿️", "🦕"];

const MESSAGES_KEYS = [
  "analysis.detectingFace",
  "analysis.matchingAnimal",
  "analysis.almostDone",
];

const FUN_TIP_KEYS = [
  "analysis.tip1",
  "analysis.tip2",
  "analysis.tip3",
];

const SpinningEmojis = memo(function SpinningEmojis() {
  return (
    <div className="relative flex size-40 items-center justify-center" aria-hidden="true">
      {ANIMAL_EMOJIS.map((emoji, i) => {
        const angle = (i / ANIMAL_EMOJIS.length) * 360;
        const rad = (angle * Math.PI) / 180;
        const r = 60;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;

        return (
          <motion.span
            key={i}
            className="absolute text-xl"
            style={{ left: "50%", top: "50%", x: x - 12, y: y - 12 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: 0,
            }}
          >
            <motion.span
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ display: "block" }}
            >
              {emoji}
            </motion.span>
          </motion.span>
        );
      })}
      <motion.span
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        className="text-4xl"
        aria-hidden="true"
      >
        ✨
      </motion.span>
    </div>
  );
});

export function AnalysisLoader() {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) return p;
        return p + Math.random() * 8 + 2;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES_KEYS.length);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [msgIndex]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTipIndex((i) => (i + 1) % FUN_TIP_KEYS.length);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [tipIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex w-full max-w-md mx-auto flex-col items-center gap-8 py-12"
    >
      <SpinningEmojis />

      <div className="w-full space-y-3 text-center">
        <motion.p
          key={msgIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-base font-medium text-foreground"
        >
          {t(MESSAGES_KEYS[msgIndex])}
        </motion.p>
        <Progress value={Math.min(progress, 95)} className="h-2.5" />
        <p className="text-xs text-muted-foreground">{Math.round(Math.min(progress, 95))}%</p>
        <motion.p
          key={`tip-${tipIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-xs text-muted-foreground/60 text-center max-w-xs"
        >
          {t(FUN_TIP_KEYS[tipIndex])}
        </motion.p>
      </div>
    </motion.div>
  );
}
