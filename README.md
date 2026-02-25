# Whatsapp Chatbot com Integracao IA

Chatbot de WhatsApp com integracao ao Gemini e controle de sessao por usuario.

## Visao geral

- Conecta no WhatsApp Web via `whatsapp-web.js`
- Ativa/desativa IA por chat com comandos de texto
- Quando ativo, envia a mensagem do usuario para o Gemini e responde no mesmo chat

## Requisitos

- Node.js 20.x (recomendado: `20.19.3`)
- Yarn
- Conta com acesso ao WhatsApp Web
- Chave Gemini (cada usuario deve usar a propria chave)

## Instalar

```bash
yarn install
```

Crie seu arquivo `.env` com base no exemplo:

```bash
cp .env.example .env
```

Depois, abra o `.env` e preencha com a sua chave Gemini:

```env
GEMINI_API_KEY=sua_chave_aqui
```

## Rodar

```bash
yarn start
```

Ao iniciar, um QR Code sera exibido no terminal para autenticar a sessao do WhatsApp.

## Comandos do bot

- `ativar ia`: ativa a sessao de IA para o chat atual
- `desativar ia`: desativa a sessao de IA para o chat atual

## Como funciona

1. O bot recebe mensagens no `client.on('message')`
2. Identifica o `chatId` (`msg.from`)
3. Ignora grupos (`@g.us`)
4. Controla a sessao em memoria por `chatId`
5. Se a sessao estiver ativa, chama o Gemini e responde

## Estrutura do projeto

- `src/index.js`: ponto de entrada e inicializacao do cliente
- `src/config/whatsappClient.js`: configuracao do cliente WhatsApp (com `LocalAuth`)
- `src/config/geminiClient.js`: integracao Gemini (`generateGeminiResponse`)
- `src/services/whatsappService.js`: listeners, comandos e fluxo principal
- `src/utils/createOrGetSession.js`: cria/busca sessao em memoria por chat
- `src/utils/promptGemini.js`: prompt base da IA

## Observacoes importantes

- As sessoes de IA estao em memoria e sao perdidas ao reiniciar a aplicação.
- Se a API Gemini retornar erro de cota (`429`), verifique limites/plano da chave.
- Se houver erro de modelo (`404`), confirme se o nome do modelo no `geminiClient` esta disponivel para seu projeto.

## Proximos passos futuramente (escalabilidade)

- Persistir sessoes em banco (Redis/SQLite/Postgres)
- Separar regras de negocio em servicos menores
- Adicionar logs estruturados e metricas
- Adicionar um contexto para a IA:
  - memoria por `chatId` (preferencias e fatos do usuario)
  - historico curto + resumo de longo prazo
  - prompt dinamico com perfil do usuario e contexto recente
  - opcao de apagar memoria e controles de privacidade
- Criar testes automatizados para comandos e fluxo de IA
