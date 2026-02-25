const { client } = require('./config/whatsappClient');
require('./services/whatsappService');

console.log('[boot] pid:', process.pid);

client.initialize().catch((error) => {
  console.error('Client initialization failed:', error.message);
});
