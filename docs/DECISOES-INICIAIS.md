# Decisões Iniciais — ALL PRO Estética Automotiva

> Documento de referência rápida com as decisões travadas no kickoff do projeto.
> Para o blueprint técnico detalhado anterior (multi-page), ver [`PLANO-TECNICO.md`](./PLANO-TECNICO.md) — **note que o escopo foi simplificado para landing page única em 2026-04-29**, então a §2 e §3 daquele documento estão parcialmente obsoletas. Este documento é a fonte da verdade.
>
> **Data:** 2026-04-29
> **Responsável:** gxavier@esapiens.com.br
> **Status:** Decisões aprovadas — pronto para iniciar implementação.

---

## 1. Identidade do projeto

| Campo | Valor |
|---|---|
| Nome do negócio | **ALL PRO Estética Automotiva** |
| Segmento | Estética automotiva (B2C) |
| Slogan principal (hero) | **"SEU CARRO NOVO DE NOVO"** (extraído da fachada) |
| Slogan secundário | **"O detalhe faz a diferença"** (do perfil de WhatsApp) |
| Tagline institucional | "Estética Automotiva Premium — cuidamos do seu carro com excelência e atenção aos detalhes" |
| Idioma do site | Português do Brasil (pt-BR) |
| Cidade-alvo | **Campinas - SP** |

---

## 2. Dados oficiais do negócio (confirmados via WhatsApp/GBP em 2026-04-29)

| Campo | Valor |
|---|---|
| Endereço | **Rua José Pugliesi Filho, 420 — Chácara Santa Margarida, Campinas - SP** |
| CEP | **13085-415** |
| WhatsApp / Telefone | **+55 (19) 99114-2508** |
| Categoria GBP | Insulfilm · Estética · Serviço automotivo |
| Tipo de conta | Conta comercial (Google Business Profile + WhatsApp Business) |
| Google Maps CID | `0x570670c2ad5e4bcc` (`6271074181028102604`) |

### Horário de funcionamento

| Dia | Horário |
|---|---|
| Segunda a Sexta | 08:00 — 17:00 |
| Sábado | 08:00 — 16:00 |
| Domingo | Fechada |

> Esses dados devem ser usados **idênticos** entre site, GBP, WhatsApp e Schema.org JSON-LD para consistência de NAP (SEO local).

---

## 3. Escopo do produto: **Landing Page Única**

> **Mudança de escopo** confirmada pelo cliente em 2026-04-29: o site será **uma única página** (one-page / landing page), e não multi-página como originalmente planejado.

### 3.1. Estrutura da landing page (ordem das seções)

1. **Hero** — Slogan principal + CTA WhatsApp + foto da fachada/carro
2. **Sobre / Posicionamento curto** — "O detalhe faz a diferença" + 3 diferenciais (qualidade, atendimento, alto padrão)
3. **Serviços** — Grid com os 9 serviços (cards com ícone + nome + descrição curta + CTA "Solicitar pelo WhatsApp")
4. **Galeria / Antes-Depois** — Carrossel ou grid simples de fotos de trabalhos (placeholder até cliente enviar)
5. **Localização** — Endereço, horário, embed do Google Maps (rua José Pugliesi Filho, 420)
6. **Contato / CTA final** — Botão grande WhatsApp + telefone clicável + horário
7. **Footer** — Logo, redes sociais, copyright, link para política de privacidade
8. **Botão flutuante WhatsApp** — fixo em todas as posições de scroll

### 3.2. Lista de serviços (mantida)

1. PPF (película de proteção de pintura)
2. Polimento técnico e cristalização
3. Vitrificação e proteção cerâmica
4. Higienização interna e lavagem detalhada
5. Envelopamento automotivo e customização
6. Insulfilm (controle solar, privacidade, estética)
7. Pintura
8. Funilaria
9. Martelinho de ouro

---

## 4. Decisões técnicas travadas

### 4.1. Stack — recomendação revisada para o novo escopo

> Como o escopo agora é **uma única página estática**, a stack ideal é **Astro + TailwindCSS** em vez de Next.js. Razão: Astro entrega HTML estático com **zero JS por padrão**, Lighthouse 100 mais fácil, build mais rápido, hospedagem mais barata. Next.js permanece viável, mas é overkill para uma landing page institucional.

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | **Astro 5** | Static-first, zero JS por padrão, ótimo para SEO e performance |
| Styling | **TailwindCSS 4** | Velocidade de prototipagem, design system via tokens |
| UI primitives | **shadcn/ui** (via Astro adapter) ou componentes próprios | Botões, cards, accordions |
| Ícones | **lucide-astro** | Consistência visual |
| Hospedagem | **Vercel** ou **Cloudflare Pages** | Free tier, deploy automático via git, CDN global |
| Formulário (opcional) | **Web3Forms** ou **Formspree** | Sem backend; lead vai direto pro e-mail. Mas o canal primário é WhatsApp |
| Analytics | **GA4** + **Search Console** | Tráfego e SEO |
| Imagens | `<Image>` do Astro | Otimização automática (`.webp`/`.avif`, lazy load, responsive) |

> **Caso o cliente prefira Next.js** (já investido em React, equipe conhece), mantemos Next.js 15 App Router em modo estático (`output: 'export'`) — o resultado é equivalente. Astro é o **default recomendado** por entregar mais com menos complexidade.

### 4.2. Identidade visual

> **Atualizado em 2026-04-29** após validação do designer contra o `logo.jpg`. Paleta detalhada e validada (incluindo escala completa de neutros, cores semânticas e contrastes WCAG) está em [`DESIGN.md`](./DESIGN.md). O resumo abaixo é mantido por consistência.

