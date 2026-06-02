const router = require("express").Router();
const cartController = require("../controllers/cart.controller");

router.post("/", cartController.addToCart);

router.get("/:userId", cartController.getCart);

router.delete("/:userId/:productId", cartController.removeFromCart);

module.exports = router;
