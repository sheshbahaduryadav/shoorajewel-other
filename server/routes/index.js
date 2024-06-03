const express = require('express');
const router = express.Router();

// Importing route handlers for different endpoints
const customerAuthRoute = require('./customer/customerAuthRoute'); // Route handlers for customer authentication
const roleRoute = require('./roleAndPermissions/roleRoute'); // Route handlers for roles
const permissionRoute = require('./roleAndPermissions/permissionRoute'); // Route handlers for permissions
const customerRoute = require('./customer/customerRoute'); // Route handlers for customers
const staffAuthRoute = require('./admin/staff/staffAuthRoute'); // Route handlers for staff auth
const staffRoute = require('./admin/staff/staffRoute'); // Route handlers for staff
const productRoute = require('./product/productRoute'); // Route handlers for products
const categoriesRoute = require('./product/categoriesRoute'); // Route handlers for category
const adminOrder = require('./admin/adminOrderRoute'); // Route handlers for admin order
const adminCategory = require('./admin/adminCategoryRoute'); // Route handlers for admin category
const adminProduct = require('./admin/adminProductRoute'); // Route handlers for admin product
const payment = require('./payment/paymentRoute'); // Route handlers for payment

// Assigning route handlers to their respective endpoints
router.use('/customerAuth', customerAuthRoute); // Endpoint for customer authentication
router.use('/customer', customerRoute); // Endpoint for customer-related operations
router.use('/role', roleRoute); // Endpoint for role-related operations
router.use('/permission', permissionRoute); // Endpoint for permission-related operations
router.use('/product', productRoute); // Endpoint for product-related operations
router.use('/category', categoriesRoute); // Endpoint for product category-related operations

// Assigning route for admin pannel
router.use('/staffAuth', staffAuthRoute); // Endpoint for staff-related operations
router.use('/staff', staffRoute); // Endpoint for staff-related operations
router.use('/admin/product', adminProduct); // Endpoint for admin product-related operations
router.use('/admin/order', adminOrder); // Endpoint for admin order-related operations
router.use('/admin/category', adminCategory); // Endpoint for admin category-related operations

// Assigning route for payment
router.use('/payment', payment); // Endpoint for payment-related operations

// Exporting the router for use in the application
module.exports = router;
