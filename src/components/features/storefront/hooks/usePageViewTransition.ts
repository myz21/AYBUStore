import { useState } from "react";
import type { PageView } from "../types";

export interface UsePageViewTransitionResult {
  pageView: PageView;
  setPageView: (value: PageView) => void;
  isPageTransitioning: boolean;
  navigateToView: (targetView: PageView) => void;
}

export const usePageViewTransition = (initialPageView: PageView): UsePageViewTransitionResult => {
  const [pageView, setPageView] = useState<PageView>(initialPageView);
  const [isPageTransitioning, setIsPageTransitioning] = useState<boolean>(false);

  const navigateToView = (targetView: PageView) => {
    if (targetView === pageView) return;
    setIsPageTransitioning(true);
    window.setTimeout(() => {
      setPageView(targetView);
      window.requestAnimationFrame(() => {
        setIsPageTransitioning(false);
      });
    }, 180);
  };

  return { pageView, setPageView, isPageTransitioning, navigateToView };
};
