const { Movie } = require("../models/index");

class movieController {
  static async getMovie(req, res, next) {
    try {
      const movie = await Movie.findAll();
      res.status(200).json(movie);
    } catch (err) {
      next(err);
    }
  }

  static async detailMovie(req, res, next) {
    try {
      const { id } = req.params;
      const detail = await Movie.findOne({
        where: { id },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (!detail) throw { name: "No Movie" };

      res.status(200).json(detail);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = movieController;
