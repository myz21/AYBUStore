import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { firebaseConfig, hasValidFirebaseConfig } from "./firebase-config.js";

(function () {
  var registerForm = document.getElementById("registerForm");
  var loginForm = document.getElementById("loginForm");
  if (!registerForm && !loginForm) return;

  var auth = null;

  if (!hasValidFirebaseConfig()) {
    disableAuthForms("Firebase ayarları eksik. ui/firebase-config.js dosyasına proje bilgilerini girin.");
    return;
  }

  try {
    var app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    auth.languageCode = "tr";
  } catch (err) {
    disableAuthForms("Firebase başlatılamadı. Proje ayarlarını kontrol edin.");
    return;
  }

  if (registerForm) setupRegisterFlow(registerForm, auth);
  if (loginForm) setupLoginFlow(loginForm, auth);

  function disableAuthForms(message) {
    if (registerForm) {
      setStatus(document.getElementById("registerStatus"), message, "error");
      setSubmitDisabled(registerForm, true);
    }
    if (loginForm) {
      setStatus(document.getElementById("loginStatus"), message, "error");
      setSubmitDisabled(loginForm, true);
    }
  }
})();

function setupRegisterFlow(form, auth) {
  var statusEl = document.getElementById("registerStatus");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    var name = (form.querySelector("#regName") || {}).value || "";
    var email = (form.querySelector("#regEmail") || {}).value || "";
    var password = (form.querySelector("#regPassword") || {}).value || "";

    if (!name.trim() || !email.trim() || !password.trim()) {
      setStatus(statusEl, "Lutfen ad soyad, e-posta ve sifre alanlarini doldurun.", "error");
      return;
    }

    if (password.length < 6) {
      setStatus(statusEl, "Sifre en az 6 karakter olmali.", "error");
      return;
    }

    try {
      setSubmitDisabled(form, true);
      setStatus(statusEl, "Hesap olusturuluyor...", "info");

      var userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (name.trim()) {
        await updateProfile(userCredential.user, { displayName: name.trim() });
      }

      await sendEmailVerification(userCredential.user);
      await signOut(auth);

      setStatus(
        statusEl,
        "Uyelik tamamlandi. Aktivasyon e-postasi gonderildi. Mail dogrulamadan giris yapamazsiniz.",
        "success"
      );

      window.setTimeout(function () {
        window.location.href = "login.html";
      }, 1700);
    } catch (err) {
      setStatus(statusEl, mapAuthError(err), "error");
    } finally {
      setSubmitDisabled(form, false);
    }
  });
}

function setupLoginFlow(form, auth) {
  var statusEl = document.getElementById("loginStatus");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    var email = (form.querySelector("#email") || {}).value || "";
    var password = (form.querySelector("#password") || {}).value || "";

    if (!email.trim() || !password.trim()) {
      setStatus(statusEl, "Lutfen e-posta ve sifre alanlarini doldurun.", "error");
      return;
    }

    try {
      setSubmitDisabled(form, true);
      setStatus(statusEl, "Giris yapiliyor...", "info");

      var userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      var user = userCredential.user;

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        await signOut(auth);
        setStatus(
          statusEl,
          "E-posta aktivasyonu tamamlanmamis. Yeni aktivasyon maili gonderildi.",
          "error"
        );
        return;
      }

      setStatus(statusEl, "Giris basarili. Ana sayfaya yonlendiriliyorsunuz...", "success");
      window.setTimeout(function () {
        window.location.href = "index.html";
      }, 900);
    } catch (err) {
      setStatus(statusEl, mapAuthError(err), "error");
    } finally {
      setSubmitDisabled(form, false);
    }
  });
}

function setSubmitDisabled(form, isDisabled) {
  var submit = form.querySelector('button[type="submit"]');
  if (submit) submit.disabled = isDisabled;
}

function setStatus(el, message, type) {
  if (!el) return;

  el.textContent = message;
  el.classList.remove("is-info", "is-success", "is-error");
  el.classList.add("is-visible");
  el.classList.add(type === "success" ? "is-success" : type === "info" ? "is-info" : "is-error");
}

function mapAuthError(err) {
  var code = err && err.code ? String(err.code) : "";

  switch (code) {
    case "auth/email-already-in-use":
      return "Bu e-posta ile zaten bir hesap var.";
    case "auth/invalid-email":
      return "E-posta formati gecersiz.";
    case "auth/user-not-found":
      return "Bu e-posta ile kayitli bir hesap bulunamadi.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "E-posta veya sifre hatali.";
    case "auth/weak-password":
      return "Sifre zayif. Daha guclu bir sifre secin.";
    case "auth/too-many-requests":
      return "Cok fazla deneme yapildi. Lutfen daha sonra tekrar deneyin.";
    default:
      console.error("Firebase Auth Error:", err);
      return "Islem su an tamamlanamadi (" + code + " - " + (err && err.message ? err.message : "") + "). Lutfen tekrar deneyin.";
  }
}
