
const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    recipient: { type: 'string' },
    channel: { type: 'string', enum: ['email','sms'] },
    template_id: { type: 'string' },
    params: { type: 'object' },
    metadata: { type: 'object' }
  },
  required: ['recipient','channel','template_id'],
  additionalProperties: false
};

const validate = ajv.compile(schema);

function validateNotification(payload) {
  const valid = validate(payload);
  return { valid, errors: valid ? null : validate.errors };
}

module.exports = { validateNotification };
