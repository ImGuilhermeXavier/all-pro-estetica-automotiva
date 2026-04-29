# Plano Técnico — ALL PRO Estética Automotiva

> **Documento:** Blueprint técnico de planejamento
> **Data de criação:** 2026-04-29 · **Última revisão:** 2026-04-29
> **Cliente final:** ALL PRO Estética Automotiva (Campinas - SP)
> **Solicitante interno:** gxavier@esapiens.com.br
> **Status:** Decisões aprovadas — pronto para iniciar implementação.

> **Histórico de revisões:**
> - **v1 (2026-04-29 manhã):** versão inicial com escopo multi-page e stack Next.js (descartada).
> - **v2 (2026-04-29 tarde):** pivot para **landing page única** + **Astro 5** como stack oficial, após confirmação dos dados reais do negócio (endereço, WhatsApp, horário) e do design system validado em [`DESIGN.md`](./DESIGN.md).

> **Documentos irmãos:**
> - [`DECISOES-INICIAIS.md`](./DECISOES-INICIAIS.md) — referência rápida das decisões (fonte da verdade resumida).
> - [`DESIGN.md`](./DESIGN.md) — sistema de design completo (paleta validada, tipografia, componentes, microcopy).
> - [`BASE.MD`](./BASE.MD) — briefing original do cliente.

---

## 1. Análise & Objetivos do Site

### 1.1 Objetivo primário

O site **NÃO é um e-commerce nem uma plataforma SaaS**. É uma **landing page institucional de captação de leads para um negócio físico local em Campinas-SP**.

**Hierarquia de objetivos (ordem de prioridade):**

1. **Captação de leads via WhatsApp** — canal dominante de conversão para serviços automotivos no Brasil. O site existe para empurrar o visitante interessado para uma conversa direta no WhatsApp `+55 (19) 99114-2508`.
2. **SEO local em Campinas** — aparecer nas buscas "[serviço] + campinas" e fortalecer o Google Business Profile (CID `0x570670c2ad5e4bcc`) já existente.
3. **Prova social e credibilidade** — reduzir o atrito do "será que esse lugar é confiável?" através de fotos da fachada, do trabalho e (futuramente) de reviews do Google.
4. **Educação rápida do cliente** — explicar em 1-2 linhas serviços técnicos (PPF, vitrificação) que o cliente leigo não entende, para qualificar o lead antes do contato.

**O que o site NÃO precisa fazer (escopo cortado deliberadamente):**
- Pagamento online — serviços dependem de avaliação presencial.
- Agendamento online com calendário em tempo real — WhatsApp resolve com fricção menor.
- Cadastro/login de usuário — não há razão de negócio.
- Carrinho de compras — não se aplica.
- Formulário de contato — **cortado do MVP**. WhatsApp é canal único.
- Múltiplas páginas — **landing page única**.

### 1.2 Personas

**Persona A — "Carlos, o orgulhoso"** (público premium, alta margem):
- 35–55 anos, renda alta, possui carro novo ou semi-novo de R$ 150k+.
- Busca: PPF, vitrificação, proteção cerâmica, polimento técnico.
- Comportamento: pesquisa muito antes de decidir, compara qualidade do produto aplicado (Suntek, XPEL, 3M para PPF; nome da cerâmica para vitrificação), valoriza fotos de antes/depois e tempo de garantia.
- Jornada: Google → "PPF campinas" / Instagram → site → galeria → WhatsApp pedindo orçamento.
- **A landing precisa transmitir premium, técnico, confiável.**

**Persona B — "Marcelo, o reparo urgente"** (público de manutenção, ticket médio):
- 25–60 anos, qualquer faixa de renda, teve um problema (batida leve, risco profundo, amassado).
- Busca: martelinho de ouro, funilaria, pintura, polimento.
- Comportamento: decisão rápida, busca por proximidade e preço, quer resolver hoje ou esta semana.
- Jornada: Google → "martelinho de ouro perto de mim" → site → telefone/WhatsApp imediato.
- **A landing precisa ter telefone e WhatsApp visíveis em qualquer scroll, com endereço claro.**

**Persona C — "Juliana, a esteticista do carro"** (público de conservação, recorrente):
- 25–45 anos, classe média, carro popular ou intermediário, gosta de manter o veículo bonito.
- Busca: higienização, lavagem detalhada, insulfilm, envelopamento decorativo.
- Comportamento: busca em redes sociais, vê posts de antes/depois, valoriza preço transparente.
- **A landing precisa ter galeria visualmente atraente e CTAs simples.**

### 1.3 Jornada do usuário (fluxo crítico)

