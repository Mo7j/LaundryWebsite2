import { useLanguage } from "../../context/LanguageContext";
import { siteConfig } from "../../data/siteConfig";

export default function LocationsSection() {
  const { language, t } = useLanguage();
  return (
    <section className="card section-glow locations-showcase" id="locations">
      <div className="locations-head">
        <h2>{t.locationsTitle}</h2>
        <p className="section-subtitle locations-subtitle">{t.locationsSubtitle}</p>
      </div>
      <div className="location-grid">
        {siteConfig.locations.map((location) => (
          <article className="location-card" key={location.key}>
            <h3>{language === "ar" ? location.nameAr : location.nameEn}</h3>
            <p className="location-address">
              {language === "ar"
                ? `${location.cityAr} - ${location.addressAr}`
                : `${location.cityEn} - ${location.addressEn}`}
            </p>
            <a href={location.mapLink} target="_blank" rel="noreferrer" className="btn btn-primary full-width">
              {t.openMap}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
