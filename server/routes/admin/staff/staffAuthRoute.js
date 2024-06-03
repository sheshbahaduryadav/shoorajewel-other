// Importing required modules and initializing router
const express = require('express');
const router = express.Router();

// Importing controller functions and middleware
const staffAuthController = require('./../../../controller/admin/staff/staffAuthController'); // Controller functions for staff authentication
const verifyJwt = require('../../../middlewares/verifiyJwt'); // Middleware for verifying JWT tokens

// Defining routes and associating them with controller functions
router.post('/register', staffAuthController.registerUser); // Route for registering a new staff member
router.get('/refresh', staffAuthController.loginRefresh); // Route for refreshing user login token
router.get('/logout', staffAuthController.userLogout); // Route for logging out a staff member
router.post('/forgot-password', staffAuthController.forgetPassword); // Route for initiating password reset for a staff member
router.patch('/reset-password/:token', staffAuthController.resetPassword); // Route for resetting a staff member's password
router.patch('/verify-email/:id', staffAuthController.verifyEmail); // Route for verifying a staff member's email

// Exporting the router for use in the application
module.exports = router;
