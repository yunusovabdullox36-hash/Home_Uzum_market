const User = require("../models/user.model");

class UserController {
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: err.message });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
      }

      return res.json(user);
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: "Noto'g'ri ID formati" });
      }
      return res.status(500).json({ message: err.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
      }

      return res.json(user);
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: "Noto'g'ri ID formati" });
      }
      return res.status(500).json({ message: err.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
      }

      return res.json({ message: "Foydalanuvchi o'chirildi" });
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: "Noto'g'ri ID formati" });
      }
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new UserController();