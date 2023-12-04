const { Customer } = require("../models/index");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "Unauthentication" };
    }

    const token = verifyToken(access_token);

    if (!token) {
      throw { name: "JsonWebTokenError" };
    }

    const cust = await Customer.findOne({
      where: {
        id: token.id,
      },
    });

    if (!cust) {
      throw { name: "Customer not found" };
    }

    req.additionalData = {
      custId: cust.id,
      username: cust.username,
      email: cust.email,
  };

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}
module.exports = { authentication };
