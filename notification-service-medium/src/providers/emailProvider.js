
async function sendEmail(payload) {
  // simple template replacement for demo
  const body = `Hello ${payload.params && payload.params.name ? payload.params.name : ''}, template=${payload.template_id}`;
  console.log('(emailProvider) sending to', payload.recipient, 'body:', body);
  // simulate delay
  await new Promise(r => setTimeout(r, 200));
  return { status: 'sent', provider: 'email' };
}
module.exports = { sendEmail };
