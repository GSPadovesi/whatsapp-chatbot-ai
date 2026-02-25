const { client } = require('../config/whatsappClient');
const { createOrGetSession } = require('../utils/createOrGetSession');
const { generateGeminiResponse } = require('../config/geminiClient');
const { prompt } = require('../utils/promptGemini');
const qrcode = require('qrcode-terminal');

const ACTIVE_IA = 'ativar ia';
const DESACTIVE_IA = 'desativar ia';

client.on('qr', (qr) => {
  console.log('QR Code gerado, escaneie para autenticar.');
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => console.log('authenticated'));
client.on('loading_screen', (p, m) => console.log(`loading: ${p}% - ${m}`));
client.on('change_state', (s) => console.log('state:', s));
client.on('disconnected', (r) => console.log('disconnected:', r));
client.on('auth_failure', (m) => console.log('auth_failure:', m));
client.on('ready', () => console.log('ready'));

client.on('message', async (msg) => {
  const chatId = msg.from;
  const session = createOrGetSession(chatId);
  const isGroup = chatId.includes('@g.us');
  if (isGroup) return;
  if (typeof msg.body !== 'string' || msg.body.trim() === '') return;

  const text = msg.body.toLowerCase();

  if (text === ACTIVE_IA && !session.isActive) {
    await msg.reply('Criando sessao para IA...');
    session.isActive = true;

    await client.sendMessage(
      chatId,
      `Sua sessao foi criada com o id: ${chatId}. Agora, as mensagens que voce enviar serao processadas por IA!`
    );

    return;
  }

  if (text === DESACTIVE_IA) {
    await msg.reply('Desativando sessao de IA...');
    session.isActive = false;

    await client.sendMessage(
      chatId,
      `Sua sessao de id: ${chatId} foi desativada. As mensagens que voce enviar nao serao mais processadas por IA!`
    );

    return;
  }

  if (session.isActive) {
    try {
      const answer = await generateGeminiResponse(prompt, msg.body);
      await msg.reply(answer);
    } catch (error) {
      console.error('Error processing message with IA:', error);
      session.isActive = false;
      await msg.reply('Desculpe, ocorreu um erro ao processar sua mensagem com IA. Por favor, tente novamente mais tarde.');
    }
  }
});
