
const { sendEmail } = require('../providers/emailProvider');
const { sendSms } = require('../providers/smsProvider');

async function dispatch(payload) {
  switch (payload.channel) {
    case 'email':
      return sendEmail(payload);
    case 'sms':
      return sendSms(payload);
    default:
      throw new Error('unsupported channel');
  }
}

module.exports = { dispatch };
