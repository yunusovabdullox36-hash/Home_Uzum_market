const router = require("express").Router();
const favoriteController = require("../controllers/favorite.controller");

router.post("/", favoriteController.addFavorite);

router.get("/:userId", favoriteController.getFavorites);

router.delete("/:userId/:productId", favoriteController.removeFavorite);

module.exports = router;






