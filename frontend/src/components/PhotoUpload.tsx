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
            {...getRootProps()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-colors",
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/30",
              hasError && "border-destructive bg-destructive/5"
            )}
          >
            <input {...getInputProps()} />
            <motion.div
              animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Upload className="size-10 text-muted-foreground" />
            </motion.div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                {t("upload.dragDrop")}
              </p>
              <p className="text-xs text-muted-foreground">{t("upload.maxSize")}</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
              {t("upload.selectFile")}
            </Button>
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
