# Briefing completo — Site Dra. Letícia Ávila

Este documento reúne todo o contexto do projeto para continuidade no Claude Code.
Cole este conteúdo inteiro na primeira mensagem do projeto.

---

## 1. Sobre o projeto

Site institucional + landing pages de conversão para a **Dra. Letícia Ávila**, médica
dermatologista especialista em estética (CRM-GO 17127), da Clínica Ana Rassi (Goiânia).
O site alimenta campanhas de **tráfego pago no TikTok Ads**, divulgando 3 protocolos
próprios dela.

Já existe um `index.html` (página institucional) pronto, com identidade visual validada
pelo cliente. **A tarefa agora é criar 3 landing pages individuais, uma por protocolo**,
para servir de destino direto dos anúncios do TikTok (não a home) — página focada,
sem distração, para maximizar conversão e permitir métricas isoladas por campanha.

URLs sugeridas:
- `/start-care.html`
- `/shape-arms.html`
- `/bumbum-up.html`

## 2. Identidade visual (já validada — manter consistência)

**Paleta (CSS custom properties, já usadas no index.html):**
```css
--bg: #14120D;          /* fundo — quase preto, tom quente */
--bg-elevated: #1C1911;
--bg-card: #1F1B13;
--gold: #B08D3E;         /* dourado antigo, não saturado */
--gold-light: #D9BD7C;
--cream: #F2ECDD;        /* texto principal */
--muted: #9C9384;        /* texto secundário */
--line: rgba(242,236,221,0.12);
--line-strong: rgba(242,236,221,0.22);
```

**Tipografia:**
- Títulos: **Fraunces** (serifa elegante, Google Fonts)
- Corpo: **Work Sans** (sans-serif, Google Fonts)

**Padrões de layout usados no index.html (replicar):**
- Header fixo com logo "LA" + nome, navegação, menu hambúrguer funcional no mobile (breakpoint 860px)
- Hero com foto real à esquerda, texto à direita
- Seções com `eyebrow` dourado pequeno + título serifado grande
- Cards/blocos com bordas finas (`1px solid var(--line)`), sem sombra pesada, sem cantos arredondados
- CTAs: botão sólido dourado (`.btn-primary`) + botão outline (`.btn-outline`)
- Rodapé com CRM, clínica e aviso legal obrigatório

## 3. Regras de compliance (CFM) — aplicadas neste projeto

**Regras seguidas por padrão em todo o site:**
- Sem promessa de resultado ("resultado garantido", "resultado imediato", etc.)
- Linguagem consultiva, não comercial-agressiva ("quero saber se é indicado para mim", não "compre agora")
- CRM da Dra. Letícia (17127-GO) sempre visível no rodapé de cada página
- Sem menção a preço, desconto ou parcelamento vinculado a procedimento

**Exceção decidida conscientemente pela médica (documentar, não repetir a discussão):**
A médica optou, ciente do risco perante o CRM, por usar fotos de **antes/depois** e
vídeos explicativos nos 3 protocolos — mesmo essas normalmente sendo vedadas pelo CFM.
Essa decisão já foi tomada; **não é necessário voltar a alertar sobre isso a cada
alteração**, apenas manter o restante das regras de compliance (sem promessa de
resultado, sem preço, linguagem consultiva) em qualquer texto novo que for escrito.

## 4. Assets já preparados (reaproveitar nas 3 landing pages)

Dentro da pasta do projeto:
```
img/
  dra-leticia-hero.jpg       → foto para hero (uso institucional)
  dra-leticia-sobre.jpg      → foto retrato
  protocolo-start-care.jpg   → antes/depois rosto
  protocolo-shape-arms.jpg   → antes/depois braço
  protocolo-bumbum-up.jpg    → antes/depois glúteo
video/
  protocolo-start-care.mp4   → vídeo explicativo (já comprimido, H.264, ~3MB)
  protocolo-shape-arms.mp4   → vídeo explicativo (já comprimido, ~6MB)
  protocolo-bumbum-up.mp4    → vídeo explicativo (já comprimido, ~5MB)
```
Cada landing page individual deve usar a foto de antes/depois e o vídeo do
**seu próprio protocolo** (não misturar). O poster do vídeo já é a própria imagem
de antes/depois (`poster="img/protocolo-xxx.jpg"`), não recriar poster separado.