```
Descoberta (Google "[serviço] campinas" / Instagram / GBP / indicação)
   ↓
Aterrissagem na landing (única URL)
   ↓
Scroll pelo conteúdo: hero → serviços → galeria → localização
   ↓
Validação (fotos do trabalho, fachada real, endereço em Campinas)
   ↓
Decisão de contato → CTA WhatsApp (ou telefone clicável em mobile)
   ↓
Conversa no WhatsApp → orçamento → agendamento presencial
```

### 1.4 KPIs sugeridos

| KPI | Como medir | Meta inicial (3 meses) |
|---|---|---|
| Cliques no botão WhatsApp | GA4 event `click_whatsapp` | 50+/mês |
| Cliques em "Ligar" (mobile) | GA4 event `click_phone` | 20+/mês |
| Tempo médio na seção de Serviços | GA4 (scroll depth) | >45s |
| Taxa de rejeição da landing | GA4 | <55% |
| Posicionamento orgânico para "[serviço] campinas" | Search Console | Top 5 em 90 dias |
| Cliques de "Como chegar" no GBP | Google Business Profile insights | tendência crescente |
| Cliques em "Abrir no Google Maps" no site | GA4 event `click_directions` | 15+/mês |

---

## 2. Arquitetura de Informação

### 2.1 Decisão: **Landing page única (one-page)**

**Confirmado pelo cliente em 2026-04-29.**

**Por que one-page faz sentido aqui:**
- Negócio local pequeno em Campinas — uma página rica e bem estruturada cobre toda a oferta.
- Custo de manutenção zero (uma única fonte de conteúdo).
- Astro estático em uma única rota = Lighthouse 100 trivial, LCP <1s.
- Em mobile (>70% do tráfego), scroll vertical é o padrão de consumo natural.
- O Google indexa âncoras como destinos (`/#servicos`), permitindo que reviews e snippets apontem para seções específicas.

**Trade-off aceito vs multi-page:**
- Perdemos URLs dedicadas por serviço para SEO long-tail, mas ganhamos simplicidade total. Se a captação por SEO long-tail virar prioridade no futuro, o pivot para multi-page é factível mantendo a base Astro (criar `/servicos/[slug]/index.astro` por serviço).

### 2.2 Estrutura da landing (ordem vertical das seções)

```
1.  Header sticky                  — Logo + CTA WhatsApp
2.  Hero                           — "SEU CARRO NOVO DE NOVO" + CTA + foto carro.webp
3.  About / Posicionamento         — "O detalhe faz a diferença" + 3 diferenciais
4.  Serviços (#servicos)           — Grid de 9 cards
5.  Galeria / Antes-Depois (#galeria) — Grid de fotos do trabalho
6.  Localização (#localizacao)     — Mapa + endereço + horário + foto fachada.webp
7.  CTA final (#contato)           — Botão WhatsApp grande + telefone clicável
8.  Footer                         — NAP, redes sociais, copyright, política de privacidade
9.  Botão flutuante WhatsApp       — Fixed bottom-right, persistente
```

Detalhes visuais (cores, espaçamento, componentes) em [`DESIGN.md`](./DESIGN.md).

### 2.3 Navegação interna

- Header com âncoras suaves (`#servicos`, `#galeria`, `#localizacao`, `#contato`).
- Em mobile, header colapsa em menu hambúrguer (Sheet pattern).
- Botão WhatsApp do header sempre visível (mobile e desktop).
- `scroll-behavior: smooth` no html.

---

## 3. Stack Tecnológico

### 3.1 Decisão: **Astro 5 + TailwindCSS 4** (oficial, travado)

**Por quê Astro:**
- **Static-first, zero JS por padrão** — landing 100% estática em HTML/CSS gera Lighthouse 100 trivialmente. JS só é enviado nas "ilhas" que precisam de interatividade (lightbox da galeria, eventualmente).
- **`<Image>` nativo do Astro** — otimização automática de `carro.webp` e `fachada.webp` para AVIF/WebP responsivos. Crítico para um site cheio de fotos.
- **Build trivialmente rápido** — `npm run build` em segundos. Deploy em qualquer host estático.
- **Content collections** — modelagem tipada dos 9 serviços em TypeScript, sem CMS.
- **`@astrojs/sitemap`** — sitemap automático.
- **DX excelente para landing institucional** — sintaxe `.astro` é praticamente HTML+TypeScript, baixa curva.

**Versões a usar:**
- Astro **5.x** (última major estável)
- TailwindCSS **4.x** (configuração via `@theme` no CSS, não mais `tailwind.config`)
- TypeScript em modo `strict`
- Node **20 LTS** (travar via `.nvmrc`)

