const Favorite = require("../models/favorite.model");

class FavoriteController {
  async addFavorite(req, res) {
    try {
      const { userId, productId } = req.body;

      let favorite = await Favorite.findOne({
        user: userId,
      });

      if (!favorite) {
        favorite = await Favorite.create({
          user: userId,
          products: [productId],
        });
      } else {
        if (!favorite.products.includes(productId)) {
          favorite.products.push(productId);
          await favorite.save();
        }
      }

      res.status(200).json(favorite);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async getFavorites(req, res) {
    try {
      const { userId } = req.params;

      const favorite = await Favorite.findOne({
        user: userId,
      }).populate("products");

      res.status(200).json(favorite);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async removeFavorite(req, res) {
    try {
      const { userId, productId } = req.params;

      const favorite = await Favorite.findOne({
        user: userId,
      });

      favorite.products = favorite.products.filter(
        (id) => id.toString() !== productId
      );

      await favorite.save();

      res.status(200).json(favorite);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new FavoriteController();