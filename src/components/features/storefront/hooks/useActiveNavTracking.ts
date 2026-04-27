import { useEffect } from "react";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { HomeSectionKey, HomeSectionRefs, PageView } from "../types";

export interface UseActiveNavTrackingParams {
  pageView: PageView;
  homeSectionRefs: MutableRefObject<HomeSectionRefs>;
  setActiveNavId: Dispatch<SetStateAction<string>>;
}

export const useActiveNavTracking = ({
  pageView,
  homeSectionRefs,
  setActiveNavId,
}: UseActiveNavTrackingParams) => {
  useEffect(() => {
    if (pageView === "departments") {
      setActiveNavId("departments");
      return;
    }
    if (pageView === "login" || pageView === "register") {
      setActiveNavId("home");
      return;
    }

    const sectionPairs: Array<{ id: "home" | "products" | "store"; key: HomeSectionKey }> = [
      { id: "home", key: "hero" },
      { id: "products", key: "products" },
      { id: "store", key: "contact" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionKey = entry.target.getAttribute("data-home-section") as HomeSectionKey | null;
          if (!sectionKey || !entry.isIntersecting) return;
          const pair = sectionPairs.find((item) => item.key === sectionKey);
          if (pair) setActiveNavId(pair.id);
        });
      },
      { threshold: 0.45, rootMargin: "-20% 0px -45% 0px" },
    );

    sectionPairs.forEach((pair) => {
      const element = homeSectionRefs.current[pair.key];
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pageView, homeSectionRefs, setActiveNavId]);
};
