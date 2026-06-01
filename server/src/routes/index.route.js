const router = require("express").Router();

router.use("/products", require("./product.routes"));
router.use("/users", require("./user.routes"));

module.exports = router;