import { Op } from 'sequelize';
import { SolarPanel } from '../models/index';

class SolarPanelsController {

  index(req, res) {
    let user = res.locals.user;
    let query = this.buildQuery(req, user);
    SolarPanel.findAll(query).then((result) => {
      res.send({ solar_panels: result });
    });
  }

  private buildQuery(_req, user) {
    let query = {limit: 20} as any;
    query.where = {};

    query.where.state = { [Op.like]: user.state.replace('*', '%') };

    return query;
  }

}

export default SolarPanelsController;
