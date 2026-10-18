import { memo, useEffect, useRef, useState } from "react";
import { useAppStore } from "../store/appStore";
import styles from "./Toolbar.module.css";
import { getTranslations } from "../locales";
import type { CvExportData } from "../utils/exportCvToWord";

interface ToolbarProps {
  language: "fr" | "en";
  exportData?: CvExportData;
}

function ToolbarComponent({ language, exportData }: ToolbarProps) {
  const setLanguage = useAppStore((state) => state.setLanguage);
  const t = getTranslations(language);
  const [isHidden, setIsHidden] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const delta = Math.abs(currentScrollY - lastScrollY.current);

      if (currentScrollY <= 8) {
        setIsHidden(false);
      } else if (delta > 4 && isScrollingDown) {
        setIsHidden(true);
      } else if (delta > 4 && !isScrollingDown) {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = async () => {
    if (!exportData || exporting) return;
    setExporting(true);
    setExportError(false);
    try {
      const { exportCvToWord } = await import("../utils/exportCvToWord");
      await exportCvToWord(exportData, language);
    } catch {
      setExportError(true);
    } finally {
      setExporting(false);
    }
  };

  const printLabel = t.toolbar.print;
  const exportWordLabel = t.toolbar.exportWord;

  return (
    <div
      className={`${styles.toolbar} ${isHidden ? styles.toolbarHidden : ""}`}
    >
      <div className={styles.actions}>
        <a className={styles.journeyBtn} href={`?view=journey&lang=${language}`}>
          <span aria-hidden="true">▷</span>
          {language === "fr" ? "Parcours interactif" : "Interactive journey"}
        </a>
        <div className={styles.langControl}>
          <button
            className={`${styles.langBtn} ${language === "fr" ? styles.active : ""}`}
            type="button"
            aria-pressed={language === "fr"}
            onClick={() => setLanguage("fr")}
            title="Français"
          >
            FR
          </button>
          <button
            className={`${styles.langBtn} ${language === "en" ? styles.active : ""}`}
            type="button"
            aria-pressed={language === "en"}
            onClick={() => setLanguage("en")}
            title="English"
          >
            EN
          </button>
        </div>
        <button
          className={styles.exportBtn}
          onClick={handleExportWord}
          title={exportWordLabel}
          disabled={!exportData || exporting}
          aria-busy={exporting}
        >
          <span className={styles.icon}>📝</span>
          {exportWordLabel}
        </button>
        {exportError && (
          <span role="alert">
            {language === "fr"
              ? "Export impossible. Réessayez."
              : "Export failed. Please try again."}
          </span>
        )}
        <button
          className={styles.printBtn}
          onClick={handlePrint}
          title={printLabel}
        >
          <span className={styles.icon}>🖨️</span>
          {printLabel}
        </button>
      </div>
    </div>
  );
}

export const Toolbar = memo(ToolbarComponent);
