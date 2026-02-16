import { useEffect, useMemo, useState } from "react";
import StaffDashboard from "../components/staff/StaffDashboard";
import StaffLogin from "../components/staff/StaffLogin";
import SiteLayout from "../components/layout/SiteLayout";
import { siteConfig } from "../data/siteConfig";
import { useLanguage } from "../context/LanguageContext";
import { useSeo } from "../hooks/useSeo";
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

  const login = ({ username, password }) => {
    if (username === siteConfig.staffAuth.username && password === siteConfig.staffAuth.password) {
      localStorage.setItem(STAFF_AUTH_KEY, "true");
      setIsAuthenticated(true);
      setShowError(false);
      return;
    }
    setShowError(true);
  };

  const logout = () => {
    localStorage.removeItem(STAFF_AUTH_KEY);
    setIsAuthenticated(false);
  };

  const brandName = language === "ar" ? siteConfig.brandNameAr : siteConfig.brandNameEn;
  const seoTitle = useMemo(() => `${brandName} | Staff Dashboard`, [brandName]);
  useSeo({ title: seoTitle, description: "Staff control panel for managing laundry receipts and status updates." });

  return (
    <SiteLayout>
      {!isAuthenticated ? (
        <StaffLogin onLogin={login} error={showError} />
      ) : (
        <StaffDashboard receipts={receipts} onLogout={logout} />
      )}
    </SiteLayout>
  );
}