### 3.2 Stack completa

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | **Astro 5** | Static-first, zero JS, ótimo SEO |
| Styling | **TailwindCSS 4** | Tokens via `@theme`, velocidade de prototipação |
| UI components | **Componentes próprios** em `.astro` | shadcn/ui é overkill para landing; Tailwind + classes basta |
| Ícones | **`astro-icon` + lucide** | Mapa de ícones por serviço definido em `DESIGN.md` |
| Fontes | **`@fontsource-variable/manrope` + `@fontsource/rajdhani`** | Self-hosted, zero CLS |
| Imagens | **`astro:assets` `<Image>`** | AVIF/WebP automáticos, lazy loading |
| Hospedagem | **Vercel** (free tier) | Deploy via git, CDN global, HTTPS automático |
| Analytics | **GA4** via `@astrojs/partytown` | Tags de terceiros em web worker |
| Sitemap/Robots | **`@astrojs/sitemap`** + `public/robots.txt` | Geração automática |
| Lint/Format | **ESLint + Prettier + `prettier-plugin-astro`** | Padrão de código |
| Type checking | **`astro check`** no CI | Garante tipos antes do deploy |

### 3.3 Alternativas consideradas e rejeitadas

**Next.js 15 (App Router) com `output: 'export'`:**
- *Prós:* equipe da eSapiens já domina; ecossistema React vasto.
- *Contras:* overkill para landing estática; bundle maior por padrão; complexidade desnecessária de `'use client'` / Server Components para uma página que não precisa de nada disso.
- *Veredicto:* descartado. Astro entrega o mesmo resultado com ⅓ da complexidade.

**HTML/CSS estático puro (sem framework):**
- *Prós:* simplicidade máxima.
- *Contras:* sem componentização. Quando precisar trocar uma cor ou texto que aparece em 5 lugares, é busca-e-substitui frágil. Sem otimização de imagens automática.
- *Veredicto:* descartado. Astro adiciona componentização sem custo de runtime.

**WordPress / Elementor:**
- *Contras:* hospedagem cara, performance ruim por padrão, vulnerabilidades de segurança constantes, plugins desnecessários. Cliente final raramente edita o suficiente para justificar.
- *Veredicto:* descartado.

### 3.4 Hospedagem: **Vercel (free tier)**

**Por quê:**
- Integração nativa com Astro (preset `@astrojs/vercel` se quisermos SSR no futuro; output `static` funciona out-of-the-box).
- Free tier generoso para tráfego esperado (<50k visitas/mês no primeiro ano).
- Preview deploys em cada PR.
- CDN global, HTTPS automático, domínio customizado grátis.
- Logs e analytics básicos inclusos.

**Alternativa: Cloudflare Pages** — também excelente, free tier ainda mais permissivo. Vercel é o caminho mais curto pela familiaridade da equipe.

### 3.5 Domínio & DNS

**Pendência (cliente):** ainda não confirmado.

**Sugestões (em ordem de preferência):**
1. `allproesteticaautomotiva.com.br` (descritivo, mas longo)
2. `allprocampinas.com.br` (curto, geo-segmentado)
3. `allproestetica.com.br` (curto e direto)

**Recomendação:** comprar `.com.br` no Registro.br (~R$ 40/ano), apontar via CNAME para Vercel.

**E-mail profissional (opcional, futuro):** Zoho Mail Free ou Google Workspace.

### 3.6 Fonte única de conteúdo

Tudo em arquivos TypeScript dentro de `src/content/`:

```ts
// src/content/business.ts — NAP, horários, redes sociais
// src/content/services.ts — array tipado dos 9 serviços
// src/content/gallery.ts — metadados das fotos (placeholder no MVP)
// src/content/testimonials.ts — reviews curados (placeholder no MVP)
```

**Sem CMS no MVP.** Atualizações = PR no repo. Avaliar Sanity/Decap CMS apenas se cliente exigir autonomia editorial em fase futura.

### 3.7 Conversão & analytics

**Conversão:**
- WhatsApp via `wa.me/5519991142508?text=...` com mensagens pré-preenchidas por contexto (microcopy completo em `DESIGN.md` §10).
- Telefone clicável `tel:+5519991142508` em mobile.
- Sem formulário no MVP.

**Analytics MVP:**
- GA4 instalado via Partytown (web worker → não impacta INP).
- Eventos rastreados:
  - `click_whatsapp` com parâmetro `origin` (hero, service-card-ppf, footer, floating, etc.)
  - `click_phone` com parâmetro `origin`
  - `click_directions` (mapa)
  - `view_section` via Intersection Observer (services, gallery, location)
- Search Console verificado via meta tag.
- Meta Pixel adicionado apenas em Fase 2, se houver tráfego pago.

---

## 4. Design System & Identidade Visual

> **Sistema de design completo e validado em [`DESIGN.md`](./DESIGN.md).** Esta seção é apenas resumo executivo.

