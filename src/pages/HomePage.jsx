import { useEffect, useMemo, useState } from "react";
import HeroSection from "../components/home/HeroSection";
import LocationsSection from "../components/home/LocationsSection";
import ReviewsSection from "../components/home/ReviewsSection";
import ServicesSection from "../components/home/ServicesSection";
import StatusCard from "../components/home/StatusCard";
import SiteLayout from "../components/layout/SiteLayout";
import { useLanguage } from "../context/LanguageContext";
import { siteConfig } from "../data/siteConfig";
import { useSeo } from "../hooks/useSeo";
import { subscribeToReceipts } from "../services/receiptService";

export default function HomePage() {
  const { t, language } = useLanguage();
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToReceipts(setReceipts);
    return () => unsubscribe();
  }, []);

  const brandName = language === "ar" ? siteConfig.brandNameAr : siteConfig.brandNameEn;
  const seoTitle = useMemo(() => `${brandName} | Laundry Service`, [brandName]);
  const seoDescription = useMemo(
    () => "Premium laundry service with real-time receipt tracking, pricing calculator, and WhatsApp delivery requests.",
    []
  );

  useSeo({ title: seoTitle, description: seoDescription });

  return (
    <SiteLayout>
      <div className="page-sections">
        <HeroSection />
        <StatusCard receipts={receipts} />
        <LocationsSection />
        <ServicesSection />
        <ReviewsSection />
        <section className="card section-glow cta-center">
          <a
            href={siteConfig.locations[0]?.mapLink ?? "https://maps.google.com"}
            target="_blank"
            rel="noreferrer"
            className="maps-stack"
          >
            <img
              className="maps-logo-large"
              src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg"
              alt=""
              aria-hidden="true"
            />
            <span className="maps-wordmark-small">
              <span className="g-blue">G</span>
              <span className="g-red">o</span>
              <span className="g-yellow">o</span>
              <span className="g-blue">g</span>
              <span className="g-green">l</span>
              <span className="g-red">e</span>
              <span className="maps-gap"> </span>
              <span className="g-green">M</span>
              <span className="g-red">a</span>
              <span className="g-yellow">p</span>
              <span className="g-blue">s</span>
            </span>
          </a>
        </section>
      </div>
    </SiteLayout>
  );
}
