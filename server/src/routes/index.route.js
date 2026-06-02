const router = require("express").Router();

router.use("/comments", require("./comment.routes"))
router.use("/products", require("./product.routes"));
router.use("/users", require("./user.routes"));
router.use("/favorites", require("./favorite.routes"));
router.use("/carts", require("./cart.routes"));

module.exports = router;