- **Tema escuro fixo** (sem toggle).
- **Paleta principal:**
  - Fundo: `#0A0A0A` (Neutral 950)
  - Cards: `#171717` (Neutral 800)
  - Bordas: `#262626` (Neutral 700)
  - Texto principal: `#FFFFFF`
  - Texto secundário: `#A3A3A3`
  - **Acento amarelo da marca: `#F5D300`** (validado contra `logo.jpg`; substitui o `#FFD60A` originalmente proposto)
  - Verde WhatsApp: `#25D366` (com **texto preto** — branco sobre verde falha em WCAG AA)
- **Tipografia:** Manrope (texto) + Rajdhani (display/títulos hero)
- **Slogans:**
  - Hero: **"SEU CARRO NOVO DE NOVO"**
  - Sub-tagline: **"O detalhe faz a diferença"**
- **Botão CTA amarelo:** texto preto sempre (branco sobre amarelo dá 1.32:1, falha total).
- **Iconografia:** lucide-icons. Mapa serviço→ícone definido em `DESIGN.md` §6.
- **Acessibilidade:** WCAG 2.1 AA mínimo, AAA onde fácil.

---

## 5. SEO & Marketing Local

### 5.1 Estratégia

**Fundação:**
1. **Google Business Profile já existe e ativo** (CID `0x570670c2ad5e4bcc`). NAP do site **idêntico** ao GBP.
2. **Schema.org JSON-LD** — tipo **`AutomotiveBusiness`** com `LocalBusiness` como fallback. Adicionado um `Service` por serviço (9 ao todo) na própria home.
3. **Reviews do Google** — reviews curados estaticamente no MVP (4-6 selecionados manualmente do GBP). Integração via Places API só em Fase 2.
4. **NAP consistente em todo lugar** — footer, seção de localização, JSON-LD. Mesma string exata.

### 5.2 Metadados (head)

```
Title:       ALL PRO Estética Automotiva | PPF, Vitrificação, Insulfilm e Polimento em Campinas - SP
Description: Estética automotiva premium em Campinas. PPF, vitrificação, polimento, insulfilm,
             envelopamento, funilaria e martelinho de ouro. O detalhe faz a diferença.
             Rua José Pugliesi Filho, 420 — Chácara Santa Margarida.
Lang:        pt-BR
Canonical:   https://[dominio]/
Robots:      index, follow
```

### 5.3 JSON-LD `AutomotiveBusiness` (no `BaseLayout`)

```jsonc
{
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "@id": "https://[dominio]/#business",
  "name": "ALL PRO Estética Automotiva",
  "image": "https://[dominio]/og-image.jpg",
  "logo": "https://[dominio]/logo.svg",
  "url": "https://[dominio]/",
  "telephone": "+5519991142508",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua José Pugliesi Filho, 420",
    "addressLocality": "Campinas",
    "addressRegion": "SP",
    "postalCode": "13085-415",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[obter via geocode do endereço]",
    "longitude": "[obter via geocode do endereço]"
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "17:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "16:00" }
  ],
  "sameAs": [
    "https://www.google.com/maps?cid=6271074181028102604"
    // adicionar Instagram/Facebook quando confirmados
  ]
}
```

Mais um `Service` JSON-LD por serviço (9 nós), todos com `provider` apontando para `#business`. Adicionar `FAQPage` se incluirmos uma seção de perguntas frequentes.

### 5.4 Palavras-chave-alvo

**Alta intenção comercial (Campinas):**
- `ppf campinas`, `aplicação de ppf campinas`, `película de proteção de pintura campinas`
- `vitrificação carro campinas`, `proteção cerâmica campinas`
- `insulfilm campinas`, `aplicação de insulfilm campinas`, `insulfilm preço campinas`
- `martelinho de ouro campinas`, `martelinho de ouro chácara santa margarida`
- `funilaria e pintura campinas`
- `polimento técnico campinas`, `polimento automotivo campinas`
- `envelopamento automotivo campinas`
- `estética automotiva campinas`

**Intenção informacional (para futuras seções de FAQ):**
- `quanto custa ppf`, `vitrificação ou cera`, `quanto dura insulfilm`, `vale a pena fazer ppf`

### 5.5 sitemap.xml e robots.txt

- **sitemap.xml** gerado por `@astrojs/sitemap` (apenas a home no MVP, mas bem formado).
- **robots.txt** permissivo:
  ```
  User-agent: *
  Allow: /

  Sitemap: https://[dominio]/sitemap-index.xml
  ```

### 5.6 OpenGraph & Twitter Cards

- Imagem OG default: composição com logo + slogan + foto do carro (gerar manualmente como `public/og-image.jpg` 1200×630).
- Em Fase 2, considerar OG dinâmico via `@vercel/og` ou `satori`.

### 5.7 Performance (alvos Lighthouse)

