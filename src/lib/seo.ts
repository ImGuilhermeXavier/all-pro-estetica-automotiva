import { business } from "@content/business";
import { services } from "@content/services";

/**
 * Gera o JSON-LD AutomotiveBusiness + lista de Services para a landing.
 * Spec: docs/PLANO-TECNICO.md §5.3.
 */
export function getBusinessJsonLd(siteUrl: string): Record<string, unknown> {
  const businessId = `${siteUrl}/#business`;

  const automotiveBusiness = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": businessId,
    name: business.name,
    description: business.description,
    image: `${siteUrl}/og-image.jpg`,
    logo: `${siteUrl}/logo.svg`,
    url: `${siteUrl}/`,
    telephone: business.whatsapp.e164,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    openingHoursSpecification: business.schemaHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [business.maps.url, business.social.instagram, business.social.facebook].filter(
      Boolean,
    ),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de Estética Automotiva",
      itemListElement: services.map((s, idx) => ({
        "@type": "Offer",
        position: idx + 1,
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          provider: { "@id": businessId },
        },
      })),
    },
  };

  return automotiveBusiness;
}
