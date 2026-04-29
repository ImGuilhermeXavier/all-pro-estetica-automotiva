# ALL PRO Estética Automotiva — Landing Page

Landing page institucional da [ALL PRO Estética Automotiva](https://www.google.com/maps?cid=6271074181028102604), em Campinas-SP.

## Stack

- **Astro 5** (output estático)
- **TailwindCSS 4** (via `@tailwindcss/vite`)
- **TypeScript** strict
- **Lucide icons** via `astro-icon`
- Fontes self-hosted: **Manrope** + **Rajdhani**

## Documentação

- [`docs/DECISOES-INICIAIS.md`](./docs/DECISOES-INICIAIS.md) — escopo, dados oficiais, decisões travadas
- [`docs/PLANO-TECNICO.md`](./docs/PLANO-TECNICO.md) — blueprint técnico completo
- [`docs/DESIGN.md`](./docs/DESIGN.md) — sistema de design (paleta, tipografia, componentes)

## Setup local

```bash
nvm use            # Node 20
npm install
cp .env.example .env
npm run dev        # http://localhost:4321
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | `astro check` + build de produção |
| `npm run preview` | Preview do build |
| `npm run check` | Type check |
| `npm run format` | Prettier write |

## Estrutura

```
src/
├── assets/          # imagens otimizadas pelo Astro
├── components/
│   ├── layout/      # Header, Footer, WhatsAppFloat
│   ├── sections/    # Hero, About, Services, Gallery, Location, ContactCTA
│   └── ui/          # Button, ServiceCard
├── content/         # business.ts, services.ts (fonte da verdade dos dados)
├── layouts/         # BaseLayout.astro
├── lib/             # whatsapp.ts, seo.ts (helpers)
├── pages/           # index.astro (única rota)
└── styles/          # tokens.css (design tokens via @theme)
```

## Deploy

Vercel — deploy automático em push para `main`. Domínio customizado configurável via dashboard.

## Contato

- WhatsApp: +55 (19) 99114-2508
- Endereço: Rua José Pugliesi Filho, 420 — Chácara Santa Margarida, Campinas-SP, 13085-415
- Horário: Seg-Sex 08:00–17:00, Sáb 08:00–16:00