| Métrica | Mobile | Desktop |
|---|---|---|
| Performance | ≥ 95 | 100 |
| Accessibility | ≥ 95 | ≥ 95 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| LCP | < 2.0s | < 1.0s |
| CLS | < 0.05 | < 0.05 |
| INP | < 200ms | < 200ms |

Astro estático + `<Image>` nativo + Partytown para GA = atingir esses números é trivial.

---

## 6. Integrações & Funcionalidades

### 6.1 WhatsApp (canal único de conversão)

- Variável de ambiente `PUBLIC_WHATSAPP_NUMBER=5519991142508`.
- Helper `getWhatsAppLink(origin: string, message?: string)` em `src/lib/whatsapp.ts` que monta a URL com mensagem pré-preenchida.
- Botão flutuante visível em todas as posições de scroll (mobile e desktop), com pulso sutil a cada 3s respeitando `prefers-reduced-motion`.
- CTAs inline: hero, em cada card de serviço, banner final, footer.
- Cada clique dispara `click_whatsapp` no GA4 com `origin` ("hero", "service_ppf", "floating", etc.).

Microcopy completo das mensagens em `DESIGN.md` §10.

### 6.2 Google Maps embed

- Iframe embed simples na seção `#localizacao`.
- `loading="lazy"` para não impactar LCP.
- Embed apontando para a ficha real (`https://www.google.com/maps?cid=6271074181028102604`).
- Botão "Como chegar" abaixo do mapa abrindo Google Maps em nova aba (`target="_blank" rel="noopener"`), dispara `click_directions` no GA4.

### 6.3 Reviews do Google

**MVP:** estáticos, curados manualmente.
- Selecionar 4–6 reviews reais do GBP no momento do go-live, copiar texto + nome + nota + data.
- Renderizar como `TestimonialCard` (definido em `DESIGN.md`).
- CTA "Veja todas as avaliações no Google" → link direto para o GBP.

**Fase 2 (opcional):** integração via Google Places API com cache ISR. Custa ~$17 por 1000 requests; com cache de 24h fica em centavos/mês.

### 6.4 Galeria

**MVP:** grid simples responsivo (3 colunas desktop, 2 tablet, 1 mobile) com fotos de trabalhos. Lightbox usando `medium-zoom` ou `lite-photoswipe` (ilha Astro).

**Antes/depois:** se cliente fornecer pares, usar slider de comparação custom (50 linhas de TS, sem dependência) — referência: padrão `<input type="range">` controlando `clip-path`.

**Fase 2:** filtros por serviço, antes/depois em destaque, integração com Cloudinary se a galeria crescer.

### 6.5 Botão flutuante WhatsApp

- Posição: `fixed bottom: 24px right: 24px` (desktop), `bottom: 16px right: 16px` (mobile).
- Dimensão: 64×64px (acima do mínimo 44×44 de toque).
- Z-index: `50` (acima do header sticky).
- Pulso: `box-shadow` animado a cada 3s, pausa em `prefers-reduced-motion`.
- `aria-label="Falar no WhatsApp"`.
- Não cobre conteúdo crítico (botões inline).

### 6.6 LGPD & cookies

- **Política de Privacidade** — página/seção dedicada (link no footer). Texto pode ser gerado via template padrão LGPD para sites institucionais.
- **Banner de cookies** — implementação mínima vanilla (sem libs). Apenas para consentimento de GA4/Meta Pixel. Texto curto: "Usamos cookies para melhorar sua experiência. [Aceitar] [Recusar]".
- Sem cookie = analytics bloqueado.

### 6.7 Acessibilidade

Detalhes em `DESIGN.md` §9. Resumo:
- Foco visível com outline amarelo 2px.
- Tamanho mínimo de toque 44×44px em mobile.
- Skip-link "Pular para conteúdo principal".
- Alt em todas as imagens funcionais.
- `aria-label` no botão flutuante de WhatsApp e em ícones-only.
- Contraste WCAG AA mínimo (validado em `DESIGN.md` §2).
- Navegação completa por teclado.

---

## 7. Estrutura de Pastas

