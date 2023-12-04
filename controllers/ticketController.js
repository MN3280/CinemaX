const { Ticket } = require("../models/index");
class ticketController {
  static async readTicket(req, res, next) {
    try {
      const ticket = await Ticket.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!ticket) throw { name: "CO Ticket" };

      res.status(200).json(ticket);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ticketController;
