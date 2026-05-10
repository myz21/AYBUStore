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
  setAuthSubmitStatus,
}: StorefrontAuthProps) => {
  const content = mode === "login" ? loginPageContent : registerPageContent;
  const hero = mode === "login" ? loginHeroContent : registerHeroContent;
  const errors = getAuthErrors(mode, authForm);
  const benefits = getAuthBenefits(mode, loginPageContent, registerPageContent);
  const footerPrompt = mode === "login" ? loginPageContent.registerPrompt : registerPageContent.loginPrompt;
  const footerActionLabel =
    mode === "login" ? loginPageContent.registerPromptLinkLabel : registerPageContent.loginPromptLinkLabel;

  if (authSubmitStatus === "otp") {
    return (
      <AuthShell>
        <AuthHeroPanel
          imageUrl={hero.imageUrl}
          title="Doğrulama Gerekli"
          subtitle="Güvenliğiniz için e-posta adresinize bir doğrulama kodu gönderdik."
          benefits={benefits}
        />
        <AuthCard title="Güvenlik Kodu" description={`${authForm.email} adresine gönderilen 6 haneli kodu giriniz.`}>
          <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-red-600 px-4 py-3 flex justify-between items-center">
              <span className="text-[10px] font-black text-white tracking-tighter leading-none">ETKİLE<br/>KEŞFET<br/>YAŞA</span>
              <span className="text-sm font-black text-white italic tracking-tighter">AYBU STORE</span>
            </div>
            <div className="p-5 bg-slate-50/50">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-red-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-red-500/20">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-red-600 underline decoration-2 underline-offset-4 mb-3">Güvenlik Kodu</h4>
                <p className="text-[13px] text-slate-600 leading-relaxed mb-4">
                  Aşağıdaki tek kullanımlık güvenlik kodu ile AYBÜ Store <br/>
                  uygulamasına giriş yapabilirsin.
                </p>
                <span className="text-2xl font-black tracking-[0.3em] text-slate-900 bg-white px-6 py-2 rounded-xl border border-slate-100 shadow-sm">175773</span>
              </div>
            </div>
            <div className="bg-red-600 h-10 flex items-center justify-center gap-4">
              {[1, 2, 3].map(i => <div key={i} className="h-5 w-5 rounded-full border border-white/30 flex items-center justify-center text-[10px] text-white">●</div>)}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="h-14 w-full rounded-xl border-2 border-slate-100 bg-slate-50 text-center text-xl font-black text-slate-900 focus:border-red-500 focus:ring-red-500 transition-all"
                  onChange={(e) => {
                    if (e.target.value && i < 6) {
                      (e.target.parentElement?.children[i] as HTMLInputElement)?.focus();
                    }
                  }}
                />
              ))}
            </div>

            <Button
              fullWidth
              onClick={() => {
                setAuthSubmitStatus("success");
                setTimeout(() => navigateToView("home"), 1000);
              }}
            >
              Doğrula ve Devam Et
            </Button>
            
            <button 
              onClick={() => setAuthSubmitStatus("idle")}
              className="text-xs text-slate-500 hover:text-slate-800 transition-colors text-center"
            >
              Kodu tekrar gönder veya bilgileri değiştir
            </button>
          </div>
        </AuthCard>
      </AuthShell>
    );
  }

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
