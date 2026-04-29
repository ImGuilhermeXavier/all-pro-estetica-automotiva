// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

const SITE = process.env.PUBLIC_SITE_URL ?? "https://allproesteticaautomotiva.com.br";

export default defineConfig({
  site: SITE,
  trailingSlash: "never",
  build: {
    inlineStylesheets: "auto",
  },
  integrations: [
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push", "gtag"],
      },
    }),
    icon({
      include: {
        lucide: [
          "shield-check",
          "sparkles",
          "gem",
          "spray-can",
          "wallpaper",
          "sun-dim",
          "paint-bucket",
          "hammer",
          "circle-dot",
          "message-circle",
          "message-circle-more",
          "phone",
          "map-pin",
          "clock",
          "mail",
          "check",
          "arrow-right",
          "chevron-right",
          "instagram",
          "facebook",
          "menu",
          "x",
          "external-link",
          "star",
        ],
      },
    }),
  ],
  vite: {
    // Cast: tailwindcss() retorna um Plugin do Vite, mas a versão do Vite que o
    // tailwindcss usa difere ligeiramente da do Astro — o runtime é compatível.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
  image: {
    responsiveStyles: true,
  },
});
