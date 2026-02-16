import { siteConfig } from "../../data/siteConfig";
import { useLanguage } from "../../context/LanguageContext";

export default function PromoSection() {
  const { t } = useLanguage();

  return (
    <section className="promo-split">
      <div className="promo-media">
        <span>{t.promoPickupTeam}</span>
      </div>
      <div className="promo-content">
        <div className="promo-badge">{t.promoStartingAt}</div>
        <h2>{t.promoTitle}</h2>
        <p>{t.promoDesc}</p>
        <strong>{siteConfig.contact.phone}</strong>
      </div>
    </section>
  );
}
