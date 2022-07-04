const express = require("express");

const { protect } = require("./../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me",protect, getUser);

module.exports = router;
