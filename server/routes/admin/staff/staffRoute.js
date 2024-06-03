// Importing required modules
const express = require('express');
const router = express.Router();
const staffController = require('../../../controller/admin/staff/staffController'); // Importing the user controller
const verifyJwt = require('../../../middlewares/verifiyJwt'); // Middleware to verify JWT tokens

// Define routes for user management

// Route to get a specific user by ID
router.get('/admin/:id', verifyJwt, staffController.getUser);

// Route to view all users (admin access required)
router.get('/admin-users', verifyJwt, staffController.getAllUsers);

// Route to update a user's profile (admin access required)
router.patch('/admin/update/:id', verifyJwt, staffController.updateUser);

// Route to delete a user (admin access required)
router.delete('/admin/delete/:id', verifyJwt, staffController.deleteUser);

module.exports = router; // Exporting the router
