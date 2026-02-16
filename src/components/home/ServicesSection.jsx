import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { siteConfig } from "../../data/siteConfig";

export default function ServicesSection() {
  const { language, t } = useLanguage();
  const isArabic = language === "ar";
  const formatPrice = (value) => (value === "-" ? value : `${value} ريال`);

  const priceModes = [
    { id: "prices-ironing", title: t.priceIroning, field: "ironing" },
    { id: "prices-regular", title: t.priceRegular, field: "regular" },
    { id: "prices-express", title: t.priceExpress, field: "express" }
  ];

  const [activeModeId, setActiveModeId] = useState(priceModes[0].id);
  const activeMode = priceModes.find((mode) => mode.id === activeModeId) ?? priceModes[0];

  return (
    <section className="card section-glow" id="services">
      <h2>{t.servicesTitle}</h2>

      <nav className="prices-nav" aria-label="Price navigation">
        {priceModes.map((mode) => (
          <button
            type="button"
            key={mode.id}
            className={`prices-chip${mode.id === activeMode.id ? " is-active" : ""}`}
            onClick={() => setActiveModeId(mode.id)}
          >
            {mode.title}
          </button>
        ))}
      </nav>

      <div id="pricing" className="pricing-sections">
        <section className="price-block">
          <h3>{activeMode.title}</h3>
          <div className="pricing-wrap">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>{t.serviceLabel}</th>
                  <th>{activeMode.title}</th>
                </tr>
              </thead>
              <tbody>
                {siteConfig.priceList
                  .filter((item) => item[activeMode.field] !== "-")
                  .map((item) => (
                    <tr key={`${activeMode.id}-${item.key}`}>
                      <td>{isArabic ? item.nameAr : item.nameEn}</td>
                      <td>{formatPrice(item[activeMode.field])}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  );
}
