import { AuthCard } from "../../../ui/AuthCard";
import { AuthField } from "../../../ui/AuthField";
import { AuthFooterLinkRow } from "../../../ui/AuthFooterLinkRow";
import { AuthHeroPanel } from "../../../ui/AuthHeroPanel";
import { AuthShell } from "../../../ui/AuthShell";
import { Button } from "../../../ui/Button";
import type { StorefrontAuthProps } from "../types";

export const StorefrontAuth = ({
  mode,
  loginPageContent,
  registerPageContent,
  loginHeroContent,
  registerHeroContent,
  authForm,
  authTouched,
  authSubmitStatus,
  authErrorMessage,
  updateAuthField,
  handleAuthSubmit,
  getAuthBenefits,
  getAuthErrors,
  navigateToView,
}: StorefrontAuthProps) => {
  const content = mode === "login" ? loginPageContent : registerPageContent;
  const hero = mode === "login" ? loginHeroContent : registerHeroContent;
  const errors = getAuthErrors(mode, authForm);
  const benefits = getAuthBenefits(mode, loginPageContent, registerPageContent);
  const footerPrompt = mode === "login" ? loginPageContent.registerPrompt : registerPageContent.loginPrompt;
  const footerActionLabel =
    mode === "login" ? loginPageContent.registerPromptLinkLabel : registerPageContent.loginPromptLinkLabel;

  return (
    <AuthShell>
      <AuthHeroPanel
        imageUrl={hero.imageUrl}
        title={hero.title}
        subtitle={content.panelDescription}
        benefits={benefits}
      />
      <AuthCard title={content.panelTitle} description={content.panelDescription}>
        {authErrorMessage && (
          <div className="mb-4 rounded-xl bg-rose-500/10 p-3 border border-rose-500/20 animate-in fade-in slide-in-from-top-1 duration-300">
            <div className="flex items-start gap-2.5">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-rose-500 shrink-0 mt-0.5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <div className="text-[13px] font-medium text-rose-600 leading-tight">
                {authErrorMessage}
              </div>
            </div>
          </div>
        )}
        <form onSubmit={handleAuthSubmit(mode)} className="grid gap-2.5">
          {mode === "register" ? (
            <AuthField
              id="register-full-name"
              label="Ad Soyad"
              value={authForm.fullName}
              onChange={(value) => updateAuthField("fullName", value)}
              placeholder="Adınız Soyadınız"
              error={errors.fullName}
              touched={authTouched.fullName}
            />
          ) : null}
          <AuthField
            id={`${mode}-email`}
            label="E-posta"
            value={authForm.email}
            onChange={(value) => updateAuthField("email", value)}
            placeholder="ornek@aybu.edu.tr"
            type="email"
            error={errors.email}
            touched={authTouched.email}
          />
          <AuthField
            id={`${mode}-password`}
            label="Şifre"
            value={authForm.password}
            onChange={(value) => updateAuthField("password", value)}
            placeholder="En az 8 karakter"
            type="password"
            error={errors.password}
            touched={authTouched.password}
          />
          {mode === "register" ? (
            <AuthField
              id="register-confirm-password"
              label="Şifre Tekrar"
              value={authForm.confirmPassword}
              onChange={(value) => updateAuthField("confirmPassword", value)}
              placeholder="Şifrenizi tekrar yazın"
              type="password"
              error={errors.confirmPassword}
              touched={authTouched.confirmPassword}
            />
          ) : null}

          {mode === "register" ? (
            <div className="mt-1">
              <label className="flex items-start gap-2 text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={authForm.acceptTerms}
                  onChange={(event) => updateAuthField("acceptTerms", event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-300"
                />
                <span>Kullanım koşullarını ve gizlilik politikasını okudum, kabul ediyorum.</span>
              </label>
              <p
                className={`mt-1 min-h-[1rem] text-[11px] transition-all duration-300 ${
                  authTouched.acceptTerms && errors.acceptTerms
                    ? "translate-y-0 text-rose-600 opacity-100"
                    : "-translate-y-0.5 text-transparent opacity-0"
                }`}
              >
                {errors.acceptTerms ?? "."}
              </p>
            </div>
          ) : null}

          <Button
            type="submit"
            fullWidth
            disabled={authSubmitStatus === "loading"}
            className={`transition-all duration-300 ${
              authSubmitStatus === "success"
                ? "bg-emerald-500 text-white hover:bg-emerald-500"
                : ""
            }`}
          >
            {authSubmitStatus === "loading"
              ? "İşleniyor..."
              : authSubmitStatus === "success"
                ? "Başarılı"
                : content.submitLabel}
          </Button>

          <p className="text-xs text-slate-500">{content.securityNote ?? ""}</p>
        </form>

        <AuthFooterLinkRow
          prompt={footerPrompt}
          actionLabel={footerActionLabel}
          onActionClick={() => navigateToView(mode === "login" ? "register" : "login")}
        />
      </AuthCard>
    </AuthShell>
  );
};
