const { Client } = require('whatsapp-web.js');

const client = new Client({
  puppeteer: {
    headless: false
  }
});

client.initialize();
const sessions = {};
 
module.exports = { client, sessions };