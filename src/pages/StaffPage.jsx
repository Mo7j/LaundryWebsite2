import { useEffect, useMemo, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import StaffDashboard from "../components/staff/StaffDashboard";
import StaffLogin from "../components/staff/StaffLogin";
import SiteLayout from "../components/layout/SiteLayout";
import { siteConfig } from "../data/siteConfig";
import { useLanguage } from "../context/LanguageContext";
import { useSeo } from "../hooks/useSeo";
import { auth } from "../services/firebase";
import { subscribeToReceipts } from "../services/receiptService";

const STAFF_AUTH_KEY = "laundry-staff-auth";

export default function StaffPage() {
  const { language } = useLanguage();
  const [receipts, setReceipts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(STAFF_AUTH_KEY) === "true");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToReceipts(setReceipts);
    return () => unsubscribe();
  }, []);

  const login = async ({ username, password }) => {
    const user = String(username || "").trim();
    const pass = String(password || "").trim();

    if (user === siteConfig.staffAuth.username && pass === siteConfig.staffAuth.password) {
      localStorage.setItem(STAFF_AUTH_KEY, "true");
      setIsAuthenticated(true);
      setShowError(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, user, pass);
      localStorage.setItem(STAFF_AUTH_KEY, "true");
      setIsAuthenticated(true);
      setShowError(false);
    } catch {
      setShowError(true);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      // Keep local fallback logout behavior even if Firebase sign-out fails.
    }
    localStorage.removeItem(STAFF_AUTH_KEY);
    setIsAuthenticated(false);
  };

  const brandName = language === "ar" ? siteConfig.brandNameAr : siteConfig.brandNameEn;
  const seoTitle = useMemo(() => `${brandName} | Staff Dashboard`, [brandName]);
  useSeo({ title: seoTitle, description: "Staff control panel for managing laundry receipts and status updates." });

  return (
    <SiteLayout hideFooter showLogout={isAuthenticated} onLogout={logout}>
      {!isAuthenticated ? (
        <StaffLogin onLogin={login} error={showError} />
      ) : (
        <StaffDashboard receipts={receipts} onLogout={logout} />
      )}
    </SiteLayout>
  );
}
