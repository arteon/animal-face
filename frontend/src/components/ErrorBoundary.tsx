/* eslint-disable react-refresh/only-export-components */
import { Component, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

function ErrorFallback() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <span className="text-5xl" aria-hidden="true">⚠️</span>
      <h2 className="text-lg font-bold text-foreground">{t("error.boundaryTitle")}</h2>
      <p className="text-sm text-muted-foreground max-w-sm">{t("error.boundaryMessage")}</p>
      <Button onClick={() => window.location.reload()}>{t("error.boundaryRetry")}</Button>
    </div>
  );
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
