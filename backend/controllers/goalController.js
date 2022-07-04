const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc    Get goals
// @route   GET/api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

// @desc    Set goal
// @route   POST/api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field ... ! ");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(201).json(goal);
});

// @desc    Update goal
// @route   PUT/api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal Not Found .. !");
  }

  // check if user exists
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found ... !");
  }

  // make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized .. !");
  }

  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); // 3th param is optional and use it if you want to create new one if the doesn exists

  res.status(200).json(updateGoal);
});

// @desc    delete goal
// @route   DELETE/api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal Not Found .. !");
  }

  // check if user exists
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found ... !");
  }

  // make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized .. !");
  }

  await goal.delete(); // also can use remove()

  res.status(200).json({
    message: `delete successfully .. !`,
  });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};