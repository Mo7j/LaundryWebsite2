import { useEffect } from "react";

export function useSeo({
  title,
  description,
  image = "/social-preview.svg",
  shareTitle = "مغاسل ترتيب | Tartib Laundry"
}) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector, content) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute("content", content);
      }
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', shareTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:image"]', image);
    setMeta('meta[name="twitter:title"]', shareTitle);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', image);
  }, [description, image, shareTitle, title]);
}
