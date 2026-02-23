import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PawPrint, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./LanguageToggle";

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/stats", label: t("nav.stats") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-foreground">
          <PawPrint className="size-5 text-primary" />
          <span className="text-sm sm:text-base">{t("nav.title")}</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => (
            <Button
              key={link.to}
              asChild
              variant={location.pathname === link.to ? "secondary" : "ghost"}
              size="sm"
            >
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}
          <div className="ml-2">
            <LanguageToggle />
          </div>
        </nav>

        <button
          className="flex items-center sm:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border/40 bg-background/95 px-4 sm:hidden"
          >
            <div className="flex flex-col gap-1 py-3">
              {navLinks.map((link) => (
                <Button
                  key={link.to}
                  asChild
                  variant={location.pathname === link.to ? "secondary" : "ghost"}
                  size="sm"
                  className="justify-start"
                  onClick={() => setMenuOpen(false)}
                >
                  <Link to={link.to}>{link.label}</Link>
                </Button>
              ))}
              <div className="mt-1">
                <LanguageToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
