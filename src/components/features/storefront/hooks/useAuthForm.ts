import { useState } from "react";
import type { FormEvent } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import { auth } from "../../../lib/firebase";
import type { AuthMode, AuthSubmitStatus } from "../types";
import { getAuthErrors, isAuthSubmittable, type AuthFormState } from "../utils/auth";

export interface UseAuthFormResult {
  authForm: AuthFormState;
  authTouched: Record<keyof AuthFormState, boolean>;
  authSubmitStatus: AuthSubmitStatus;
  authErrorMessage: string | null;
  setAuthSubmitStatus: (value: AuthSubmitStatus) => void;
  setAuthTouched: (value: Record<keyof AuthFormState, boolean>) => void;
  updateAuthField: <K extends keyof AuthFormState>(field: K, value: AuthFormState[K]) => void;
  handleAuthSubmit: (mode: AuthMode, onSuccess: () => void) => (event: FormEvent<HTMLFormElement>) => void;
}

export const useAuthForm = (): UseAuthFormResult => {
  const [authForm, setAuthForm] = useState<AuthFormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [authTouched, setAuthTouched] = useState<Record<keyof AuthFormState, boolean>>({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    acceptTerms: false,
  });
  const [authSubmitStatus, setAuthSubmitStatus] = useState<AuthSubmitStatus>("idle");
  const [authErrorMessage, setAuthErrorMessage] = useState<string | null>(null);

  const updateAuthField = <K extends keyof AuthFormState>(field: K, value: AuthFormState[K]) => {
    setAuthForm((prev) => ({ ...prev, [field]: value }));
    setAuthTouched((prev) => ({ ...prev, [field]: true }));
    setAuthErrorMessage(null);
    if (authSubmitStatus !== "idle") {
      setAuthSubmitStatus("idle");
    }
  };

  const handleAuthSubmit = (mode: AuthMode, onSuccess: () => void) => async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      acceptTerms: true,
    });
    setAuthErrorMessage(null);

    if (!isAuthSubmittable(mode, authForm)) return;

    setAuthSubmitStatus("loading");

    try {
      if (mode === "register") {
        const userCredential = await createUserWithEmailAndPassword(auth, authForm.email, authForm.password);
        if (authForm.fullName) {
          await updateProfile(userCredential.user, { displayName: authForm.fullName });
        }
      } else {
        await signInWithEmailAndPassword(auth, authForm.email, authForm.password);
      }
      setAuthSubmitStatus("success");
      setTimeout(onSuccess, 500);
    } catch (error: any) {
      console.error("Auth error:", error);
      setAuthSubmitStatus("idle");
      
      if (error.code === "auth/email-already-in-use") {
        setAuthErrorMessage("Bu e-posta adresi zaten kayıtlı. Lütfen giriş yapın.");
      } else if (error.code === "auth/invalid-credential") {
        setAuthErrorMessage("Hatalı e-posta veya şifre. Lütfen kontrol edin.");
      } else if (error.code === "auth/weak-password") {
        setAuthErrorMessage("Şifre çok zayıf. Lütfen daha güçlü bir şifre seçin.");
      } else {
        setAuthErrorMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  return {
    authForm,
    authTouched,
    authSubmitStatus,
    authErrorMessage,
    setAuthSubmitStatus,
    setAuthTouched,
    updateAuthField,
    handleAuthSubmit,
  };
};
