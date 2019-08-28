import express from 'express';

import auth from '../middlewares/auth';

import UsersController from '../controllers/users_controller';
import SolarPanelsController from '../controllers/solar_panels_controller';

const usersController = new UsersController();
const solarPanelsController = new SolarPanelsController();

const router = express.Router();

router.get('/users', auth.check, usersController.show);
router.post('/users', auth.check, usersController.update);
router.delete('/users', auth.check, usersController.destroy);

router.post('/auth', auth.sign, (_, res) => {
  res.send({ auth: true, token: res.locals.token });
});

router.get('/api/solar_panels', auth.check, solarPanelsController.index.bind(solarPanelsController));

export default router;
