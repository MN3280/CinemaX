const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Customer, Ticket } = require("../models/index");

class custController {
  static async readCust(req, res, next) {
    try {
      const cust = await Customer.findAll();
      res.status(200).json(cust);
    } catch (err) {
      next(err);
    }
  }

  static async registerCust(req, res, next) {
    try {
      const { username, email, password, phoneNumber } = req.body;

      if (!username || !email || !password || !phoneNumber) {
        throw { name: "RegisError" };
      }
      const regisCust = await Customer.create({
        username,
        email,
        password,
        phoneNumber,
      });
      res.status(201).json(regisCust);
    } catch (err) {
      next(err);
    }
  }

  static async loginCust(req, res, next) {
    try {
      const { email, password } = req.body;

      const cust = await Customer.findOne({ where: { email } });

      if (!cust) throw { name: "LoginErr" };

      const validatePass = comparePassword(password, cust.password);

      if (!validatePass) throw { name: "PassError" };

      const token = signToken({
        id: cust.id,
        email: cust.email,
      });

      res.status(200).json({
        access_token: token,
        username: cust.username,
        email: cust.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async ticketPurchase(req, res, next) {
    try {
      const { id } = req.query;
      const custId = req.additionalData.custId;
      const { price, seat_number } = req.body;
      const purchaseDate = new Date().toISOString().split("T")[0];

      const existingTicket = await Ticket.findOne({
        where: {
          seat_number,
          MovieId: id,
          date: purchaseDate,
        },
      });

      if (existingTicket) throw { name: "Seat taken" };

      const ticket = await Ticket.create({
        price,
        seat_number,
        date: purchaseDate,
        CustomerId: custId,
        MovieId: id,
      });

      res.status(200).json({
        message: "Ticket Purchased!",
        ticket,
      });
    } catch (err) {
      next(err);
    }
  }

  static async readTicket(req, res, next) {
    try {
      const custId = req.additionalData.custId;
      const purchaseDate = new Date().toISOString().split("T")[0];

      const ticket = await Ticket.findAll({
        where: {
          CustomerId: custId,
          date: purchaseDate,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (ticket.length === 0) throw { name: "CO Ticket" };

      res.status(200).json({
        ticket,
      });
    } catch (err) {
      next(err);
    }
  }

  static async editTicket(req, res, next) {
    try {
      const { id } = req.params;
      const { seat_number } = req.body;

      const existingTicket = await Ticket.findOne({ where: { id } });

      if (!existingTicket) throw { name: "CO Ticket" };

      const updateTicket = await Ticket.update(
        {
          seat_number,
        },
        {
          where: { id },
        }
      );

      if (updateTicket[0] === 0) throw { name: "Ticket update fail" };

      res.status(200).json({
        message: "Ticket update succesfull",
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteTicket(req, res, next) {
    try {
      const { id } = req.params;

      const findTicket = await Ticket.findOne({ where: { id } });

      if (!findTicket) throw { name: "CO Ticket" };

      await Ticket.destroy({ where: { id } });

      res
        .status(200)
        .json({ message: `Ticket with id ${id} deleted successfully` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = custController;