```
all-pro-estetica-automotiva/
├── .github/
│   └── workflows/
│       └── ci.yml                      # astro check + build em PRs
├── docs/
│   ├── BASE.MD                         # briefing original do cliente
│   ├── DECISOES-INICIAIS.md            # decisões resumidas (fonte da verdade)
│   ├── DESIGN.md                       # design system completo
│   └── PLANO-TECNICO.md                # este documento
├── public/
│   ├── logo.svg                        # vetorizar — pendente
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── og-image.jpg                    # 1200×630 para previews sociais
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── assets/
│   │   ├── carro.webp                  # mover do root para cá
│   │   ├── fachada.webp                # mover do root para cá
│   │   ├── logo.jpg                    # fallback do .svg
│   │   ├── servicos/                   # 1 imagem por serviço (placeholder no MVP)
│   │   └── galeria/                    # fotos antes/depois
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── WhatsAppFloat.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── About.astro
│   │   │   ├── Services.astro
│   │   │   ├── Gallery.astro
│   │   │   ├── Location.astro
│   │   │   └── ContactCTA.astro
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── ServiceCard.astro
│   │   │   ├── TestimonialCard.astro
│   │   │   └── Badge.astro
│   │   └── seo/
│   │       └── BusinessJsonLd.astro    # JSON-LD AutomotiveBusiness + Services
│   ├── content/
│   │   ├── business.ts                 # NAP, horário, redes sociais (fonte única)
│   │   ├── services.ts                 # array tipado dos 9 serviços
│   │   ├── gallery.ts                  # metadados das fotos
│   │   └── testimonials.ts             # reviews curados
│   ├── layouts/
│   │   └── BaseLayout.astro            # head, fonts, GA4, JSON-LD, header, footer
│   ├── pages/
│   │   └── index.astro                 # única página: a landing
│   ├── lib/
│   │   ├── whatsapp.ts                 # getWhatsAppLink helper
│   │   └── analytics.ts                # eventos GA4 tipados
│   └── styles/
│       └── tokens.css                  # @theme do Tailwind 4 (paleta, fontes, etc.)
├── .env.example                        # template das env vars
├── .gitignore
├── .editorconfig
├── .prettierrc
├── .nvmrc                              # Node 20
├── astro.config.mjs
├── eslint.config.mjs
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE                             # privado / proprietário
```

**Observações:**
- `src/content/business.ts` é fonte única de telefone, endereço, horários — qualquer mudança propaga para footer, header, JSON-LD e WhatsApp link.
- Todas as imagens vão em `src/assets/` (passam pelo otimizador do Astro). `public/` fica reservado para arquivos que precisam manter URL fixa (favicon, robots.txt, og-image).
- `tailwind.config` não existe no Tailwind 4 — todos os tokens ficam em `src/styles/tokens.css` via diretiva `@theme`.

---

## 8. Roadmap de Implementação

### Fase 0 — Setup (½ a 1 dia, esforço S)

**Entregáveis:**
- `git init` + criação do repo no GitHub.
- `npm create astro@latest` com template `minimal`, TypeScript `strict`.
- `npx astro add tailwind sitemap` (Tailwind 4 + sitemap automático).
- Instalação de fontes self-hosted (`@fontsource-variable/manrope`, `@fontsource/rajdhani`).
- ESLint + Prettier + `prettier-plugin-astro`.
- `.editorconfig`, `.nvmrc` (Node 20), `.env.example`.
- `src/styles/tokens.css` com tokens de marca (paleta validada de `DESIGN.md`).
- Estrutura de pastas criada conforme §7.
- `BaseLayout.astro` com head completo (fonts, JSON-LD, GA4 placeholder).
- Deploy inicial em Vercel (subdomínio `*.vercel.app`).
- README com instruções de setup local.
- CI básico (astro check + build) no GitHub Actions.

**Bloqueadores:** Nenhum — pode começar imediatamente.

---

### Fase 1 — MVP funcional (3–5 dias úteis, esforço M)

**Objetivo:** landing no ar com o essencial para captar leads via WhatsApp.

**Entregáveis (componentes globais):**
- `Header.astro` (logo, nav âncoras, CTA WhatsApp, menu mobile via Sheet pattern).
- `Footer.astro` (NAP, redes sociais quando confirmadas, política, copyright, CNPJ quando confirmado).
- `WhatsAppFloat.astro` com pulso sutil.

**Entregáveis (seções da landing — em ordem de implementação):**
1. `Hero.astro` — slogan principal, sub-tagline, foto do carro, 2 CTAs.
2. `About.astro` — pitch curto + 3 diferenciais.
3. `Services.astro` — grid dos 9 serviços com ícones lucide.
4. `Gallery.astro` — grid simples (placeholders se cliente não enviar fotos).
5. `Location.astro` — embed Google Maps + endereço + horário + foto fachada.
6. `ContactCTA.astro` — botão WhatsApp grande + telefone clicável + horário.

**Entregáveis (SEO & analytics):**
- Metadata completo (title, description, OG, Twitter, canonical).
- JSON-LD `AutomotiveBusiness` + 9× `Service` no `BaseLayout`.
- Sitemap + robots.txt.
- GA4 instalado via Partytown.
- Search Console verificado.
- Eventos `click_whatsapp`, `click_phone`, `click_directions`, `view_section`.

**Entregáveis (deploy):**
- Domínio customizado apontado para Vercel.
- HTTPS automático.
- Preview deploys ativos.
- Lighthouse ≥ 95 em todas as métricas (validar antes de fechar a fase).

