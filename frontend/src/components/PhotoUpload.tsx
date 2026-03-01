import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Upload, Camera, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  onFile: (file: File) => void;
}

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = { "image/jpeg": [], "image/png": [], "image/webp": [] };

export function PhotoUpload({ onFile }: PhotoUploadProps) {
  const { t } = useTranslation();
  const cameraRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted[0]) onFile(accepted[0]);
    },
    [onFile]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE,
    multiple: false,
  });

  const handleCamera = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
    e.target.value = "";
  };

  const hasError = fileRejections.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="overflow-hidden">
        <CardContent className="flex flex-col gap-4 p-6">
          <div
            className={cn(
              "rounded-xl p-[2px] transition-all duration-200",
              isDragActive
                ? "bg-primary"
                : hasError
                ? "bg-destructive"
                : "bg-border hover:bg-gradient-to-br hover:from-amber-400 hover:via-red-500 hover:to-pink-500"
            )}
          >
          <div
            {...getRootProps()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[10px] border-0 p-10 text-center bg-card transition-all duration-200",
              isDragActive && "bg-primary/5",
              hasError && "bg-destructive/5"
            )}
          >
            <input {...getInputProps()} />
            <motion.div
              animate={
                isDragActive
                  ? { scale: [1, 1.15, 1], opacity: [1, 0.7, 1] }
                  : { scale: 1, opacity: 1 }
              }
              transition={
                isDragActive
                  ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
                  : { type: "spring", stiffness: 300 }
              }
            >
              {isDragActive ? (
                <Upload className="size-10 text-primary" />
              ) : (
                <span className="text-5xl leading-none select-none" aria-hidden="true">🐾</span>
              )}
            </motion.div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                {t("upload.dragDrop")}
              </p>
              <p className="text-xs text-muted-foreground">{t("upload.maxSize")}</p>
            </div>
            <Button type="button" variant="default" size="sm">
              {t("upload.selectFile")}
            </Button>
          </div>
          </div>

          {hasError && (
            <p className="text-xs text-destructive text-center">
              {t("upload.maxSize")}
            </p>
          )}

          <div className="relative flex items-center gap-3">
            <div className="flex-1 border-t border-border" />
            <span className="text-xs text-muted-foreground">{t("upload.or")}</span>
            <div className="flex-1 border-t border-border" />
          </div>

          <Button
            type="button"
            variant="secondary"
            className="gap-2"
            onClick={() => cameraRef.current?.click()}
          >
            <Camera className="size-4" />
            {t("home.cameraButton")}
          </Button>
          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            onChange={handleCamera}
          />

          <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">{t("home.privacyNotice")}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
