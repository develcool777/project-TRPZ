const Visit = require('../models/Visit');

class visitContoller {
  async createVisit(req, res) {
    try {
      const data = {
        deposit: req.body.deposit,
        from: req.body.from,
        last: req.body.last
      };
      const visit = await Visit.create(data);
      res.send(visit);
    } catch (e) {
      res.send(e);
    }
  }
  async getAllVisits(req, res) {
    try {
      const visits = await Visit.findAll();
      res.send(visits);
    } catch (e) {
      res.send(e);
    }
  }

  async getVisit(req, res) {
    try {
      const visit = await Visit.findByPk(req.params.id);
      res.send(visit);
    } catch (e) {
      res.send(e);
    }
  }
  async getAllVisitsByClientId(req, res) {
    try {
      const visits = await Visit.findAll({
        where: { clientId: req.params.id }
      });
      res.send(visits);
    } catch (e) {
      res.send(e);
    }
  }

  async updateVisit(req, res) {
    try {
      console.log(req.params.id);

      const visit = await Visit.findByPk(req.params.id);
      const visitUpdated = await visit.update({
        deposit: req.body.deposit || visit.deposit,
        from: req.body.from || visit.from,
        last: req.body.last || visit.last
      });

      res.send(visitUpdated);

      //   await visit.save();
      //   console.log(visitUpdated);

      //   res.send(visitUpdated);
    } catch (e) {
      res.send(e);
    }
  }
}

module.exports = new visitContoller();
