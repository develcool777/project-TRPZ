const Room = require('../models/Room');
const Visit = require('../models/Visit');
class roomController {
  async createRoom(req, res) {
    try {
      const room = await Room.create({
        flour: req.body.flour,
        number: req.body.number,
        building: req.body.building,
        capacity: req.body.capacity,
        comfort: req.body.comfort,
        price: req.body.price,
        deposit: req.body.deposit
      });
      res.send(room);
    } catch (e) {
      res.send(e);
    }
  }
  async bookRoom(req, res) {
    const roomId = req.params.id;
    const { from, last, deposit } = req.body;
    if (Date.parse(from) > Date.parse(last)) {
      return res.send('Wrong period');
    }
    const visits = await Visit.findAll({ where: { roomId } });
    if (!visits) {
      const book = await Visit.create({
        from,
        last,
        deposit,
        roomId
      });
      res.send(book);
    } else {
      for (let visit of visits) {
        if (
          !(
            Date.parse(from) > Date.parse(visit.last) ||
            Date.parse(last) < Date.parse(visit.from)
          )
        ) {
          return res.send('This room is not available from this dates');
        }
      }
      const book = await Visit.create({
        from,
        last,
        deposit,
        roomId
      });
      res.send(book);
    }
  }
}

module.exports = new roomController();
