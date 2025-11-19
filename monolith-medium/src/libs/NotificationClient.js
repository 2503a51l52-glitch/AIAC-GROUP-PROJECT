
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const legacyProvider = require('./legacyProvider');

const useService = process.env.USE_NOTIFICATION_SERVICE === 'true';
const NOTIFY_URL = process.env.NOTIFY_URL || 'http://localhost:3000';

async function sendNotification(payload) {
  if (!payload.metadata) payload.metadata = {};
  if (!payload.metadata.request_id) payload.metadata.request_id = uuidv4();

  if (useService) {
    const url = `${NOTIFY_URL}/notify`;
    const res = await axios.post(url, payload, { timeout: 5000 });
    return res.data;
  } else {
    return legacyProvider.send(payload);
  }
}

module.exports = { sendNotification };
