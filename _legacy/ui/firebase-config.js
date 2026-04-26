export const firebaseConfig = {
  apiKey: "AIzaSyCJLlHWqH0GmZPa8astYW5Ug7fcCIuYlIs",
  authDomain: "aybustore-myildiz-2026-fc992.firebaseapp.com",
  projectId: "aybustore-myildiz-2026-fc992",
  appId: "1:784696476326:web:a31c13751d5df8107fea67",
  storageBucket: "aybustore-myildiz-2026-fc992.firebasestorage.app",
  messagingSenderId: "784696476326",
  measurementId: "G-88EDYYBZDS"
};

export function hasValidFirebaseConfig() {
  return Object.keys(firebaseConfig).every(function (key) {
    var value = String(firebaseConfig[key] || "").trim();
    return value !== "" && value.indexOf("YOUR_") !== 0;
  });
}
