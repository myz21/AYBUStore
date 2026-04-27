import type { AuthBenefit, LoginPageContent, RegisterPageContent } from "../../../../types";

export type AuthMode = "login" | "register";

export interface AuthFormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export type AuthErrorState = Partial<Record<keyof AuthFormState, string>>;

export const getAuthBenefits = (
  mode: AuthMode,
  loginPageContent: LoginPageContent,
  registerPageContent: RegisterPageContent,
): AuthBenefit[] => {
  if (mode === "login") return loginPageContent.benefits ?? [];
  return registerPageContent.benefits ?? [];
};

export const getAuthErrors = (mode: AuthMode, authForm: AuthFormState): AuthErrorState => {
  const errors: AuthErrorState = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (mode === "register" && authForm.fullName.trim().length < 3) {
    errors.fullName = "Ad soyad en az 3 karakter olmalıdır.";
  }
  if (!emailPattern.test(authForm.email.trim())) {
    errors.email = "Geçerli bir e-posta adresi girin.";
  }
  if (authForm.password.length < 8) {
    errors.password = "Şifre en az 8 karakter olmalıdır.";
  }
  if (mode === "register" && authForm.confirmPassword !== authForm.password) {
    errors.confirmPassword = "Şifreler eşleşmiyor.";
  }
  if (mode === "register" && !authForm.acceptTerms) {
    errors.acceptTerms = "Devam etmek için koşulları kabul etmelisiniz.";
  }
  return errors;
};

export const isAuthSubmittable = (mode: AuthMode, authForm: AuthFormState): boolean => {
  return Object.keys(getAuthErrors(mode, authForm)).length === 0;
};
