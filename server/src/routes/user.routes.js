const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.post("/", userController.createUser.bind(userController));
router.get("/", userController.getUsers.bind(userController));

module.exports = router;