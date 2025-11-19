
async function send(payload) {
  console.log('(legacyProvider) sending', payload.channel, 'to', payload.recipient);
  // simulate async delay
  await new Promise(r => setTimeout(r, 200));
  return { status: 'sent', provider: 'legacy' };
}
module.exports = { send };
