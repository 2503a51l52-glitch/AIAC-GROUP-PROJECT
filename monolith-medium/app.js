
const express = require('express');
const bodyParser = require('body-parser');
const orderRouter = require('./routes/order');
const userRouter = require('./routes/user');

const app = express();
app.use(bodyParser.json());

app.get('/', (_req, res) => res.send('Monolith Medium Running'));
app.use('/order', orderRouter);
app.use('/user', userRouter);
app.get('/healthz', (_req, res) => res.send('ok'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Monolith running on ${port}`));
