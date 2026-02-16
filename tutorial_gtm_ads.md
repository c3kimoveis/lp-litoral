# Tutorial: Configuração de Conversão Google Ads no GTM

Este tutorial explica como configurar o Google Tag Manager (GTM) para capturar o evento de conversão `generate_lead` que foi implementado no formulário da sua Landing Page.

## Pré-requisitos

- Acesso à conta do [Google Ads](https://ads.google.com).
- Acesso ao container do [Google Tag Manager](https://tagmanager.google.com).
- O ID do GTM instalado no código é `GTM-52TJ7TF4`.

---

## 1. Obter ID e Label de Conversão no Google Ads

1. No Google Ads, clique em **Metas (Goals)** > **Conversões (Conversions)** > **Resumo**.
2. Clique em **+ Nova ação de conversão**.
3. Selecione **Site**.
4. Insira o domínio do site e verifique.
5. Role até **Adicionar uma conversão manualmente**.
6. Configure:
   - **Categoria**: Enviar formulário de lead.
   - **Nome da conversão**: Ex: "Lead LP Carneiros".
   - **Valor**: Usar valores diferentes para cada conversão (o código envia `1.0` por padrão).
   - **Contagem**: Uma.
7. Clique em **Concluir** > **Salvar e continuar**.
8. Na aba "Configuração da tag", escolha **Usar o Gerenciador de Tags do Google**.
9. **Anote**:
   - **ID de Conversão** (Conversion ID)
   - **Rótulo de Conversão** (Conversion Label)

---

## 2. Configurar Variáveis no GTM (Opcional)

O código agora envia `value` e `currency` no `dataLayer` (padrão GA4). Para capturá-los:

1. No GTM, vá em **Variáveis** > **Nova** (em Variáveis Definidas pelo Usuário).
2. **Configuração da Variável**:
   - Tipo: **Variável da Camada de Dados** (Data Layer Variable).
   - **Nome da Variável da Camada de Dados**: `value`.
   - Nomeie a variável no GTM como: `dlv - value`.
3. Repita para a moeda:
   - **Nome da Variável da Camada de Dados**: `currency`.
   - Nomeie a variável no GTM como: `dlv - currency`.

---

## 3. Criar o Acionador (Trigger)

Este passo conecta o evento do código ao GTM.

1. No GTM, vá em **Acionadores** > **Novo**.
2. **Configuração do Acionador**:
   - Tipo: **Evento Personalizado**.
   - **Nome do evento**: `generate_lead` (Exatamente como escrito, tudo minúsculo).
   - Disparar em: Todos os eventos personalizados.
3. Nomeie o acionador como `Evento - Generate Lead` e Salve.

---

## 4. Criar a Tag de Conversão Google Ads

1. No GTM, vá em **Tags** > **Nova**.
2. **Configuração da Tag**:
   - Tipo: **Acompanhamento de Conversões do Google Ads**.
   - **Código de Conversão**: Cole o ID do Passo 1.
   - **Rótulo de Conversão**: Cole o Label do Passo 1.
   - **Valor da Conversão**: Clique no ícone de `+` e selecione `{{dlv - value}}` (ou digite 1).
   - **Código da Moeda**: Selecione `{{dlv - currency}}` (ou digite BRL).
3. **Vinculador de Conversões**:
   - Se aparecer um aviso, crie a tag "Vinculador de Conversões" (Conversion Linker) para disparar em "All Pages".
4. **Acionamento**:
   - Selecione o acionador criado no Passo 3 (`Evento - Generate Lead`).
5. Nomeie a tag como `Ads - Conversão Lead` e Salve.

---

---

## 5. Configurar Tag de Remarketing

Essa tag permite criar públicos de quem visitou a página (ex: "Visitantes 30 dias"), mesmo que não tenham se cadastrado.

1. No GTM, vá em **Tags** > **Nova**.
2. **Configuração da Tag**:
   - Tipo: **Remarketing do Google Ads** (Google Ads Remarketing).
   - **Código de Conversão**: Use o mesmo ID que obteve no Passo 1 (Conversion ID).
   - **Rótulo de Conversão (Label)**: Deixe em branco (geralmente não é necessário para o remarketing padrão da página).
3. **Acionamento (Trigger)**:
   - Selecione **All Pages** (Todas as Páginas).
4. Nomeie a tag como `Ads - Remarketing` e Salve.

---

## 6. Testar e Publicar

1. Clique em **Visualizar** (Preview) no GTM.
2. Insira a URL da sua LP e conecte.
3. Preencha o formulário na LP e envie.
4. No **Tag Assistant**:
   - Verifique se o evento `generate_lead` apareceu na esquerda.
   - Verifique se a tag `Ads - Conversão Lead` foi disparada ("Tags Fired").
5. Se funcionou, volte ao GTM e clique em **Enviar** para publicar.