**Bloqueadores (não-críticos, pode começar com placeholder):**
- Fotos por serviço — usar placeholder (silhueta de carro com gradient) se cliente não enviar.
- Logo SVG — usar `.jpg` no header até vetorização ficar pronta.

---

### Fase 2 — Refinamento (2–4 dias úteis, esforço M)

**Entregáveis (após cliente fornecer assets):**
- Substituir placeholders por fotos reais por serviço.
- Substituir fotos genéricas da galeria por trabalhos reais.
- Adicionar slider antes/depois (1–3 casos fortes).
- Logo vetorizado (`.svg`) substituindo `.jpg` em todos os pontos.
- Reviews do Google curados estaticamente (4–6 com texto + nota + autor).
- OG image gráfica (não foto bruta) — composição com logo + slogan.
- Política de privacidade completa.
- Banner de cookies funcional.
- Meta Pixel se cliente quiser rodar Instagram Ads.
- Schema `FAQPage` se incluir FAQ.

---

### Fase 3 — Crescimento & automação (variável, esforço L)

**Menu de evoluções (cada item é projeto à parte):**

- **Reviews dinâmicos via Google Places API** — cache ISR de 24h.
- **Pivot para multi-page** — se SEO long-tail virar prioridade.
- **CMS headless** (Sanity/Decap) — se cliente quiser editar sem dev.
- **Landing geo-segmentada** (`/ppf-em-[bairro]`) — para campanhas pagas.
- **Agendamento online real** — Calendly, Setmore ou custom.
- **Integração com CRM** (RD Station, HubSpot Free, ou planilha Sheets via webhook).
- **Automação WhatsApp** — Z-API ou WABA com bot de pré-qualificação.
- **Painel admin** — para o dono ver leads e métricas.

---

### Esforço total estimado

| Fase | Esforço | Tempo (1 dev sênior, em dedicação) |
|---|---|---|
| Fase 0 | S | ½ a 1 dia |
| Fase 1 (MVP) | M | 3–5 dias úteis |
| Fase 2 | M | 2–4 dias úteis |
| Fase 3 | L | depende dos itens escolhidos |

**MVP no ar em ~1 semana.** Refinamento + assets reais em ~2 semanas após receber tudo.

---

## 9. Pendências do Cliente (não-bloqueantes)

Com os dados oficiais já confirmados (endereço, telefone, horário, GBP), **a Fase 1 pode iniciar imediatamente** com placeholders nos pontos faltantes. Os itens abaixo destravam Fase 2:

### Assets (críticos para Fase 2)
- [ ] **Logo em vetor `.svg`** (atualmente só `.jpg`).
- [ ] **Fotos profissionais por serviço** (1 hero shot por serviço — 9 fotos).
- [ ] **Antes/depois** — 6–12 pares de fotos reais.
- [ ] **OG image** — pode ser gerada por designer (1200×630).

### Identidade
- [ ] **CNPJ e razão social** — para footer e LGPD.
- [ ] **Confirmação dos slogans:** usar "SEU CARRO NOVO DE NOVO" como hero principal e "O detalhe faz a diferença" como sub-tagline.
- [ ] **Cor exata do amarelo** — usar `#F5D300` (validado contra logo) ou cliente confirma outro?

### Domínio & infra
- [ ] **Domínio comprado** — qual? Em qual registrar? (Sugestão: `allproesteticaautomotiva.com.br`).
- [ ] **E-mail profissional** — necessário se em algum momento adicionarmos formulário.

### Marketing & redes
- [ ] **Instagram / Facebook / TikTok** oficiais — handles para o footer.
- [ ] **Acesso ao Google Business Profile** como gestor — para alinhar NAP, responder reviews, etc.
- [ ] **Google Ads / Meta Ads** — ativos ou planejados? Define prioridade do Pixel.

### Conteúdo
- [ ] **Diferenciais únicos** — marca de PPF (Suntek? XPEL? 3M?), garantia em anos, box climatizado, certificações?
- [ ] **Preços base** — exibir "a partir de R$ X" ou esconder atrás de "Solicite orçamento via WhatsApp"?
- [ ] **Depoimentos** — texto + autor + autorização de uso (LGPD).

### LGPD
- [ ] **Encarregado (DPO)** — quem é? Email para constar na política de privacidade.

---

## 10. Riscos & Trade-offs

### Riscos técnicos

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Cliente não fornecer fotos profissionais a tempo | Alta | Alto | Trabalhar com `carro.webp` e `fachada.webp` no MVP, marcar placeholders nos cards de serviço, contratar fotógrafo em Fase 2 se necessário. |
| Logo só em raster (`.jpg`) | Confirmado | Médio | Vetorizar manualmente ou contratar designer (1–2h de trabalho). |
| Lighthouse cair por causa de imagens pesadas | Baixa (Astro otimiza) | Médio | `<Image>` nativo + `priority` no hero. Validar LCP em cada deploy. |
| Spam no botão WhatsApp (clique inflacionado por bots) | Baixa | Baixo | Filtrar bots no GA4 via `traffic source` + IP. Não impacta operação. |
| Vercel free tier estourar | Muito baixa | Baixo | Monitorar uso. Migrar para Cloudflare Pages se acontecer. |

