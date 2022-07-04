const express = require("express");

const { protect } = require("./../middleware/authMiddleware");

const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const router = express.Router();

router.route("/").get(protect, getGoals).post(protect, setGoal);
// router.get("/", getGoals);
// router.post("/", setGoal);

router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);
// router.put("/:id", updateGoal);
// router.delete("/:id", deleteGoal);

module.exports = router;
