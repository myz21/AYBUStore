import { useState } from "react";
import type { FormEvent } from "react";
import type { AuthMode, AuthSubmitStatus } from "../types";
import { getAuthErrors, isAuthSubmittable, type AuthFormState } from "../utils/auth";

export interface UseAuthFormResult {
  authForm: AuthFormState;
  authTouched: Record<keyof AuthFormState, boolean>;
  authSubmitStatus: AuthSubmitStatus;
  setAuthSubmitStatus: (value: AuthSubmitStatus) => void;
  setAuthTouched: (value: Record<keyof AuthFormState, boolean>) => void;
  updateAuthField: <K extends keyof AuthFormState>(field: K, value: AuthFormState[K]) => void;
  handleAuthSubmit: (mode: AuthMode) => (event: FormEvent<HTMLFormElement>) => void;
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

  const updateAuthField = <K extends keyof AuthFormState>(field: K, value: AuthFormState[K]) => {
    setAuthForm((prev) => ({ ...prev, [field]: value }));
    setAuthTouched((prev) => ({ ...prev, [field]: true }));
    if (authSubmitStatus !== "idle") {
      setAuthSubmitStatus("idle");
    }
  };

  const handleAuthSubmit = (mode: AuthMode) => (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      acceptTerms: true,
    });
    if (!isAuthSubmittable(mode, authForm)) return;

    setAuthSubmitStatus("loading");
    window.setTimeout(() => {
      setAuthSubmitStatus("success");
    }, 700);
  };

  return {
    authForm,
    authTouched,
    authSubmitStatus,
    setAuthSubmitStatus,
    setAuthTouched,
    updateAuthField,
    handleAuthSubmit,
  };
};
