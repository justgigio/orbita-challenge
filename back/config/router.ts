import express from 'express';

import auth from '../middlewares/auth';

import UsersController from '../controllers/users_controller';

const usersController = new UsersController();

const router = express.Router();

router.get('/', (_, res) => {
  res.send('Hello World!');
});

router.get('/api/solar_panels', (_, res) => {
  res.send('Solar panels API');
});

router.get('/users', auth.check, usersController.show);
router.post('/users', auth.check, usersController.update);
router.delete('/users', auth.check, usersController.destroy);

router.post('/auth', auth.sign, (_, res) => {
  res.send({ auth: true, token: res.locals.token });
});

export default router;
