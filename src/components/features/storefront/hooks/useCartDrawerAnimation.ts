import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export interface UseCartDrawerAnimationResult {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  isCartRendered: boolean;
  openCartDrawer: () => void;
}

export const useCartDrawerAnimation = (): UseCartDrawerAnimationResult => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCartRendered, setIsCartRendered] = useState<boolean>(false);

  useEffect(() => {
    if (isCartOpen) return;
    const timer = window.setTimeout(() => {
      setIsCartRendered(false);
    }, 420);
    return () => window.clearTimeout(timer);
  }, [isCartOpen]);

  const openCartDrawer = () => {
    if (isCartOpen) return;
    setIsCartRendered(true);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsCartOpen(true);
      });
    });
  };

  return { isCartOpen, setIsCartOpen, isCartRendered, openCartDrawer };
};
