import { useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { siteConfig } from "../../data/siteConfig";

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <button
      className="lang-toggle"
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      type="button"
    >
      {language === "en" ? "AR" : "EN"}
    </button>
  );
}

export default function SiteLayout({ children }) {
  const { t, dir, language } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const brandName = language === "ar" ? siteConfig.brandNameAr : siteConfig.brandNameEn;
  const poweredByNumber = "0561289183";
  const poweredByDigits = poweredByNumber.replace(/\D/g, "");
  const poweredByWhatsapp = `https://wa.me/${
    poweredByDigits.startsWith("0") ? `966${poweredByDigits.slice(1)}` : poweredByDigits
  }`;

  return (
    <div className="app-shell" dir={dir}>
      <header className="topbar">
        <div className={`brand ${language === "ar" ? "brand-ar" : "brand-en"}`}>{brandName}</div>
        {isHome && (
          <nav className="top-links">
            <a href="#about">{t.navAbout}</a>
            <a href="#services">{t.navServices}</a>
            <a href="#pricing">{t.navPricing}</a>
            <a href="#contact">{t.navContact}</a>
          </nav>
        )}
        <LanguageToggle />
      </header>
      <main>{children}</main>
      <footer className="footer" id="contact">
        <div className="footer-main">
          <div className="footer-col">
            <h4>{language === "ar" ? "مواقعنا" : "Our Locations"}</h4>
            <div className="footer-location-list">
              {siteConfig.locations.map((branch) => (
                <a key={branch.key} href={branch.mapLink} target="_blank" rel="noreferrer">
                  {language === "ar"
                    ? `${branch.nameAr} - ${branch.cityAr}`
                    : `${branch.nameEn} - ${branch.cityEn}`}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>{language === "ar" ? "اتصل بنا" : "Contact Us"}</h4>
            <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>
          </div>
          <div className="footer-col">
            <h4>{language === "ar" ? "ساعات العمل" : "Working Hours"}</h4>
            <p>5AM - 12AM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <a href={poweredByWhatsapp} target="_blank" rel="noreferrer">
            Powered by 7j
          </a>
        </div>
      </footer>
    </div>
  );
}
