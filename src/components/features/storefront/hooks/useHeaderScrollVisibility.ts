import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

export interface UseHeaderScrollVisibilityParams {
  setIsHeaderHidden: Dispatch<SetStateAction<boolean>>;
}

export const useHeaderScrollVisibility = ({ setIsHeaderHidden }: UseHeaderScrollVisibilityParams) => {
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let lastY = window.scrollY || 0;
    let ticking = false;
    const revealTop = 28;
    const collapseAfter = 70;
    const deltaThreshold = 6;

    const update = () => {
      ticking = false;
      const y = window.scrollY || 0;
      const delta = y - lastY;
      lastY = y;

      if (y < revealTop) {
        setIsHeaderHidden(false);
        return;
      }

      if (delta > deltaThreshold && y > collapseAfter) {
        setIsHeaderHidden(true);
      } else if (delta < -deltaThreshold) {
        setIsHeaderHidden(false);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setIsHeaderHidden]);
};
