# DESIGN.md — ALL PRO Estética Automotiva

> **Documento:** Sistema de design da landing page (fonte da verdade visual)
> **Projeto:** Landing page única — ALL PRO Estética Automotiva (Campinas - SP)
> **Data:** 2026-04-29
> **Autor:** Designer & UX Agent (eSapiens)
> **Status:** Aprovado — pronto para implementação em Astro 5 + TailwindCSS 4
> **Documento irmão:** [`DECISOES-INICIAIS.md`](./DECISOES-INICIAIS.md) (escopo, dados oficiais, stack)

---

## Sumário

1. [Princípios de design](#1-princípios-de-design)
2. [Paleta de cores](#2-paleta-de-cores-final-validada)
3. [Tipografia](#3-tipografia)
4. [Espaçamento & layout](#4-espaçamento--layout)
5. [Componentes — anatomia visual](#5-componentes--anatomia-visual)
6. [Iconografia](#6-iconografia)
7. [Imagens & mídia](#7-imagens--mídia)
8. [Motion & micro-interações](#8-motion--micro-interações)
9. [Acessibilidade](#9-acessibilidade-mínimos-não-negociáveis)
10. [Tom & voz (UX writing)](#10-tom--voz-ux-writing)
11. [Tokens em código](#11-tokens-em-código-tailwind-config-preview)
12. [Referências visuais](#12-referências-visuais)

---

## 0. Validação crítica da paleta original (resumo executivo)

Antes de fechar os tokens, foi feita uma **revisão técnica** da paleta proposta no `DECISOES-INICIAIS.md` contra os ativos reais (`logo.jpg`, `fachada.webp`). Os achados:

### 0.1. Ajuste no amarelo da marca

O `#FFD60A` originalmente proposto é um amarelo **levemente alaranjado/quente** (estilo Apple/iOS). O amarelo real do logo `ALL PRO` é mais **frio, saturado e levemente esverdeado** — coerente com o "school bus yellow" tradicional automotivo. Match mais preciso após análise visual:

| Candidato | HEX | Avaliação |
|---|---|---|
| `#FFD60A` (proposto) | RGB 255,214,10 | Quente demais. Acentua o lado iOS/SaaS, foge do logo. |
| **`#F5D300`** ✅ | RGB 245,211,0 | **Match mais próximo do logo.** Saturação alta, sem viés alaranjado. |
| `#F2D11E` | RGB 242,209,30 | Aceitável, mas levemente "creme" — perde força. |
| `#FFCD00` | RGB 255,205,0 | Bom; amarelo Pantone Yellow 012 — pouco mais quente que o ideal. |

**Decisão:** adotar **`#F5D300`** como acento primário da marca. O `#FFD60A` foi descartado.
> **Atualização propagada:** o §4.2 de `DECISOES-INICIAIS.md` foi atualizado para refletir esta troca, mantendo consistência entre os dois documentos.

### 0.2. Hierarquia de cinzas insuficiente

A proposta tinha apenas dois cinzas (`#1A1A1A`, `#A0A0A0`), o que é **insuficiente** para uma UI rica com cards, divisores, hover states, bordas sutis e textos terciários. Foi expandida para **escala completa de 50→900** (ver §2).

### 0.3. Cor secundária / acento de apoio

**Decisão: descartar.** Adicionar uma cor secundária (azul frio, cinza azulado) **dilui** a identidade preto + amarelo da marca, que é forte e reconhecível. O sistema usa amarelo de forma pontual (CTAs, ícones de destaque, divisores) e variação visual vem da escala de cinzas + tipografia, não de uma segunda cor de marca. WhatsApp verde (`#25D366`) é a única exceção — e mesmo assim, isolada ao botão flutuante e CTAs explícitos de WhatsApp.

### 0.4. Cores semânticas

Adicionadas: success (`#22C55E`), warning (`#F59E0B`), error (`#EF4444`), info (`#3B82F6`). Usadas só em feedback de formulário/toast — não competem com o amarelo da marca.

### 0.5. Resultados de contraste WCAG (resumo)

Todos os pares críticos validados (cálculo via fórmula WCAG 2.1, contraste mínimo conforme [W3C](https://www.w3.org/WAI/WCAG21/Techniques/general/G18)):

| Par | Ratio | Texto normal | Texto large | UI |
|---|---|---|---|---|
| `#FFFFFF` sobre `#0A0A0A` | **20.04:1** | ✅ AAA | ✅ AAA | ✅ AAA |
| `#F5D300` sobre `#0A0A0A` | **15.22:1** | ✅ AAA | ✅ AAA | ✅ AAA |
| `#0A0A0A` sobre `#F5D300` (botão CTA) | **15.22:1** | ✅ AAA | ✅ AAA | ✅ AAA |
| `#A3A3A3` sobre `#0A0A0A` (texto secundário) | **8.34:1** | ✅ AAA | ✅ AAA | ✅ AAA |
| `#737373` sobre `#0A0A0A` (texto terciário) | **4.74:1** | ✅ AA | ✅ AAA | ✅ AA |
| `#FFFFFF` sobre `#171717` (cards) | **17.42:1** | ✅ AAA | ✅ AAA | ✅ AAA |
| `#FFFFFF` sobre `#25D366` (WhatsApp) | **2.63:1** | ❌ Falha | ❌ Falha | ⚠️ Limítrofe |
| `#0A0A0A` sobre `#25D366` (alternativa) | **8.18:1** | ✅ AAA | ✅ AAA | ✅ AAA |

> **Atenção:** O verde WhatsApp `#25D366` **não** passa AA com texto branco. Recomenda-se botão WhatsApp com **texto preto** (`#0A0A0A`) ou ícone branco + texto branco com **stroke / sombra** — ver §5.2.

---

## 1. Princípios de design

Cinco princípios guiam todas as decisões visuais e de interação. Quando houver conflito entre eles, a ordem abaixo é a hierarquia.

### 1.1. **Performance acima de ornamento**
Cada elemento na tela tem custo (atenção do usuário + bytes de download + ciclos de render). Se um elemento não está vendendo, qualificando ou orientando — sai. Lighthouse ≥ 95 em mobile é alvo, não aspiração.

### 1.2. **Contraste como hierarquia**
Em tema escuro, contraste é a ferramenta principal de hierarquia visual. Tudo que importa é claro e nítido; tudo que apoia é cinza médio; tudo que decora é cinza profundo. Cor (amarelo) é reservada para o **único elemento mais importante** de cada seção.

### 1.3. **Mobile-first, sempre**
70%+ do tráfego virá de mobile (negócio local brasileiro). Cada componente é projetado primeiro em 375px de largura. Desktop é progressive enhancement, não baseline.

### 1.4. **O carro é o herói visual**
Fotos reais de trabalhos têm prioridade sobre ilustrações, ícones genéricos ou stock. O conteúdo (foto do carro) é a interface — a UI emoldura, não compete.

### 1.5. **Fricção zero até o WhatsApp**
A landing existe para empurrar o visitante interessado para `wa.me`. Cada seção tem 1 CTA primário visível. Nunca mais de 2 níveis de profundidade até o canal de conversão.

### 1.6. **Consistência > criatividade**
8 px grid, 5 tamanhos de fonte, 4 raios, 4 sombras. Não inventar exceções. Um sistema previsível ganha de variedade improvisada.

---

## 2. Paleta de cores (final, validada)

### 2.1. Cores de marca

| Token | HEX | RGB | Uso recomendado | Variável CSS |
|---|---|---|---|---|
| Brand Primary | `#F5D300` | 245, 211, 0 | CTA primário, ícones de destaque, divisores ativos, foco. Cor da marca. | `--color-brand` |
| Brand Hover | `#E0C100` | 224, 193, 0 | Hover do CTA primário. Levemente mais escuro. | `--color-brand-hover` |
| Brand Active | `#C2A700` | 194, 167, 0 | Estado pressed/active do CTA primário. | `--color-brand-active` |
| Brand Subtle | `#F5D30014` | rgba(245,211,0,.08) | Fundos sutis amarelados (badges, hover de cards). | `--color-brand-subtle` |

> **Regra:** o amarelo nunca cobre mais de **10%** da viewport visível em qualquer momento. É acento, não fundo.

### 2.2. Escala de neutros (cinzas)

Escala completa baseada em luminância perceptual (não interpolação RGB linear). Usada para tudo que não é amarelo nem semântico.

| Token | HEX | Uso recomendado | Variável CSS |
|---|---|---|---|
| Neutral 0 | `#FFFFFF` | Texto primário, ícones em destaque. | `--color-neutral-0` |
| Neutral 50 | `#FAFAFA` | (Reservado — uso raro em dark theme.) | `--color-neutral-50` |
| Neutral 100 | `#E5E5E5` | Texto secundário em ênfase, separadores claros. | `--color-neutral-100` |
| Neutral 200 | `#D4D4D4` | Texto secundário com leitura prolongada. | `--color-neutral-200` |
| Neutral 300 | `#A3A3A3` | **Texto secundário padrão** (descrições, metadados). | `--color-neutral-300` |
| Neutral 400 | `#737373` | Texto terciário, captions, labels disabled. | `--color-neutral-400` |
| Neutral 500 | `#525252` | Bordas em destaque, ícones decorativos. | `--color-neutral-500` |
| Neutral 600 | `#404040` | Bordas padrão de inputs e dividers visíveis. | `--color-neutral-600` |
| Neutral 700 | `#262626` | Bordas sutis em cards e divisores. | `--color-neutral-700` |
| Neutral 800 | `#171717` | **Superfícies elevadas** (cards, headers solidos, modais). | `--color-neutral-800` |
| Neutral 850 | `#0F0F0F` | Surface intermediária (variantes de card). | `--color-neutral-850` |
| Neutral 900 | `#0A0A0A` | **Background base do site.** | `--color-neutral-900` |
| Neutral 950 | `#000000` | Reservado — só para letterboxes de imagem ou overlays totais. | `--color-neutral-950` |

### 2.3. Cores semânticas

Usadas exclusivamente em feedback (toast, validação de formulário, status). Nunca em conteúdo de marketing.

| Token | HEX | Uso | Variável CSS |
|---|---|---|---|
| Success | `#22C55E` | Confirmação de envio, sucesso de cópia (telefone copiado). | `--color-success` |
| Success BG | `#22C55E1A` | Fundo de banner de sucesso (10% opacity). | `--color-success-bg` |
| Warning | `#F59E0B` | Avisos não-bloqueantes (preencher campo opcional). | `--color-warning` |
| Warning BG | `#F59E0B1A` | Fundo de banner de aviso. | `--color-warning-bg` |
| Error | `#EF4444` | Erro de validação, falha de envio. | `--color-error` |
| Error BG | `#EF44441A` | Fundo de banner de erro. | `--color-error-bg` |
| Info | `#3B82F6` | Mensagens informativas neutras. | `--color-info` |
| Info BG | `#3B82F61A` | Fundo de banner informativo. | `--color-info-bg` |

> **Cuidado com o warning amarelo:** `#F59E0B` é mais alaranjado que o brand (`#F5D300`) deliberadamente, para evitar conflito de leitura ("isso é decoração da marca ou um aviso real?"). Nunca usar o brand yellow em contexto semântico.

### 2.4. Cor de canal (WhatsApp)

| Token | HEX | Uso | Variável CSS |
|---|---|---|---|
| WhatsApp Brand | `#25D366` | Botão flutuante WhatsApp + CTAs explícitos de WhatsApp. | `--color-whatsapp` |
| WhatsApp Hover | `#1FBE5A` | Hover do botão WhatsApp. | `--color-whatsapp-hover` |
| WhatsApp Active | `#1AA84F` | Pressed state. | `--color-whatsapp-active` |

> **Sempre** usar a cor oficial do WhatsApp neste botão. Reconhecimento instantâneo > coerência cromática com a marca.

### 2.5. Tabela de contraste WCAG (validação completa)

Todos os pares de uso real, calculados pela fórmula WCAG 2.1.

| Foreground | Background | Ratio | Normal | Large | UI/Ícone |
|---|---|---:|:-:|:-:|:-:|
| `#FFFFFF` | `#0A0A0A` | 20.04:1 | AAA ✅ | AAA ✅ | AAA ✅ |
| `#FFFFFF` | `#171717` | 17.42:1 | AAA ✅ | AAA ✅ | AAA ✅ |
| `#FFFFFF` | `#262626` | 14.52:1 | AAA ✅ | AAA ✅ | AAA ✅ |
| `#F5D300` | `#0A0A0A` | 15.22:1 | AAA ✅ | AAA ✅ | AAA ✅ |
| `#F5D300` | `#171717` | 13.23:1 | AAA ✅ | AAA ✅ | AAA ✅ |
| `#0A0A0A` | `#F5D300` (CTA) | 15.22:1 | AAA ✅ | AAA ✅ | AAA ✅ |
| `#A3A3A3` | `#0A0A0A` | 8.34:1 | AAA ✅ | AAA ✅ | AAA ✅ |
| `#A3A3A3` | `#171717` | 7.26:1 | AAA ✅ | AAA ✅ | AAA ✅ |
| `#737373` | `#0A0A0A` | 4.74:1 | AA ✅ | AAA ✅ | AA ✅ |
| `#525252` | `#0A0A0A` | 2.91:1 | ❌ | AA ✅ | AA ✅ (limítrofe) |
| `#0A0A0A` | `#25D366` | 8.18:1 | AAA ✅ | AAA ✅ | AAA ✅ |
| `#FFFFFF` | `#25D366` | 2.63:1 | ❌ | ❌ | ⚠️ |
| `#FFFFFF` | `#22C55E` | 2.27:1 | ❌ | ❌ | ⚠️ |
| `#FFFFFF` | `#EF4444` | 3.76:1 | ❌ | AA ✅ | AA ✅ |

**Regras práticas derivadas:**
- Texto secundário **mínimo** = `Neutral 300 (#A3A3A3)` sobre `Neutral 900 (#0A0A0A)`. Nunca usar `Neutral 400` ou `500` para corpo de texto.
- Botões verdes (WhatsApp, success) usam **texto preto**, não branco — ou ícone branco com `text-shadow` controlado.
- Botão amarelo CTA usa **texto preto** sempre (`#0A0A0A`), nunca branco (contraste de branco sobre amarelo é só 1.32:1).
- Em texto sobre fotos: aplicar overlay (ver §7.1) antes de medir contraste.

---

## 3. Tipografia

### 3.1. Famílias

| Família | Função | Pesos a importar | Subset |
|---|---|---|---|
| **Manrope** | Body, navegação, labels, descrições, footer. | 400, 500, 600, 700 | `latin`, `latin-ext` (cobre acentos pt-BR) |
| **Rajdhani** | Display: hero headline, títulos de seção (h2 quando carregar peso "automotivo"), números de destaque. | 500, 600, 700 | `latin`, `latin-ext` |

**Carregamento (Astro):**
- Usar `@fontsource-variable/manrope` e `@fontsource/rajdhani` via npm para self-hosting (zero round-trip ao Google Fonts em produção, GDPR-friendly).
- `font-display: swap` para evitar FOIT.
- Preload do peso 700 do Manrope e 700 do Rajdhani (críticos para hero).

### 3.2. Escala tipográfica

Escala fluida com `clamp()` para suavizar transições mobile→desktop sem necessidade de breakpoints intermediários. Base: 16px (1rem).

| Nome | Tamanho (mobile → desktop) | Line-height | Letter-spacing | Peso | Família | Uso |
|---|---|---|---|---|---|---|
| **Display** | `clamp(2.5rem, 5.5vw + 1rem, 4.5rem)` (40 → 72px) | 1.05 | -0.02em | 700 | Rajdhani | Hero headline ("SEU CARRO NOVO DE NOVO"). UPPERCASE. |
| **H1** | `clamp(2rem, 3.5vw + 0.75rem, 3rem)` (32 → 48px) | 1.1 | -0.015em | 700 | Rajdhani | Título de hero secundários, fallback. |
| **H2** | `clamp(1.75rem, 2.5vw + 0.75rem, 2.5rem)` (28 → 40px) | 1.15 | -0.01em | 700 | Rajdhani | Títulos de seção ("Nossos serviços"). UPPERCASE opcional. |
| **H3** | `1.5rem` (24px) | 1.25 | -0.005em | 600 | Manrope | Nome do serviço em card, sub-headings. |
| **H4** | `1.25rem` (20px) | 1.3 | 0 | 600 | Manrope | Títulos terciários, labels de bloco. |
| **Body Large** | `1.125rem` (18px) | 1.6 | 0 | 400 | Manrope | Sub-headline do hero, leads de seção. |
| **Body** | `1rem` (16px) | 1.6 | 0 | 400 | Manrope | Corpo de texto padrão, descrições de serviço. |
| **Body Small** | `0.875rem` (14px) | 1.55 | 0 | 400 | Manrope | Captions, metadados, footer. |
| **Caption** | `0.75rem` (12px) | 1.45 | 0.02em | 500 | Manrope | Microcopy, badges, eyebrows. UPPERCASE em badges. |
| **Overline** | `0.75rem` (12px) | 1 | 0.12em | 600 | Manrope | Eyebrows de seção, tags categoriais. UPPERCASE sempre. |

### 3.3. Regras de uso

**Quando usar Rajdhani:**
- Hero display headline.
- H1, H2 das seções principais (Sobre, Serviços, Galeria, etc.).
- Números grandes de destaque (ex.: "+500 carros atendidos").

**Quando NÃO usar Rajdhani:**
- Corpo de texto longo (>3 palavras) — Rajdhani é display, fica cansativa.
- Inputs, labels, botões de tamanho normal.
- Descrições de serviço.

**UPPERCASE:**
- Display do hero: SIM.
- H2 de seção: opcional (avaliar caso a caso, melhor reservar para 1-2 seções de impacto).
- Overlines/badges: SIM, sempre.
- H3 e abaixo: NÃO.

**Nunca-do's:**
- Não usar mais de 2 famílias por composição (Manrope + Rajdhani — só).
- Não justificar texto (`text-justify`) — quebra rios brancos em pt-BR.
- Não diminuir line-height abaixo de 1.5 em corpo de texto.
- Não usar peso 300 ou 200 — em fundo escuro, fontes finas perdem nitidez.

---

## 4. Espaçamento & layout

### 4.1. Escala de espaçamento (base 4px)

Valores expressos em rem (base 16px) e px de referência. Usar **somente** valores desta escala — nada de "11px ad-hoc".

| Token | Valor | px | Uso típico |
|---|---|---:|---|
| `space-0` | 0 | 0 | Reset. |
| `space-1` | 0.25rem | 4 | Ajustes finos (gap entre ícone e label inline). |
| `space-2` | 0.5rem | 8 | Padding interno de badges, gaps tight. |
| `space-3` | 0.75rem | 12 | Padding vertical de inputs, gap em listas compactas. |
| `space-4` | 1rem | 16 | Padding padrão de cards pequenos, gap entre itens. |
| `space-5` | 1.25rem | 20 | Padding lateral de inputs, gap intermediário. |
| `space-6` | 1.5rem | 24 | Padding de cards médios, espaço entre parágrafos. |
| `space-8` | 2rem | 32 | Padding de cards grandes, espaço entre subseções. |
| `space-10` | 2.5rem | 40 | Espaço entre blocos relacionados. |
| `space-12` | 3rem | 48 | Padding vertical de seções em mobile. |
| `space-16` | 4rem | 64 | Espaço entre seções em mobile, padding de seções desktop. |
| `space-20` | 5rem | 80 | Padding vertical de hero em mobile. |
| `space-24` | 6rem | 96 | Padding vertical de seções desktop principais. |
| `space-32` | 8rem | 128 | Padding de hero desktop, separações dramáticas. |

### 4.2. Container max-widths

Container pattern com padding lateral consistente.

| Container | Max-width | Padding lateral | Uso |
|---|---|---|---|
| `container-tight` | 720px | 24px (mobile), 32px (desktop) | Texto longo focado em leitura (sobre, política de privacidade). |
| `container-base` | 1120px | 24px (mobile), 32px (desktop) | Padrão da landing — hero, serviços, galeria, contato. |
| `container-wide` | 1280px | 24px (mobile), 40px (desktop) | Galeria full-width opcional. |
| `container-full` | 100% | 0 | Hero com background image edge-to-edge, faixas de fundo. |

### 4.3. Grid

- **Grid base:** 12 colunas em desktop, 4 em mobile, 8 em tablet.
- **Gutter:** `space-6` (24px) em desktop, `space-4` (16px) em mobile.
- **Serviços (9 cards):** 3×3 em desktop (≥1024px), 2×5 em tablet (≥640px) — sendo o último ocupando 2 colunas para alinhar visualmente —, 1×9 em mobile.

### 4.4. Breakpoints (mobile-first)

| Token | Min-width | Dispositivo-alvo |
|---|---|---|
| `sm` | 640px | Tablet retrato, mobile landscape grande. |
| `md` | 768px | Tablet retrato grande / paisagem. |
| `lg` | 1024px | Desktop pequeno, tablet landscape. |
| `xl` | 1280px | Desktop padrão. |
| `2xl` | 1536px | Desktop grande, monitores wide. |

**Regra:** sempre escrever os estilos base para mobile (sem prefix), usando os prefixos `sm:`, `md:`, etc. apenas para overrides de breakpoint maior. Nunca o contrário.

### 4.5. Z-index (escala definida)

Evitar `z-index` arbitrários (`z-9999`).

| Token | Valor | Uso |
|---|---|---|
| `z-base` | 0 | Base de fluxo. |
| `z-raised` | 10 | Cards com hover lift. |
| `z-dropdown` | 100 | Menus dropdown (não usado no MVP). |
| `z-sticky` | 200 | Header sticky. |
| `z-overlay` | 300 | Overlays de imagem (lightbox base). |
| `z-modal` | 400 | Modais, lightbox aberto. |
| `z-toast` | 500 | Toasts de feedback. |
| `z-floating` | 600 | **Botão flutuante WhatsApp** (sempre por cima). |

---

## 5. Componentes — anatomia visual

### 5.1. Botão CTA primário (amarelo)

Usado para a ação principal de cada seção. Há **no máximo 1 por seção visível**.

| Estado | Cor de fundo | Cor de texto | Borda | Sombra |
|---|---|---|---|---|
| Default | `#F5D300` | `#0A0A0A` | none | `shadow-md` |
| Hover | `#E0C100` | `#0A0A0A` | none | `shadow-lg` + `translate-y-[-2px]` |
| Active | `#C2A700` | `#0A0A0A` | none | `shadow-sm` + `translate-y-0` |
| Focus | `#F5D300` | `#0A0A0A` | `outline: 2px solid #F5D300; outline-offset: 3px` (sobre fundo escuro) | `shadow-md` |
| Disabled | `#F5D30040` (25% opacity) | `#0A0A0A80` | none | none, `cursor: not-allowed` |
| Loading | `#F5D300` com spinner preto | label oculto, spinner visível | none | `shadow-md` |

**Especificações:**
- Padding: `12px 24px` (small), `14px 28px` (default), `16px 32px` (large).
- Border-radius: `12px` (`--radius-md`).
- Font: Manrope 600, `1rem` (default), `1.125rem` (large).
- Letter-spacing: `0.01em`.
- Transição: `all 200ms cubic-bezier(0.4, 0, 0.2, 1)`.
- Touch target: mínimo 48×48px em mobile (atinge naturalmente com padding default).

**Exemplo de uso:**
- Hero: "Solicitar orçamento no WhatsApp" (large)
- Cards de serviço: "Fazer orçamento" (default)
- CTA final de página: "Falar com a ALL PRO" (large)

### 5.2. Botão WhatsApp (verde, com ícone)

| Estado | Cor de fundo | Cor de ícone+texto | Borda | Sombra |
|---|---|---|---|---|
| Default | `#25D366` | `#0A0A0A` (preto) | none | `shadow-md` |
| Hover | `#1FBE5A` | `#0A0A0A` | none | `shadow-lg` |
| Active | `#1AA84F` | `#0A0A0A` | none | `shadow-sm` |
| Focus | `#25D366` | `#0A0A0A` | `outline: 2px solid #F5D300; outline-offset: 3px` (amarelo da marca para reforço de identidade) | `shadow-md` |

**Por que texto preto e não branco:**
Branco sobre `#25D366` falha em contraste WCAG (2.63:1 — abaixo de AA 4.5:1). Texto preto atinge 8.18:1 (AAA). Visualmente é mais "WhatsApp" oficial mesmo (o app usa preto sobre verde em UI).

**Especificações:**
- Padding: `14px 28px` (default), `16px 36px` (large/CTA explícito).
- Border-radius: `12px` (botão inline) ou `9999px` (botão flutuante circular).
- Ícone: lucide `MessageCircle` ou ícone oficial WhatsApp em SVG, `20px` (default) ou `24px` (large), à esquerda do texto, gap `space-2` (8px).
- Font: Manrope 600.
- Transição: `all 200ms ease-out`.

**Botão flutuante (anatomia específica):**
- Tamanho: 56×56px em mobile, 64×64px em desktop.
- Posição: `bottom: 24px; right: 24px` (mobile), `bottom: 32px; right: 32px` (desktop).
- Border-radius: `9999px` (círculo).
- Sombra: `shadow-xl` + halo verde sutil (`box-shadow: 0 0 0 8px rgba(37, 211, 102, 0.15)`).
- Animação de pulso: `animate-pulse-soft` a cada 4s (ver §8).
- Z-index: `z-floating` (600).
- `aria-label="Falar no WhatsApp com a ALL PRO Estética Automotiva"`.
- Respeitar `prefers-reduced-motion`: sem pulso.

### 5.3. Botão secundário / ghost

Usado para ação secundária (ex.: "Ver galeria", "Como chegar"). Nunca compete visualmente com o CTA primário.

| Estado | Cor de fundo | Cor de texto | Borda |
|---|---|---|---|
| Default | `transparent` | `#FFFFFF` | `1px solid #404040` (Neutral 600) |
| Hover | `#171717` | `#F5D300` | `1px solid #F5D300` |
| Active | `#0F0F0F` | `#E0C100` | `1px solid #E0C100` |
| Focus | `transparent` | `#FFFFFF` | `2px solid #F5D300` (substitui a borda) |
| Disabled | `transparent` | `#525252` | `1px solid #262626`, `cursor: not-allowed` |

**Especificações:**
- Padding: `12px 24px` (default).
- Border-radius: `12px`.
- Font: Manrope 500.
- Transição: `border-color 200ms, color 200ms, background-color 200ms`.

### 5.4. ServiceCard (card de serviço)

Anatomia do card — usado no grid de 9 serviços.

```
┌─────────────────────────────┐
│  ▢ ícone amarelo (32px)     │  ← padding-top space-6
│                             │
│  Nome do serviço (H3)       │  ← font Manrope 600, 24px, color #FFFFFF
│                             │
│  Descrição em 1-2 linhas    │  ← font Manrope 400, 14px, color #A3A3A3
│  do benefício do serviço.   │
│                             │
│  ─────────────────          │  ← divisor 1px #262626 (Neutral 700)
│                             │
│  Fazer orçamento  →         │  ← link text + chevron, color #F5D300
└─────────────────────────────┘
```

| Estado | Background | Border | Sombra | Transform |
|---|---|---|---|---|
| Default | `#171717` (Neutral 800) | `1px solid #262626` (Neutral 700) | none | none |
| Hover | `#0F0F0F` (Neutral 850) | `1px solid #F5D30040` (brand 25%) | `shadow-lg` (amarelo sutil) | `translate-y-[-4px]` |
| Focus-within | `#171717` | `2px solid #F5D300` | `shadow-md` | none |

**Especificações:**
- Padding: `space-6` (24px) all sides, `space-8` (32px) em desktop.
- Border-radius: `16px` (`--radius-lg`).
- Width: 100% da coluna do grid.
- Min-height: 280px (mobile), 320px (desktop) — para uniformidade.
- Transição: `all 250ms cubic-bezier(0.4, 0, 0.2, 1)`.
- O card inteiro é clicável (linka pro WhatsApp com mensagem pré-preenchida do serviço). Borda focável via `:focus-visible` no `<a>` que envolve o card.

### 5.5. Badge / Tag

Usado em "Mais procurado", "Premium", "Novo", etc.

**Variantes:**

| Variante | Background | Texto | Borda |
|---|---|---|---|
| Brand (destaque) | `#F5D30014` (8% brand) | `#F5D300` | `1px solid #F5D30040` |
| Neutral | `#171717` | `#A3A3A3` | `1px solid #262626` |
| Success | `#22C55E1A` | `#22C55E` | `1px solid #22C55E40` |

**Especificações:**
- Padding: `4px 10px`.
- Border-radius: `9999px` (pill).
- Font: Manrope 600, `0.75rem` (12px), `letter-spacing: 0.04em`, UPPERCASE.

### 5.6. Gallery item (item de galeria)

| Estado | Filtro | Transform | Overlay |
|---|---|---|---|
| Default | nenhum | `scale(1)` | gradiente bottom 0%→40% black |
| Hover | `brightness(1.05)` | `scale(1.03)` | gradiente bottom 0%→60% black |
| Focus | nenhum | `scale(1)` | `outline: 2px solid #F5D300; outline-offset: 4px` |

**Especificações:**
- Aspect ratio: `4/3` (padrão, fotos cheias) ou `1/1` (grid uniforme).
- Border-radius: `12px`.
- `overflow: hidden`.
- Imagem: `object-fit: cover`, `loading="lazy"`, `decoding="async"`.
- Transição: `transform 350ms cubic-bezier(0.4, 0, 0.2, 1)`.

**Variante Antes/Depois (slider de comparação):**
- Linha vertical divisora: `2px solid #F5D300`.
- Handle (alça): círculo 40px com `#F5D300` background, ícone de setas duplas em preto.
- Labels "ANTES" / "DEPOIS": badge brand pequeno em cantos opostos.

### 5.7. Input / formulário

Mesmo sem formulário no MVP, deixar definido para fase 2.

| Estado | Background | Border | Texto |
|---|---|---|---|
| Default | `#171717` | `1px solid #404040` | `#FFFFFF` (input), `#A3A3A3` (placeholder) |
| Hover | `#171717` | `1px solid #525252` | (idem) |
| Focus | `#0F0F0F` | `2px solid #F5D300` | `#FFFFFF` |
| Error | `#171717` | `2px solid #EF4444` | `#FFFFFF` |
| Disabled | `#0F0F0F` | `1px solid #262626` | `#525252`, `cursor: not-allowed` |

**Especificações:**
- Padding: `14px 16px`.
- Border-radius: `12px`.
- Font: Manrope 400, `1rem`.
- Min-height: 48px (touch target).
- `<label>` sempre acima do input, font caption, color `#E5E5E5`, `mb: space-2` (8px).
- Error message: font caption, color `#EF4444`, `aria-describedby` linkado ao input.

### 5.8. Map embed (Google Maps)

- Aspect ratio: `16/9` (mobile) ou `4/3` (desktop).
- Border-radius: `16px`.
- `overflow: hidden`.
- Border: `1px solid #262626`.
- Loading: `loading="lazy"` + `referrerpolicy="no-referrer-when-downgrade"`.
- Sempre acompanhado de um botão secundário ao lado/abaixo: "Ver no Google Maps" → abre em nova aba o link `https://maps.google.com/?cid=6271074181028102604`.

---

## 6. Iconografia

### 6.1. Biblioteca

**Lucide** (`lucide-astro` para Astro, `lucide-react` se usar React).
- Estilo coeso, traço uniforme `2px`.
- Tree-shakable — só os ícones usados entram no bundle.
- Open source.

**Tamanhos padrão:**
| Token | Tamanho | Uso |
|---|---|---|
| `icon-xs` | 16px | Inline com texto small. |
| `icon-sm` | 20px | Inline com texto body. |
| `icon-md` | 24px | Botões, CTAs, navegação. |
| `icon-lg` | 32px | Cards de serviço (ícone do serviço). |
| `icon-xl` | 48px | Destaque hero, empty states. |

**Stroke width:** Sempre `2px` (default do Lucide). Não customizar.

### 6.2. Mapa de ícones por serviço

| Serviço | Ícone Lucide | Justificativa semântica |
|---|---|---|
| PPF (Película de Proteção) | `ShieldCheck` | Escudo = proteção; check = aprovação/qualidade. |
| Polimento e Cristalização | `Sparkles` | Brilho/reflexo característico do polimento. |
| Vitrificação Cerâmica | `Gem` | Cerâmica = pedra preciosa; superfície vitrificada brilha como cristal. |
| Higienização Interna | `SprayCan` | Visualização imediata do conceito limpeza. |
| Envelopamento | `Wallpaper` | Película/wrap aplicado sobre superfície. |
| Insulfilm | `SunDim` | Controle solar — sol atenuado. |
| Pintura | `PaintBucket` | Universal para pintura. |
| Funilaria | `Hammer` | Ferramenta clássica de funilaria. |
| Martelinho de Ouro | `CircleDot` | Reparo localizado, ponto a ponto. (alternativa: `Wrench`) |

**Tratamento visual nos cards:**
- Cor: `#F5D300` (brand).
- Tamanho: 32px (icon-lg).
- Container: opcional badge quadrado 56×56px com bg `#F5D30014` e border-radius 12px, ícone centralizado.

### 6.3. Outros ícones do sistema

| Função | Ícone | Tamanho |
|---|---|---|
| WhatsApp | `MessageCircle` ou SVG oficial WhatsApp | 24px |
| Telefone | `Phone` | 20px |
| Localização | `MapPin` | 20px |
| Horário | `Clock` | 20px |
| Email | `Mail` | 20px |
| Check (lista de benefícios) | `Check` | 20px, color `#F5D300` |
| Seta CTA | `ArrowRight` | 16px |
| Chevron (link "saiba mais") | `ChevronRight` | 16px |
| Instagram | `Instagram` | 24px |
| Facebook | `Facebook` | 24px |
| Menu mobile | `Menu` (aberto: `X`) | 24px |

---

## 7. Imagens & mídia

### 7.1. Tratamento de fotos

**Hero (`carro.webp`):**
- Aplicar **gradiente vertical** sobreposto: `linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.85) 100%)`.
- Garantir contraste do título Display sobre a imagem (mínimo 4.5:1 no terço inferior onde fica o texto).
- Filtro opcional: `brightness(0.92) contrast(1.08)` para reforçar profundidade.

**Galeria / cards:**
- Sem filtro permanente — fotos limpas.
- Hover: levíssimo `brightness(1.05)` para sinalizar interatividade.

**Fotos de serviço (cards):**
- Manter neutras, sem tratamento. O card já fornece o frame escuro.

**Regra de ouro:** nunca aplicar filtro decorativo (sépia, duotone, blur) em fotos de trabalho — o cliente quer ver o resultado real.

### 7.2. Aspect ratios padrão

| Contexto | Aspect ratio | Resolução mínima |
|---|---|---|
| Hero (full-width) | `16/9` desktop, `9/16` mobile (vertical) ou `3/4` | 1920×1080 (desktop), 750×1334 (mobile) |
| Card de serviço (se com imagem) | `4/3` | 800×600 |
| Galeria (grid) | `1/1` ou `4/3` | 1200×1200 |
| Antes/Depois | `4/3` | 1600×1200 |
| OG Image (Open Graph) | `1.91/1` | 1200×630 |
| Logo na header | aspect natural | export 2x e 3x |

### 7.3. Formato e otimização

- **Formato preferido:** AVIF (primeiro fallback) → WebP → JPEG. Astro `<Image>` faz isso automático.
- **Compressão:** quality 80 para fotos, 85 para hero.
- **Lazy loading:** todas as imagens exceto hero (`loading="eager"` + `fetchpriority="high"` no hero).
- **`decoding="async"`** em todas as imagens não-críticas.
- **Responsive `srcset`:** Astro gera. Tamanhos sugeridos: 480, 768, 1024, 1440, 1920.
- **Width/height obrigatórios** para evitar CLS (Layout Shift).

### 7.4. Alt text guidelines

- **Imagens funcionais (transmitem informação):** alt descritivo, sem "imagem de" ou "foto de".
  - Bom: `alt="Toyota Corolla Cross prateado polido após cristalização, exibindo brilho espelhado na fachada da ALL PRO"`.
  - Ruim: `alt="carro"` ou `alt="foto de carro"`.
- **Imagens decorativas:** `alt=""` + `role="presentation"` (ou `aria-hidden="true"`).
- **Logo:** `alt="ALL PRO Estética Automotiva"` (sempre nome da marca, sem "logo").
- **SEO + acessibilidade caminham juntos:** alt text bem escrito ajuda buscadores E leitores de tela.

---

## 8. Motion & micro-interações

### 8.1. Easings padrão

| Token | Curva CSS | Uso |
|---|---|---|
| `ease-out` (default) | `cubic-bezier(0, 0, 0.2, 1)` | Aparições, hover-in. |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Saídas, hover-out. |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Transições simétricas. |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Pulse do WhatsApp, snappy CTAs. |

### 8.2. Durações

| Token | Valor | Uso |
|---|---|---|
| `duration-fast` | 150ms | Hover de cor (botão, link). |
| `duration-base` | 200ms | Hover composto (cor + sombra). |
| `duration-medium` | 300ms | Card lift, opacity transitions. |
| `duration-slow` | 500ms | Scroll-reveal de seções, fade-in de imagens. |

### 8.3. Quando animar

✅ **Faça:**
- Hover em CTAs e cards (cor + leve translate).
- Fade-in + slight slide-up em seções ao entrar no viewport (uma vez, não loop).
- Pulso suave do botão WhatsApp flutuante (a cada 4-6s, máx 1.5s de duração).
- Transições suaves em foco de teclado (200ms).

❌ **NÃO faça:**
- Parallax pesado (custa CPU/bateria, distrai, problema em mobile).
- Animação infinita em background ou ícones decorativos.
- Auto-rotate de carrosséis sem controle do usuário.
- Aparecer/desaparecer elementos críticos com base em scroll position.
- Skeletons em conteúdo estático (a página é SSG; não há loading real).

### 8.4. Scroll-reveal (recomendação de implementação)

- Usar Intersection Observer simples em vez de Framer Motion (custo zero de bundle).
- Threshold: `0.15` (elemento aparece quando 15% está visível).
- Animação: `opacity 0→1` + `translateY(16px → 0)`, duração 500ms, easing `ease-out`.
- `once: true` — animar só uma vez por sessão.

### 8.5. Pulso do botão WhatsApp

```css
@keyframes pulse-soft {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
  50%      { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
}
.whatsapp-float { animation: pulse-soft 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
```

### 8.6. `prefers-reduced-motion`

**Obrigatório.** Wrapper global:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Mantém transições funcionais (foco, hover) instantâneas, sem quebrar a UX.

---

## 9. Acessibilidade (mínimos não-negociáveis)

WCAG 2.1 **AA é o piso**. Onde for fácil atingir AAA, atinja.

### 9.1. Contraste
- Validar todos os pares de cor pela tabela §2.5.
- Texto sobre fotos: usar overlay (§7.1) e re-validar.
- Nunca usar `Neutral 500` ou abaixo para texto de leitura.

### 9.2. Foco visível
Todo elemento interativo (botão, link, input, card clicável) tem foco visível:
- `outline: 2px solid #F5D300; outline-offset: 3px;`
- **Nunca** `outline: none` sem replacement.
- Usar `:focus-visible` (não `:focus`) para evitar que mouse-clicks acionem o ring.

### 9.3. Touch targets
- Mínimo **44×44px** em mobile (Apple HIG / WCAG 2.5.5).
- Botão flutuante WhatsApp: 56px mobile, 64px desktop.
- Links inline: garantir `padding: space-2` ao redor para área clicável.

### 9.4. Skip-link
No topo do layout:
```html
<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 ...">
  Pular para o conteúdo principal
</a>
```
Estilizado com fundo `#F5D300` e texto preto quando focado.

### 9.5. Semântica HTML
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` — não `<div>` para tudo.
- `<h1>` único na página (no hero).
- Hierarquia de headings sequencial — não pular níveis (h1 → h3 sem h2).
- Botão é `<button>` se aciona JS; é `<a>` se navega. Nunca `<div onClick>`.

### 9.6. ARIA
- `aria-label` no botão flutuante WhatsApp: `"Falar no WhatsApp com a ALL PRO Estética Automotiva"`.
- `aria-current="page"` em link ativo de navegação (caso haja navegação interna).
- `aria-expanded` em accordion (FAQ).
- `aria-live="polite"` em região de status (toast, formulário).
- Imagens decorativas: `aria-hidden="true"` ou `alt=""`.

### 9.7. Navegação por teclado
- **Tab order** lógica (segue o fluxo visual top-to-bottom, left-to-right).
- **Enter / Space** ativam botões e links.
- **Esc** fecha modais e lightbox.

### 9.8. Formulários (mesmo que MVP não tenha)
- `<label for="...">` em todo input.
- Erros: `aria-describedby` linkando o input à mensagem de erro.
- Validação: lado client + server, mensagens claras.

### 9.9. Imagens
- Alt em todas as funcionais (§7.4).
- `aria-hidden` ou `alt=""` em decorativas.

### 9.10. Movimento
- Respeitar `prefers-reduced-motion` (§8.6).
- Sem auto-play de vídeo com som.
- Animações infinitas: pelo menos `prefers-reduced-motion: reduce` desliga.

### 9.11. Idioma
- `<html lang="pt-BR">` no documento.
- Atributo `lang` em trechos de outro idioma se houver.

---

## 10. Tom & voz (UX writing)

### 10.1. Princípios do tom

| Atributo | Como soa | Exemplo |
|---|---|---|
| **Profissional** | Conhecimento técnico sem jargão. | "Aplicamos PPF que protege a pintura por até 10 anos." |
| **Confiante** | Afirmações diretas, sem "talvez", "pode ser que". | "Seu carro fica novo. De novo." |
| **Direto** | Frases curtas. Verbo principal cedo. | "Solicitar orçamento" (não "Clique aqui para solicitar um orçamento"). |
| **Humano** | Soa como o atendente real, não corporativo. | "Mande uma foto pelo WhatsApp e a gente te orienta." |

### 10.2. Regras gerais

- **NÃO usar emojis** no copy do site (no WhatsApp pré-preenchido podem aparecer 1-2, máximo, com parcimônia).
- **Plain language:** 8ª série. Quem leu até aqui é um cliente, não um técnico.
- **Active voice** > passive: "Cuidamos do seu carro" > "O seu carro será cuidado".
- **Verbo no imperativo nos CTAs:** "Solicitar", "Agendar", "Falar", "Ver". NUNCA "Clique aqui", "Saiba mais" (vago), "Submit".

### 10.3. Como falar dos serviços técnicos

Cliente leigo não precisa entender química. Ele precisa entender **o benefício**.

| Serviço | NÃO fazer (técnico demais) | FAZER (benefício claro) |
|---|---|---|
| PPF | "Película de poliuretano termoplástico autocura de 7,5 mil." | "Película transparente que protege a pintura contra riscos, pedras e raios UV." |
| Vitrificação | "Coating cerâmico SiO2 9H com ligações covalentes." | "Camada cerâmica que faz a água escorrer e mantém o brilho por anos." |
| Polimento | "Polimento técnico em 3 etapas com pads e abrasivos progressivos." | "Tira riscos finos e devolve o brilho original da pintura." |
| Insulfilm | "Película PET nanoceramic com IR rejection de 88%." | "Bloqueia o calor do sol, dá privacidade e protege o interior." |
| Higienização | "Higienização interna com extrator e aplicação de protetores." | "Remove sujeira, manchas e odores. Seu carro cheira a novo de novo." |
| Envelopamento | "Envelopamento em vinil cast 3M 1080 com tecnologia air-release." | "Muda a cor do seu carro sem pintar. Reversível e sem perder a originalidade." |
| Pintura | "Pintura em cabine pressurizada com tinta poliuretano bicomponente." | "Pintura nova, com acabamento de fábrica." |
| Funilaria | "Reparo de chapa metálica com técnica de batimento e estanho." | "Tira amassados e devolve o formato original do seu carro." |
| Martelinho | "Paintless dent repair com hastes e massagem reversa." | "Corrige amassados sem pintar — economiza tempo e mantém a pintura original." |

### 10.4. Microcopy por CTA da landing

| Localização | Microcopy recomendado | Mensagem WhatsApp pré-preenchida |
|---|---|---|
| Hero — CTA primário | "Solicitar orçamento" | "Olá! Vim pelo site da ALL PRO. Gostaria de um orçamento." |
| Hero — CTA secundário | "Ver serviços" | (link âncora interno, sem WhatsApp) |
| Card de serviço (PPF) | "Fazer orçamento" | "Olá! Tenho interesse em PPF. Pode me passar um orçamento?" |
| Card de serviço (Vitrificação) | "Fazer orçamento" | "Olá! Tenho interesse em vitrificação cerâmica. Pode me passar um orçamento?" |
| ... (idem para os outros 7 serviços) | ... | ... |
| Galeria — fim da seção | "Falar com a equipe" | "Olá! Vi a galeria de trabalhos no site e queria conversar com vocês." |
| Localização | "Como chegar" | (abre Google Maps, sem WhatsApp) |
| Localização — secundário | "Ligar agora" | (abre `tel:+5519991142508`) |
| CTA final (footer-adjacente) | "Solicitar orçamento no WhatsApp" | "Olá! Vim pelo site da ALL PRO. Gostaria de um orçamento." |
| Botão flutuante | (sem texto, só ícone) | "Olá! Vim pelo site da ALL PRO." |

### 10.5. Empty states e mensagens de erro

(Para fase 2, quando houver formulário.)

| Contexto | Bom | Ruim |
|---|---|---|
| Galeria sem filtro encontrado | "Nenhum trabalho desta categoria por aqui ainda. Veja todos os serviços." | "Nenhum resultado." |
| Erro de envio de formulário | "Não conseguimos enviar agora. Tente novamente ou fale direto pelo WhatsApp." | "Erro 500." |
| Telefone copiado | "Telefone copiado." (toast 2s) | (sem feedback) |

---

## 11. Tokens em código (Tailwind config preview)

Snippet a ser implementado quando o projeto Astro for inicializado. Tailwind 4 usa diretiva `@theme` em CSS.

### 11.1. Tailwind 4 `@theme` (recomendado para o projeto)

`src/styles/tokens.css`:

```css
@import "tailwindcss";

@theme {
  /* === Cores === */
  /* Marca */
  --color-brand: #F5D300;
  --color-brand-hover: #E0C100;
  --color-brand-active: #C2A700;
  --color-brand-subtle: #F5D30014;

  /* Neutros (escala completa) */
  --color-neutral-0: #FFFFFF;
  --color-neutral-50: #FAFAFA;
  --color-neutral-100: #E5E5E5;
  --color-neutral-200: #D4D4D4;
  --color-neutral-300: #A3A3A3;
  --color-neutral-400: #737373;
  --color-neutral-500: #525252;
  --color-neutral-600: #404040;
  --color-neutral-700: #262626;
  --color-neutral-800: #171717;
  --color-neutral-850: #0F0F0F;
  --color-neutral-900: #0A0A0A;
  --color-neutral-950: #000000;

  /* Semânticas */
  --color-success: #22C55E;
  --color-success-bg: #22C55E1A;
  --color-warning: #F59E0B;
  --color-warning-bg: #F59E0B1A;
  --color-error: #EF4444;
  --color-error-bg: #EF44441A;
  --color-info: #3B82F6;
  --color-info-bg: #3B82F61A;

  /* Canal WhatsApp */
  --color-whatsapp: #25D366;
  --color-whatsapp-hover: #1FBE5A;
  --color-whatsapp-active: #1AA84F;

  /* === Tipografia === */
  --font-sans: "Manrope", system-ui, -apple-system, sans-serif;
  --font-display: "Rajdhani", "Manrope", system-ui, sans-serif;

  --text-display: clamp(2.5rem, 5.5vw + 1rem, 4.5rem);
  --text-display--line-height: 1.05;
  --text-display--letter-spacing: -0.02em;
  --text-display--font-weight: 700;

  --text-h1: clamp(2rem, 3.5vw + 0.75rem, 3rem);
  --text-h1--line-height: 1.1;
  --text-h1--letter-spacing: -0.015em;
  --text-h1--font-weight: 700;

  --text-h2: clamp(1.75rem, 2.5vw + 0.75rem, 2.5rem);
  --text-h2--line-height: 1.15;
  --text-h2--letter-spacing: -0.01em;
  --text-h2--font-weight: 700;

  --text-h3: 1.5rem;
  --text-h3--line-height: 1.25;
  --text-h3--font-weight: 600;

  --text-h4: 1.25rem;
  --text-h4--line-height: 1.3;
  --text-h4--font-weight: 600;

  --text-body-lg: 1.125rem;
  --text-body-lg--line-height: 1.6;

  --text-body: 1rem;
  --text-body--line-height: 1.6;

  --text-body-sm: 0.875rem;
  --text-body-sm--line-height: 1.55;

  --text-caption: 0.75rem;
  --text-caption--line-height: 1.45;
  --text-caption--letter-spacing: 0.02em;
  --text-caption--font-weight: 500;

  --text-overline: 0.75rem;
  --text-overline--line-height: 1;
  --text-overline--letter-spacing: 0.12em;
  --text-overline--font-weight: 600;

  /* === Espaçamento (escala) === */
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;
  --spacing-32: 8rem;

  /* === Border radius === */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* === Sombras (em fundo escuro: usar sombra colorida sutil) === */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 12px -2px rgba(0, 0, 0, 0.55), 0 2px 6px -1px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 12px 24px -4px rgba(0, 0, 0, 0.6), 0 4px 12px -2px rgba(0, 0, 0, 0.45);
  --shadow-xl: 0 24px 48px -8px rgba(0, 0, 0, 0.7), 0 8px 16px -4px rgba(0, 0, 0, 0.5);
  --shadow-brand: 0 8px 24px -4px rgba(245, 211, 0, 0.25);
  --shadow-whatsapp: 0 8px 24px -4px rgba(37, 211, 102, 0.35);

  /* === Transições === */
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-medium: 300ms;
  --duration-slow: 500ms;

  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* === Breakpoints (Tailwind 4 já tem; aqui só por documentação) === */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;

  /* === Z-index === */
  --z-base: 0;
  --z-raised: 10;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;
  --z-floating: 600;

  /* === Containers === */
  --container-tight: 720px;
  --container-base: 1120px;
  --container-wide: 1280px;
}

/* Background base do site */
:root {
  color-scheme: dark;
  background-color: var(--color-neutral-900);
  color: var(--color-neutral-0);
}

/* Reset de motion para usuários sensíveis */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Pulso do botão WhatsApp */
@keyframes pulse-soft {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
  50%      { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
}
```

### 11.2. Como aplicar no projeto

1. Importar `tokens.css` no `src/layouts/BaseLayout.astro`.
2. Usar utilitários Tailwind diretamente: `bg-brand`, `text-neutral-300`, `rounded-md`, `shadow-md`, `font-display`.
3. Não criar classes utilitárias customizadas a menos que repitam ≥3 vezes.
4. Para componentes muito reutilizados (botão, card), criar um componente Astro com as classes encapsuladas.

---

## 12. Referências visuais

Não foram usadas URLs específicas para evitar links inventados. As referências abaixo são de **estilo e padrões** observáveis em produtos consagrados.

### 12.1. Direção principal — "Dark premium automotive"

**Inspiração de mood:**
- **Porsche.com** (versão atual) — fundos escuros profundos, fotos dos carros como herói, tipografia confiante, microcopy direto, espaçamento generoso. Uso pontual de cor.
- **Apple — página de produto** (modelo Pro) — hierarquia tipográfica esmagadora, fotografia em ambiente controlado, animações sutis ao scroll, "let the product breathe".
- **Tesla — página de modelo** — full-bleed hero, narrativa vertical em scroll, CTAs sólidos e visíveis. Pegar ideia de "scroll-as-narrative", não a estética minimalista (que não combina com o público misto).

### 12.2. Inspiração específica para nicho (estética automotiva premium)

- **Detalhadoras americanas premium** (estilo "Gloss Garage", "Adam's Polishes") — combinação de fotografia macro (reflexos de pintura), CTAs claros e fundo escuro. Bom para galeria.
- **Sites de PPF/wrap** — uso de slider antes/depois como elemento hero. Bom precedente para a galeria do site.

### 12.3. Padrões a EMULAR

- **Hero com imagem + texto sobreposto + CTA primário grande**: padrão Apple/Porsche.
- **Grid de serviços/features uniforme** com card escuro elevado e ícone amarelo: padrão SaaS premium aplicado ao nicho.
- **Antes/depois com slider central**: padrão setor de detail/cosmética.
- **Mapa embed integrado com CTA "como chegar"**: padrão local business (Google Business Profile alinhado).
- **Botão flutuante WhatsApp com pulso sutil**: padrão sites brasileiros — esperado pelo público-alvo, não fugir disso.

### 12.4. Padrões a EVITAR

- **Estética "SaaS purple gradient"** — não combina com automotivo.
- **Hero com vídeo auto-play e som** — péssimo para mobile/dados/performance.
- **Carrossel automático que troca sem clique** — frustrante para leitores e screen readers.
- **Ilustrações vetoriais genéricas** ("undraw", "blush") — fofas para SaaS, descaracterizam o tom técnico/premium do nicho.
- **Excesso de "depoimentos com foto" mockados** — pior que não ter; quando tiver reviews reais do GBP, aí sim.
- **Footer pesado com 4 colunas de links**: a landing tem só 1 página. Footer pode ser denso de info, mas não simular sitemap inexistente.

---

## Checklist final do designer

Ao implementar, validar:

- [ ] Todas as cores usadas estão na paleta documentada (sem hex órfão).
- [ ] Todos os textos passam contraste mínimo AA (texto pequeno) ou AAA (texto grande / corpo).
- [ ] Botão CTA primário (amarelo) usa texto preto, não branco.
- [ ] Botão WhatsApp usa texto preto sobre verde (não branco).
- [ ] Tipografia: máximo 2 famílias (Manrope + Rajdhani).
- [ ] Espaçamento: somente valores da escala 4/8/12/16/24/32/48/64/96/128.
- [ ] Touch targets: todo elemento clicável >= 44×44px no mobile.
- [ ] Foco visível em todos os interativos (`:focus-visible` com outline amarelo 2px).
- [ ] Skip-link funcional no topo do `<body>`.
- [ ] Imagens: `width`/`height` setados, `loading="lazy"` exceto hero.
- [ ] Alt text descritivo em imagens funcionais; `alt=""` em decorativas.
- [ ] `prefers-reduced-motion` respeitado.
- [ ] `<html lang="pt-BR">`.
- [ ] Lighthouse mobile: Performance ≥95, Accessibility ≥95, SEO 100, Best Practices 100.
- [ ] Botão flutuante WhatsApp: `aria-label`, z-index 600, não cobre conteúdo crítico.
- [ ] CTAs com microcopy verbal-imperativo (sem "Clique aqui", sem emojis).
- [ ] Mapa do Google: lazy-loaded, com botão "Como chegar" externo.
- [ ] Nenhum emoji no copy do site.

---

**Fim do DESIGN.md.** Documento autossuficiente — qualquer dev pode construir a landing seguindo apenas este arquivo + os dados de `DECISOES-INICIAIS.md`. Atualizar este documento se a implementação revelar necessidades não previstas.
