
const express = require('express');
const router = express.Router();
const { sendNotification } = require('../src/libs/NotificationClient');

// POST /order { orderId, userEmail, userName }
router.post('/', async (req, res) => {
  const { orderId, userEmail, userName } = req.body;
  if (!orderId || !userEmail) return res.status(400).json({ error: 'orderId and userEmail required' });

  // pretend to create order...
  const order = { id: orderId, email: userEmail, name: userName || 'User' };

  // notify user
  const payload = {
    recipient: userEmail,
    channel: 'email',
    template_id: 'order_created',
    params: { orderId, name: userName || 'Customer' },
    metadata: { request_id: `order-${orderId}-${Date.now()}` }
  };

  try {
    await sendNotification(payload);
    return res.status(201).json({ status: 'order_created', order });
  } catch (err) {
    console.error('notify error', err && err.message);
    return res.status(201).json({ status: 'order_created', order, notification: 'failed' });
  }
});

module.exports = router;
