import { User } from '../models/index';

class UsersController {

  show(_req, res) {
    res.send({ user: res.locals.user });
  }

  update(req, res) {
    let {name, email} = req.body;
    let id = res.locals.user.id;

    User.update({name, email}, { where: {id} }).then(() => {
      User.findByPk(id).then((user) => {
        user.password = undefined;
        res.send({ user });
      })
    });
  }

  destroy(_req, res) {
    let id = res.locals.user.id;
    User.destroy({where: {id}}).then(() => {
      res.send({ success: true });
    });
  }
}

export default UsersController;
