import { useLanguage } from "../../context/LanguageContext";
import { siteConfig } from "../../data/siteConfig";

function Stars({ value, total = 5 }) {
  return (
    <span className="stars" aria-label={`${value} of ${total}`}>
      {Array.from({ length: total }).map((_, index) => (
        <span key={`star-${index}`} className={index < value ? "star is-filled" : "star"}>
          {"\u2605"}
        </span>
      ))}
    </span>
  );
}

export default function ReviewsSection() {
  const { language, t } = useLanguage();
  const averageRating = 4.1;
  const totalReviews = 102;
  const getInitial = (name) => (name?.trim()?.[0] ?? "U").toUpperCase();

  return (
    <section className="card section-glow reviews-shell" id="reviews">
      <h2>{t.reviewsTitle}</h2>

      <div className="reviews-summary">
        <p className="reviews-score">{averageRating}</p>
        <Stars value={Math.round(averageRating)} />
        <p className="reviews-count">
          ({totalReviews.toLocaleString()} {t.reviewsCountLabel})
        </p>
      </div>

      <div className="review-stack">
        {siteConfig.reviews.map((review) => (
          <article className="review-comment" key={review.key}>
            <div className="review-head">
              <span className="review-avatar" aria-hidden="true">{getInitial(review.name)}</span>
              <div className="review-meta">
                <strong>{review.name}</strong>
                <span>{language === "ar" ? review.profileInfoAr : review.profileInfoEn}</span>
              </div>
            </div>
            <div className="review-rating-line">
              <Stars value={review.rating ?? 0} />
            </div>
            <p>{language === "ar" ? review.textAr : review.textEn}</p>
            {typeof review.likes === "number" ? (
              <div className="review-like">
                <span aria-hidden="true">{"\u2661"}</span>
                <span>
                  {review.likes} {t.reviewsLikedLabel}
                </span>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