- **Tema escuro fixo** (sem toggle dark/light).
- Paleta principal:
  - Fundo profundo: `#0A0A0A` (Neutral 900)
  - Superfície de cards: `#171717` (Neutral 800)
  - **Acento amarelo da marca (CTAs, destaques): `#F5D300`** — match preciso do amarelo do logo (substitui o `#FFD60A` originalmente proposto, que era levemente alaranjado/quente demais e fugia do logo real).
  - Texto principal: `#FFFFFF`
  - Texto secundário: `#A3A3A3` (Neutral 300)
  - Bordas sutis: `#262626` (Neutral 700)
- Tipografia: **Manrope** (texto) + **Rajdhani** (títulos display, estilo automotivo). Self-hosted via `@fontsource`.
- Botão WhatsApp: verde oficial `#25D366` com **texto preto** (contraste WCAG — branco sobre verde falha em AA).

### 4.3. Conversão

- **WhatsApp é o canal único de conversão** no MVP.
- Cada CTA usa link `wa.me/5519991142508` com mensagem pré-preenchida específica do contexto.
  - Hero: *"Olá! Vim pelo site. Gostaria de um orçamento."*
  - Card de serviço (ex.: PPF): *"Olá! Tenho interesse em PPF. Pode me passar um orçamento?"*
- Telefone também clicável via `tel:+5519991142508` para mobile.
- **Sem formulário** no MVP (simplificação adicional). Pode ser adicionado depois se houver demanda.

### 4.4. SEO local

- **Title:** `ALL PRO Estética Automotiva | PPF, Vitrificação, Insulfilm e Polimento em Campinas - SP`
- **Meta description:** ~155 chars destacando serviços + cidade + slogan.
- **JSON-LD `AutomotiveBusiness`** com NAP completo, horário, geo (lat/long da Rua José Pugliesi Filho 420), aggregateRating (assim que tivermos a nota do GBP).
- **JSON-LD `Service`** para cada um dos 9 serviços, dentro da home (não precisa de página separada por serviço, mas o schema ajuda).
- **OpenGraph + Twitter Cards** com a foto da fachada (`carro.webp`).
- **Sitemap.xml + robots.txt** automatizados pelo Astro.
- Embed do Google Maps direto da ficha existente (CID confirmado).
- **Palavras-chave-alvo:**
  - "ppf campinas"
  - "vitrificação carro campinas"
  - "insulfilm campinas"
  - "polimento automotivo campinas"
  - "estética automotiva chácara santa margarida"
  - "envelopamento campinas"

---

## 5. Pendências (não-bloqueantes para começar)

Com os dados confirmados, **a implementação pode começar**. Os itens abaixo são desejáveis mas não impedem o MVP:

- [ ] **Logo em vetor** (`.svg`) — temos só `.jpg`. Vetorizar a partir do raster atual.
- [ ] **Fotos de trabalhos** (galeria antes/depois) — usar placeholders por enquanto.
- [ ] **Instagram / Facebook / TikTok** oficiais — confirmar handles para footer.
- [ ] **CNPJ e razão social** — para footer e política de privacidade (LGPD).
- [ ] **Domínio** — sugerir `allproesteticaautomotiva.com.br` ou `allprocampinas.com.br`. Cliente compra; entrega DNS para apontar pra Vercel/Cloudflare.
- [ ] **E-mail oficial** — caso queiramos formulário em fase 2.
- [ ] **Confirmação dos slogans** — "SEU CARRO NOVO DE NOVO" como hero + "O detalhe faz a diferença" como sub-tagline (proposta).
- [ ] **Política de privacidade / LGPD** — texto pode ser gerado via template padrão.

---

## 6. Próximo passo concreto

1. **Inicializar o repositório git** preservando os arquivos atuais:
   ```bash
   cd /Users/esapiens/Projects/all-pro-estetica-automotiva
   git init -b main
   git add docs/ logo.jpg carro.webp fachada.webp
   git commit -m "chore: arquivos base e docs de planejamento"
   ```

2. **Criar projeto Astro** (sem apagar `docs/` nem as imagens):
   ```bash
   npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git
   npm install
   npx astro add tailwind sitemap
   ```

3. **Estrutura inicial sugerida:**
   ```
   src/
     components/
       Hero.astro
       Services.astro
       ServiceCard.astro
       About.astro
       Gallery.astro
       Location.astro
       Contact.astro
       Footer.astro
       WhatsAppFloat.astro
     content/
       services.ts          # array com os 9 serviços
       business.ts          # dados oficiais (NAP, horário) — fonte única
     layouts/
       BaseLayout.astro
     pages/
       index.astro          # única página
     styles/
       tokens.css           # paleta, tipografia
   public/
     logo.svg               # quando vetorizado
     og-image.jpg           # carro.webp adaptada
   ```

4. **Mover imagens** atuais para `src/assets/` (para passar pela otimização do Astro):
   - `carro.webp` → hero
   - `fachada.webp` → seção de localização

5. **Implementar na ordem:** layout base → hero → serviços → localização → contato → footer → WhatsApp flutuante → polish (animações sutis, responsividade fina).

---

## 7. Notas técnicas

- **Avisos de cSpell** em `PLANO-TECNICO.md`: warnings do dicionário inglês para palavras pt-BR (`servicos`, `vitrificacao`, `insulfilm`) e marcas (`Suntek`, `XPEL`, `Rajdhani`). Adicionar `.cspell.json` na raiz com dicionário pt-BR + termos do domínio quando o repo for criado.
- **Compatibilidade do `PLANO-TECNICO.md`**: as seções 1, 4, 5, 6, 7, 8, 9, 10 daquele doc seguem 100% válidas. As seções 2 (sitemap multi-page) e 3 (stack Next.js) foram **substituídas** por este documento. As seções 7 (estrutura de pastas) também precisa ser ajustada para Astro — ver §6 acima.
