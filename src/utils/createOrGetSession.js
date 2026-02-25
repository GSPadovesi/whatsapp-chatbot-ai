const { sessions } = require('../config/whatsappClient');


function createOrGetSession(sessionId) {
  if(!sessions[sessionId]) return sessions[sessionId] = { isActive: false };
  
  return sessions[sessionId];
}

module.exports = { createOrGetSession };