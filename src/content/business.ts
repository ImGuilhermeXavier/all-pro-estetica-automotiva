/**
 * Fonte única da verdade dos dados oficiais do negócio.
 * Mudanças aqui propagam para Header, Footer, JSON-LD, links WhatsApp e seção de localização.
 *
 * Dados confirmados via Google Business Profile + WhatsApp Business em 2026-04-29.
 */

export const business = {
  name: "ALL PRO Estética Automotiva",
  shortName: "ALL PRO",
  legalName: "", // pendente — a preencher quando cliente fornecer razão social/CNPJ
  cnpj: "", // pendente
  taglinePrimary: "SEU CARRO NOVO DE NOVO",
  taglineSecondary: "O detalhe faz a diferença",
  description:
    "Estética automotiva premium em Campinas. PPF, vitrificação, polimento, insulfilm, envelopamento, funilaria e martelinho de ouro.",

  // Contato
  whatsapp: {
    raw: "5519991142508", // formato wa.me
    pretty: "+55 (19) 99114-2508",
    e164: "+5519991142508", // formato tel:
  },

  // Endereço
  address: {
    street: "Rua José Pugliesi Filho, 420",
    neighborhood: "Chácara Santa Margarida",
    city: "Campinas",
    state: "SP",
    postalCode: "13085-415",
    country: "BR",
  },

  // Google Maps (CID confirmado da ficha real)
  maps: {
    cid: "6271074181028102604",
    url: "https://www.google.com/maps?cid=6271074181028102604",
    embedSrc:
      "https://www.google.com/maps?cid=6271074181028102604&output=embed",
  },

  // Horário (Seg–Sex 08–17, Sáb 08–16, Dom fechado)
  hours: [
    { day: "Segunda-feira", short: "Seg", open: "08:00", close: "17:00" },
    { day: "Terça-feira", short: "Ter", open: "08:00", close: "17:00" },
    { day: "Quarta-feira", short: "Qua", open: "08:00", close: "17:00" },
    { day: "Quinta-feira", short: "Qui", open: "08:00", close: "17:00" },
    { day: "Sexta-feira", short: "Sex", open: "08:00", close: "17:00" },
    { day: "Sábado", short: "Sáb", open: "08:00", close: "16:00" },
    { day: "Domingo", short: "Dom", open: null, close: null },
  ] as const,

  // Schema.org dayOfWeek mapping (para JSON-LD)
  schemaHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    {
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "16:00",
    },
  ],

  // Redes sociais (pendente — preencher quando cliente confirmar handles)
  social: {
    instagram: "", // ex.: "https://instagram.com/allproestetica"
    facebook: "",
    tiktok: "",
  },
} as const;

export type Business = typeof business;
