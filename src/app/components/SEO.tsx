import { useEffect } from "react";

const SITE = "https://aura-sustainable.com";
const DEFAULT_DESC =
  "Aura es moda sostenible y ética: lino orgánico, algodón reciclado, bambú y lana reciclada. Slow fashion con materiales trazables, comercio justo y envases sin plástico.";

type SEOProps = {
  title: string;
  description?: string;
  image?: string;
  jsonLd?: object;
};

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function SEO({ title, description = DEFAULT_DESC, image, jsonLd }: SEOProps) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", SITE + window.location.pathname);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    if (image) setMeta("property", "og:image", image);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", SITE + window.location.pathname);

    const oldLd = document.getElementById("page-jsonld");
    oldLd?.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "page-jsonld";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, image, jsonLd]);

  return null;
}