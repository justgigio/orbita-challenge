import { Op } from 'sequelize';
import { SolarPanel } from '../models/index';

class SolarPanelsController {

  index(req, res) {
    let user = res.locals.user;
    let query = this.buildQuery(req, user);
    SolarPanel.findAll(query).then((result) => {
      res.send({ solarPanels: result });
    });
  }

  private buildQuery(req, user) {
    let query = {limit: 20} as any;
    query.where = {};

    query.where.state = { [Op.like]: user.state.replace('*', '%') };

    if (req.body.zipCode) {
      query.where.zipCode = `${req.body.zipCode}`;
    }

    if (req.body.dataProvider) {
      query.where.dataProvider = { [Op.like]: `%${req.body.dataProvider}%` };
    }

    if (req.body.maxCost || req.body.minCost) {
      query.where.cost = {};
    }

    if (req.body.maxCost) {
      query.where.cost[Op.lte] = parseInt(req.body.maxCost);
    }

    if (req.body.minCost) {
      query.where.cost[Op.gte] = parseInt(req.body.minCost);
    }

    if (req.body.maxInstallationDate || req.body.minInstallationDate) {
      query.where.installationDate = {};
    }

    if (req.body.maxInstallationDate) {
      query.where.installationDate[Op.lte] = req.body.maxInstallationDate;
    }

    if (req.body.minInstallationDate) {
      query.where.installationDate[Op.gte] = req.body.minInstallationDate;
    }

    return query;
  }

}

export default SolarPanelsController;
