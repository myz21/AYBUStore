import { useEffect } from "react";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { HomeSectionKey, HomeSectionRefs, HomeSectionVisibilityState } from "../types";

export interface UseHomeSectionRevealParams {
  pageView: string;
  homeSectionRefs: MutableRefObject<HomeSectionRefs>;
  setVisibleHomeSections: Dispatch<SetStateAction<HomeSectionVisibilityState>>;
}

export const useHomeSectionReveal = ({
  pageView,
  homeSectionRefs,
  setVisibleHomeSections,
}: UseHomeSectionRevealParams) => {
  useEffect(() => {
    if (pageView !== "home") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = entry.target.getAttribute("data-home-section") as HomeSectionKey | null;
          if (!key) return;
          if (entry.isIntersecting) {
            setVisibleHomeSections((prev) => ({ ...prev, [key]: true }));
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    (Object.keys(homeSectionRefs.current) as HomeSectionKey[]).forEach((key) => {
      const element = homeSectionRefs.current[key];
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pageView, homeSectionRefs, setVisibleHomeSections]);
};