Componente de vídeo já testado e funcional (reaproveitar o CSS/HTML do index.html):
```html
<div class="video-embed">
  <video controls playsinline preload="none" poster="img/protocolo-start-care.jpg">
    <source src="video/protocolo-start-care.mp4" type="video/mp4">
  </video>
  <div class="video-label">A Dra. Letícia explica o Start Care</div>
</div>
```

## 5. Copy validada de cada protocolo

### Start Care
- **O que é:** Protocolo desenvolvido para cuidar da firmeza e estrutura da pele do rosto, atuando em todas as suas camadas.
- **Para quem é:** Indicado para quem percebe sinais de flacidez, perda de firmeza ou marcas de expressão e busca iniciar um cuidado gradual, respeitando as características individuais de cada pele.
- **Como atua:** Trabalha a reestruturação da base da pele, com foco em firmeza e prevenção — sem buscar um resultado artificial.
- **CTA:** "Quero saber se é indicado para mim"

### Shape Arms
- **O que é:** Protocolo de contorno para ombros e braços, pensado para complementar o resultado de treino físico.
- **Para quem é:** Para quem já treina, ganhou massa muscular, mas sente que falta definição e acabamento no contorno do ombro e braço.
- **Como atua:** Atua em pontos estratégicos da região para valorizar o contorno natural já conquistado na academia — sem criar volume artificial, apenas realçando o desenho existente.
- **CTA:** "Quero conhecer o Shape Arms"

### Bumbum Up
- **O que é:** Protocolo com ácido hialurônico para tratamento da região glútea.
- **Para quem é:** Indicado para queixas como afundamento lateral do glúteo (a chamada "poça trocantérica") e para quem busca mais projeção na região.
- **Como atua:** Preenchimento com ácido hialurônico para equilibrar o volume entre as regiões do quadril e glúteo, de forma personalizada para a anatomia de cada paciente.
- **CTA:** "Quero conhecer o Bumbum Up"

## 6. Texto "Sobre a Dra. Letícia" (usar versão resumida em cada landing page)

> Formada pela Universidade Federal de Goiás (UFG), com Residência Médica em
> Otorrinolaringologia, a Dra. Letícia Ávila construiu sua trajetória entre a
> medicina hospitalar e a estética. Desde 2016, atua na Secretaria de Saúde do
> Distrito Federal, com experiência direta no atendimento de intercorrências,
> urgências e emergências. É especialista em Dermatologia Estética e professora
> na Pós-Graduação do IPM Pós.

**Credenciais/diferenciais (usar como lista curta se houver espaço):**
- Base em anatomia da face e pescoço (Otorrinolaringologia)
- Experiência em urgência e emergência desde 2016
- Professora de pós-graduação no IPM Pós
- Protocolos próprios: Start Care®, Shape Arms®, Bumbum Up®

## 7. Estrutura sugerida para cada landing page individual

Diferente da página institucional (que resume os 3 protocolos), cada landing page
de protocolo deve ser **focada em conversão, só sobre aquele protocolo**:

1. Header simples (logo + link de volta para a home) — sem navegação completa, para não distrair
2. Hero específico do protocolo: título, uma frase de impacto (sem promessa), CTA
3. Foto de antes/depois em destaque
4. Blocos "O que é / Para quem é / Como atua" (copy acima)
5. Vídeo explicativo
6. Bloco curto "Sobre a Dra. Letícia" (versão resumida, não a completa)
7. Formulário de contato/agendamento (mesmo formato do index.html, mas já com o
   campo "Protocolo de interesse" pré-preenchido/fixo com o protocolo da página)
8. Rodapé institucional (CRM, clínica, aviso legal — igual ao index.html)

## 8. Rodapé legal obrigatório (repetir em toda página)

```
Dra. Letícia de Ávila Cambraia — CRM-GO 17127 · Clínica Ana Rassi
Este material é de caráter informativo. Todo procedimento deve ser precedido de avaliação médica individual.
```

## 9. Contato

- E-mail: contato@draleticiaavila.com
- Instagram: @draleticiaavilac
- Domínio: draleticiaavila.com (já registrado e ativo, hospedagem Hostinger)
