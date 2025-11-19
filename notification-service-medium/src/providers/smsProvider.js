
async function sendSms(payload) {
  const body = `SMS to ${payload.recipient}: template=${payload.template_id}`;
  console.log('(smsProvider) sending to', payload.recipient, 'body:', body);
  await new Promise(r => setTimeout(r, 150));
  return { status: 'sent', provider: 'sms' };
}
module.exports = { sendSms };
