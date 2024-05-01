const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const User = require('../models/userModel');

// Auth user
// route POST/api/users/auth
// access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(res, user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

// Register user
// route POST/api/users
// access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if a file is included in the request

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),

    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Logout user
// route POST/api/users/logout
// access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out' });
});

// Get one user by ID
// route GET /api/users/:id
// access Private (admin)
const getOneUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
      res.status(404);
      throw new Error('User not found');
  }

  res.json(user);
});

// Get all users
// route GET /api/users
// access Private (admin)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Update a user
// route PUT /api/users/:id
// access Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
      res.status(404);
      throw new Error('User not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  const updatedUser = await user.save();
  res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
  });
});

// Delete a user
// route DELETE /api/users/:id
// access Private (admin)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
      res.status(404);
      throw new Error('User not found');
  }

  await user.remove();
  res.json({ message: 'User removed' });
});

module.exports = { authUser, registerUser, logoutUser, getOneUser, getAllUsers, updateUser, deleteUser };