### Riscos de negócio / produto

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| **Dependência total do WhatsApp como canal** | Alta (já é a realidade) | Alto se WhatsApp cair / banir | Manter telefone visível como fallback. Em Fase 3, considerar canal alternativo (e-mail/SMS automatizado). |
| Cliente esperar agendamento online no MVP | Média | Médio | Documentado explicitamente — MVP usa WhatsApp; agendamento real é Fase 3. |
| Cliente não conseguir editar conteúdo sozinho | Alta | Médio | README com instruções de update. Em Fase 3, oferecer CMS. Definir contrato de manutenção mensal. |
| Falta de SEO long-tail por ser one-page | Média | Médio | MVP foca em "[serviço] campinas" via JSON-LD por serviço. Se ranqueamento estagnar, pivot para multi-page é factível mantendo a base Astro. |
| Cliente não passar credenciais do GBP | Média | Médio | Insistir antes da Fase 2. Reviews dinâmicos exigem Place ID público (sem credenciais), mas alinhamento de NAP precisa de acesso. |
| Foto da fachada / carro não representar o nível premium | Média | Médio | Para MVP serve. Sessão fotográfica profissional em Fase 2 — investimento de R$ 800–2.500 com retorno alto. |
| Cliente trocar de prestador no meio do projeto | Baixa | Alto | Código aberto, repo do cliente desde o início, documentação clara, sem dependências proprietárias. |

### Trade-offs explícitos aceitos neste plano

1. **One-page > multi-page**: aceita perda de SEO long-tail dedicado em troca de simplicidade total e Lighthouse 100 trivial. Pivot futuro factível.
2. **Astro > Next.js**: aceita ecossistema React menor em troca de performance superior, build mais rápido e código mais simples para o escopo.
3. **Sem CMS no MVP**: aceita que cliente dependa do dev para editar, em troca de simplicidade e custo zero de infra adicional.
4. **WhatsApp > Agendamento**: aceita não ter UX moderna de calendário em troca de fricção menor para cliente leigo e zero integração externa.
5. **Sem formulário no MVP**: aceita captura de lead só via WhatsApp, em troca de UX mais direta e zero complexidade de backend.
6. **Reviews estáticos no MVP**: aceita possível defasagem de 1–2 semanas em troca de zero custo de API e simplicidade.
7. **Vercel > self-hosted**: aceita lock-in leve em troca de DX excelente e custo zero. Migração futura é factível (build é estático).
8. **Tema escuro fixo**: aceita não ter tema claro em troca de identidade de marca consistente.

---

## Próximo Passo Concreto

1. **Inicializar o repositório git** preservando os arquivos atuais:
   ```bash
   cd /Users/esapiens/Projects/all-pro-estetica-automotiva
   git init -b main
   git add docs/ logo.jpg carro.webp fachada.webp
   git commit -m "chore: arquivos base e docs de planejamento"
   ```

2. **Criar projeto Astro** sem apagar `docs/` nem as imagens:
   ```bash
   npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git
   npm install
   npx astro add tailwind sitemap
   npm install @fontsource-variable/manrope @fontsource/rajdhani astro-icon
   ```

3. **Mover assets** para a estrutura final:
   - `carro.webp` → `src/assets/carro.webp`
   - `fachada.webp` → `src/assets/fachada.webp`
   - `logo.jpg` → `src/assets/logo.jpg`

4. **Criar `src/styles/tokens.css`** com a paleta validada de `DESIGN.md`.

5. **Implementar Fase 1 na ordem:**
   `BaseLayout` → `Header` → `Hero` → `Services` → `About` → `Gallery` → `Location` → `ContactCTA` → `Footer` → `WhatsAppFloat` → polish (animações, responsividade fina, JSON-LD, GA4) → deploy Vercel.

6. **Validar antes de fechar Fase 1:**
   - Lighthouse ≥ 95 em todas as métricas (mobile e desktop).
   - WCAG AA via axe DevTools sem erros críticos.
   - JSON-LD válido via [Schema Markup Validator](https://validator.schema.org/).
   - Open Graph válido via [opengraph.xyz](https://www.opengraph.xyz/).

---

**Fim do blueprint v2.** Atualizar este documento sempre que decisões mudarem — manter alinhamento com `DECISOES-INICIAIS.md` e `DESIGN.md` (que são as outras duas fontes da verdade).
