import { siteConfig } from "../../data/siteConfig";
import { useLanguage } from "../../context/LanguageContext";
import Lottie from "lottie-react";
import washingMachineAnimation from "../../assets/Washing Machine.json";

export default function HeroSection() {
  const { t } = useLanguage();
  const whatsappMessage = encodeURIComponent(t.deliveryWhatsappMsg);
  const cleanPhone = siteConfig.whatsappNumber.replace(/\D/g, "");

  return (
    <section className="hero section-glow" id="about">
      <div className="hero-grid">
        <div>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSubtitle}</p>
          <div className="hero-actions">
            <a href={`tel:${siteConfig.contact.phone}`} className="btn btn-primary">
              {t.ctaCall}
            </a>
            <a
              href={`https://wa.me/${cleanPhone}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              {t.ctaDelivery}
            </a>
          </div>
        </div>
        <div className="hero-animation" aria-hidden="true">
          <Lottie className="hero-lottie" animationData={washingMachineAnimation} loop autoplay />
        </div>
      </div>
    </section>
  );
}
