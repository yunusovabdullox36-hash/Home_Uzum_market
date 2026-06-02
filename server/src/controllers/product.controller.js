const Product = require("../models/product.model");

class ProductController {
  async createProduct(req, res) {
    try {
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: err.message });
    }
  }

  async getProducts(req, res) {
    try {
      const products = await Product.find();
      return res.json(products);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Mahsulot topilmadi" });
      }

      return res.json(product);
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: "Noto'g'ri ID formati" });
      }
      return res.status(500).json({ message: err.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!product) {
        return res.status(404).json({ message: "Mahsulot topilmadi" });
      }

      return res.json(product);
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: "Noto'g'ri ID formati" });
      }
      return res.status(500).json({ message: err.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Mahsulot topilmadi" });
      }

      return res.json({ message: "Mahsulot o'chirildi" });
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: "Noto'g'ri ID formati" });
      }
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new ProductController();