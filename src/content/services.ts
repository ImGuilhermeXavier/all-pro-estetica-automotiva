/**
 * Catálogo dos 9 serviços da ALL PRO.
 * Mensagens WhatsApp pré-preenchidas conforme microcopy de docs/DESIGN.md §10.
 * Ícones Lucide conforme mapa em docs/DESIGN.md §6.2.
 */

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  /** Frase de 1-2 linhas focada no benefício, não na tecnologia (DESIGN.md §10.3). */
  description: string;
  /** Ícone Lucide via astro-icon: "lucide:nome-do-icone". */
  icon: string;
  /** Mensagem pré-preenchida do WhatsApp para este serviço. */
  whatsappMessage: string;
  highlight?: boolean;
};

export const services: Service[] = [
  {
    slug: "ppf",
    name: "PPF — Película de Proteção de Pintura",
    shortName: "PPF",
    description:
      "Película transparente que protege a pintura contra riscos, pedras e raios UV. Mantém o brilho original por anos.",
    icon: "lucide:shield-check",
    whatsappMessage:
      "Olá! Tenho interesse em PPF. Pode me passar um orçamento?",
    highlight: true,
  },
  {
    slug: "vitrificacao",
    name: "Vitrificação Cerâmica",
    shortName: "Vitrificação",
    description:
      "Camada cerâmica que faz a água escorrer, repele sujeira e mantém o brilho profundo por anos.",
    icon: "lucide:gem",
    whatsappMessage:
      "Olá! Tenho interesse em vitrificação cerâmica. Pode me passar um orçamento?",
    highlight: true,
  },
  {
    slug: "polimento",
    name: "Polimento Técnico e Cristalização",
    shortName: "Polimento",
    description:
      "Remove riscos finos, marcas de lavagem e devolve o brilho original da pintura.",
    icon: "lucide:sparkles",
    whatsappMessage:
      "Olá! Quero fazer um polimento técnico. Pode me passar um orçamento?",
  },
  {
    slug: "insulfilm",
    name: "Insulfilm Profissional",
    shortName: "Insulfilm",
    description:
      "Bloqueia o calor do sol, dá privacidade e protege o interior. Aplicação dentro da lei.",
    icon: "lucide:sun-dim",
    whatsappMessage:
      "Olá! Quero aplicar insulfilm no meu carro. Pode me passar um orçamento?",
  },
  {
    slug: "higienizacao",
    name: "Higienização Interna",
    shortName: "Higienização",
    description:
      "Remove sujeira profunda, manchas e odores dos bancos, teto e carpetes. Seu carro cheira a novo de novo.",
    icon: "lucide:spray-can",
    whatsappMessage:
      "Olá! Quero fazer higienização interna no meu carro. Pode me passar um orçamento?",
  },
  {
    slug: "envelopamento",
    name: "Envelopamento Automotivo",
    shortName: "Envelopamento",
    description:
      "Mude a cor do seu carro sem pintar. Reversível e sem perder a originalidade da pintura.",
    icon: "lucide:wallpaper",
    whatsappMessage:
      "Olá! Tenho interesse em envelopamento automotivo. Pode me passar um orçamento?",
  },
  {
    slug: "pintura",
    name: "Pintura Automotiva",
    shortName: "Pintura",
    description:
      "Pintura nova com acabamento de fábrica. Cores sólidas, perolizadas ou metálicas.",
    icon: "lucide:paint-bucket",
    whatsappMessage:
      "Olá! Preciso de uma pintura no meu carro. Pode me passar um orçamento?",
  },
  {
    slug: "funilaria",
    name: "Funilaria",
    shortName: "Funilaria",
    description:
      "Reparo de amassados, pequenos e grandes, devolvendo o formato original da carroceria.",
    icon: "lucide:hammer",
    whatsappMessage:
      "Olá! Preciso de um serviço de funilaria. Pode me passar um orçamento?",
  },
  {
    slug: "martelinho-de-ouro",
    name: "Martelinho de Ouro",
    shortName: "Martelinho de Ouro",
    description:
      "Corrige amassados sem pintar — economiza tempo e mantém a pintura original do veículo.",
    icon: "lucide:circle-dot",
    whatsappMessage:
      "Olá! Tenho um amassado no carro. Pode me passar um orçamento de martelinho?",
  },
];
