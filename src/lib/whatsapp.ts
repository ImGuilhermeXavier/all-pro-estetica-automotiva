import { business } from "@content/business";

/**
 * Monta uma URL do WhatsApp (wa.me) com mensagem pré-preenchida.
 * `origin` é só semântico (vai pro analytics, não pra mensagem).
 */
export function getWhatsAppLink(message?: string): string {
  const phone = business.whatsapp.raw;
  const defaultMessage = "Olá! Vim pelo site da ALL PRO. Gostaria de um orçamento.";
  const text = encodeURIComponent(message ?? defaultMessage);
  return `https://wa.me/${phone}?text=${text}`;
}

/** Link tel: para click-to-call em mobile. */
export function getPhoneLink(): string {
  return `tel:${business.whatsapp.e164}`;
}
