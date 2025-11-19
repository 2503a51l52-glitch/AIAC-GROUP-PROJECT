
const express = require('express');
const router = express.Router();
const { sendNotification } = require('../src/libs/NotificationClient');

// POST /user { userId, email, name }
router.post('/', async (req, res) => {
  const { userId, email, name } = req.body;
  if (!userId || !email) return res.status(400).json({ error: 'userId and email required' });

  const user = { id: userId, email, name: name || 'User' };

  const payload = {
    recipient: email,
    channel: 'email',
    template_id: 'welcome_user',
    params: { name: user.name },
    metadata: { request_id: `user-${userId}-${Date.now()}` }
  };

  try {
    await sendNotification(payload);
    return res.status(201).json({ status: 'user_created', user });
  } catch (err) {
    console.error('notify error', err && err.message);
    return res.status(201).json({ status: 'user_created', user, notification: 'failed' });
  }
});

module.exports = router;
