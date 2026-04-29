import { business } from "@content/business";
import { services } from "@content/services";

/**
 * Gera o JSON-LD AutomotiveBusiness + lista de Services para a landing.
 */
export function getBusinessJsonLd(siteUrl: string): Record<string, unknown> {
  const businessId = `${siteUrl}/#business`;

  return {
    "@context": "https://schema.org",
    "@type": ["AutomotiveBusiness", "LocalBusiness"],
    "@id": businessId,
    name: business.name,
    description: business.description,
    image: `${siteUrl}/og-image.jpg`,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.jpg`,
      width: 400,
      height: 400,
    },
    url: `${siteUrl}/`,
    telephone: business.whatsapp.e164,
    priceRange: "$$",
    currenciesAccepted: "BRL",
    paymentAccepted: "Cash, Credit Card, Debit Card, PIX",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -22.848,
      longitude: -47.0576,
    },
    areaServed: [
      { "@type": "City", name: "Campinas", addressRegion: "SP" },
      { "@type": "City", name: "Valinhos", addressRegion: "SP" },
      { "@type": "City", name: "Vinhedo", addressRegion: "SP" },
      { "@type": "City", name: "Americana", addressRegion: "SP" },
      { "@type": "City", name: "Sumaré", addressRegion: "SP" },
      { "@type": "City", name: "Hortolândia", addressRegion: "SP" },
    ],
    openingHoursSpecification: business.schemaHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [business.maps.url, business.social.instagram, business.social.facebook].filter(
      Boolean,
    ),
    hasMap: business.maps.url,
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
          areaServed: { "@type": "City", name: "Campinas", addressRegion: "SP" },
        },
      })),
    },
  };
}

/**
 * Gera JSON-LD de FAQ com perguntas frequentes sobre a ALL PRO.
 * Aumenta a chance de rich results no Google.
 */
export function getFaqJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quais serviços de estética automotiva a ALL PRO oferece?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A ALL PRO Estética Automotiva oferece PPF (Película de Proteção de Pintura), vitrificação cerâmica, polimento técnico, insulfilm, higienização interna, envelopamento automotivo, pintura automotiva, funilaria e martelinho de ouro. Todos os serviços são realizados com materiais premium e mão de obra especializada.",
        },
      },
      {
        "@type": "Question",
        name: "Onde fica a ALL PRO Estética Automotiva em Campinas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A ALL PRO fica na Rua José Pugliesi Filho, 420 — Chácara Santa Margarida, Campinas - SP, CEP 13085-415. Atendemos de segunda a sexta das 08h às 17h e aos sábados das 08h às 16h.",
        },
      },
      {
        "@type": "Question",
        name: "Como solicitar um orçamento na ALL PRO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Você pode solicitar um orçamento pelo WhatsApp (19) 99114-2508 ou ligando diretamente para o mesmo número. Respondemos rápido e orientamos sobre o melhor serviço para o seu carro.",
        },
      },
      {
        "@type": "Question",
        name: "A ALL PRO faz atendimento aos sábados?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sim! A ALL PRO atende aos sábados das 08h às 16h. De segunda a sexta o atendimento é das 08h às 17h. Domingos fechado.",
        },
      },
      {
        "@type": "Question",
        name: "O que é PPF e por que é importante para o meu carro?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PPF (Paint Protection Film) é uma película transparente aplicada sobre a pintura do veículo que protege contra riscos, impactos de pedras e raios UV. Mantém o brilho original por anos e valoriza o carro na revenda. Na ALL PRO utilizamos apenas materiais premium de alta performance.",
        },
      },
      {
        "@type": "Question",
        name: "Qual a diferença entre vitrificação e polimento?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O polimento remove oxidação, riscos finos e marcas, restaurando o brilho da pintura. Já a vitrificação cerâmica cria uma camada protetora sobre a pintura (ou após o polimento), que repele água, sujeira e raios UV, preservando o brilho por anos. Na ALL PRO os dois serviços podem ser feitos em conjunto para um resultado completo.",
        },
      },
    ],
  };
}
