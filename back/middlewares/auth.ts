
import jwt from 'jsonwebtoken';
import { User } from '../models/index';

const SECRET = process.env.SECRET || 'secret_must_be_set_on_env';

const auth = {
  check: (req, res, next) => {
    let token = req.headers['x-access-token'];

    try {
      let {id, password} = jwt.verify(token, SECRET);

      User.findByPk(id).then((user) => {
        if (user && user.password === password) {
          user.password = undefined;
          res.locals.user = user;
          next();
        } else {
          res.status(401).send('401 Unauthorized');
        }
      });

    } catch (_) {
      res.status(401).send('401 Unauthorized');
    }
  },
  sign: (req, res, next) => {
    User.findOne({ where: {email: req.body.email} }).then((user) => {
      if (user !== null && user.password == req.body.password) {

        let token = jwt.sign({ id: user.id, password: user.password }, SECRET, {
          expiresIn: 60 * 60 * 24 // expires in 1 day
        });
        res.locals.token = token;
        next();
      } else {
        res.send({ auth: false, error: 'Authentication Fail' });
      }
    });
  }
}

export default auth;
