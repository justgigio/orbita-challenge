import express from 'express';

import auth from '../middlewares/auth';

const router = express.Router();

router.get('/', (_, res) => {
  res.send('Hello World!');
});

router.get('/api/solar_panels', (_, res) => {
  res.send('Solar panels API');
});

router.get('/users', auth.check, (_, res) => {
  res.send({ user: res.locals.user });
});

router.post('/auth', auth.sign, (_, res) => {
  res.send({ auth: true, token: res.locals.token });
});

export default router;
