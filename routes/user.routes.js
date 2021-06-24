const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/signup",authController.signup);
router.post("/login",authController.login)
router.get("/get_users",authController.getUsers);
router.get("/get_one_user/:id",authController.getIndividualUser);
router.patch("/update_user/:id",authController.updateUser);
router.delete("/delete_user/:id",authController.deleteUser)

module.exports = router;