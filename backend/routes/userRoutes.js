const express = require('express');
const {
    authUser,
    registerUser,
    logoutUser,
    getOneUser,
    getAllUsers,
    updateUser,
    deleteUser,
} = require('../controller/userController');

const router = express.Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', authUser);

// User logout
router.post('/logout', logoutUser);

// Get one user by ID
router.get('/:id', getOneUser);

// Get all users
router.get('/', getAllUsers);

// Update a user by ID
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);

module.exports = router;
