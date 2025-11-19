
const express = require('express');
const bodyParser = require('body-parser');
const { validateNotification } = require('./validators/notificationValidator');
const { dispatch } = require('./dispatch/dispatcher');

const app = express();
app.use(bodyParser.json());

app.post('/notify', async (req, res) => {
  const payload = req.body;
  const valid = validateNotification(payload);
  if (!valid.valid) return res.status(400).json({ error: valid.errors });

  try {
    await dispatch(payload);
    return res.status(202).json({ status: 'accepted' });
  } catch (err) {
    console.error('dispatch error', err && err.message);
    return res.status(500).json({ error: 'failed to dispatch' });
  }
});

app.get('/healthz', (_req, res) => res.send('ok'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Notification Service listening on ${port}`));
