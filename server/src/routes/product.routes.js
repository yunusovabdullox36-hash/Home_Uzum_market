const router = require("express").Router();
const productController = require("../controllers/product.controller");

router.post("/", productController.createProduct.bind(productController));
router.get("/", productController.getProducts.bind(productController));
router.get("/:id", productController.getProductById.bind(productController));
router.put("/:id", productController.updateProduct.bind(productController));
router.delete("/:id", productController.deleteProduct.bind(productController));

module.exports = router;
