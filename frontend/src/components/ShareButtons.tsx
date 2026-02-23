import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  TwitterShareButton,
  FacebookShareButton,
  TwitterIcon,
  FacebookIcon,
} from "react-share";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  topAnimalId: string;
}

const SHARE_URL = typeof window !== "undefined" ? window.location.href : "https://animal-face-test.com";

export function ShareButtons({ topAnimalId }: ShareButtonsProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const animalName = t(`animals.${topAnimalId}.name`);
  const shareText = t("result.shareText", { animal: animalName });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${SHARE_URL}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <p className="sr-only">{t("result.share")}</p>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <TwitterShareButton url={SHARE_URL} title={shareText}>
          <div className="flex size-10 items-center justify-center rounded-full border border-border bg-background hover:bg-accent transition-colors">
            <TwitterIcon size={20} round={false} bgStyle={{ fill: "transparent" }} iconFillColor="currentColor" />
          </div>
        </TwitterShareButton>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <FacebookShareButton url={SHARE_URL} title={shareText}>
          <div className="flex size-10 items-center justify-center rounded-full border border-border bg-background hover:bg-accent transition-colors">
            <FacebookIcon size={20} round={false} bgStyle={{ fill: "transparent" }} iconFillColor="currentColor" />
          </div>
        </FacebookShareButton>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full size-10"
          onClick={handleCopy}
          aria-label="Copy link"
        >
          {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
        </Button>
      </motion.div>
    </div>
  );
}
