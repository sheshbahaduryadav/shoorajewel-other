const express = require('express');
const router = express.Router();
const customerController = require('./../../controller/customer/customerController');
const upload = require('./../../middlewares/multerS3Upload');
const verifyJwt = require('./../../middlewares/verifiyJwt');

// View all customers..............................................................................
router.get('/getAllCustomers', verifyJwt, customerController.getAllCustomers);

// View a specific customer..............................................................................
router.get('/getCustomer/:id', verifyJwt, customerController.getCustomer);

// Update customer details..............................................................................
router.patch(
  '/update/:id',
  verifyJwt,
  upload.any(),
  customerController.updateCustomer
);

// Delete a customer.......................................................................................
router.delete('/delete/:id', verifyJwt, customerController.deleteCustomer);

// Activate or deactivate a user..............................................................................
router.put(
  '/activeInactive/update/:id',
  verifyJwt,
  customerController.makeUserActiveInactive
);

// Create a new billing address..............................................................................
router.post(
  '/createBillingAddress',
  verifyJwt,
  customerController.createBillingAddress
);

// Get all billing addresses of a customer..............................................................................
router.get(
  '/getBillingAddress/:id',
  verifyJwt,
  customerController.getBillingAddress
);

// Get a specific billing address by ID..............................................................................
router.get(
  '/getBillingAddressById/:id',
  verifyJwt,
  customerController.getBillingAddressById
);

// Get all shipping addresses of a customer..............................................................................
router.get(
  '/getShippingAddress/:id',
  verifyJwt,
  customerController.getShippingAddress
);

// Get a specific shipping address by ID..............................................................................
router.get(
  '/getShippingAddressById/:id',
  verifyJwt,
  customerController.getShippingAddressById
);

// Create a new shipping address..............................................................................
router.post(
  '/createShippingAddress',
  verifyJwt,
  customerController.createShippingAddress
);

// Update a billing address..............................................................................
router.patch(
  '/updateBillingAddress',
  verifyJwt,
  customerController.updateBillingAddress
);

// Update a shipping address..............................................................................
router.patch(
  '/updateShippingAddress',
  verifyJwt,
  customerController.updateShippingAddress
);

// Delete a billing address by ID..............................................................................
router.delete(
  '/deleteBillingAddress/:id',
  verifyJwt,
  customerController.deleteBillingAddress
);

// Delete a shipping address by ID..............................................................................
router.delete(
  '/deleteShippingAddress/:id',
  verifyJwt,
  customerController.deleteShippingAddress
);

module.exports = router;
