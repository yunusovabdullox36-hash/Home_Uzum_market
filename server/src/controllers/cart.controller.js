const Cart = require("../models/cart.model");

class CartController {
  async addToCart(req, res) {
    try {
      const { userId, productId, quantity } = req.body;

      let cart = await Cart.findOne({
        user: userId,
      });

      if (!cart) {
        cart = await Cart.create({
          user: userId,
          items: [
            {
              product: productId,
              quantity,
            },
          ],
        });
      } else {
        const item = cart.items.find(
          (item) =>
            item.product.toString() === productId
        );

        if (item) {
          item.quantity += quantity;
        } else {
          cart.items.push({
            product: productId,
            quantity,
          });
        }

        await cart.save();
      }

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async getCart(req, res) {
    try {
      const { userId } = req.params;

      const cart = await Cart.findOne({
        user: userId,
      }).populate("items.product");

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async removeFromCart(req, res) {
    try {
      const { userId, productId } = req.params;

      const cart = await Cart.findOne({
        user: userId,
      });

      cart.items = cart.items.filter(
        (item) =>
          item.product.toString() !== productId
      );

      await cart.save();

      res.status(200).json(cart);
    } catch (error) {
      res.status(200).json({
        message: "Deleted",
      });
    }
  }
}




module.exports = new CartController();