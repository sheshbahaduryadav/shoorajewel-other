const express = require('express');
const router = express.Router();
const orderController = require('../../controller/product/orderController');
const upload = require('../../middlewares/multerS3Upload');
const verifyJwt = require('../../middlewares/verifiyJwt');

// Route to add a new order, protected by JWT verification middleware
router.post('/order/add', verifyJwt, orderController.buyNowOrder);

// Route to get a specific order by its ID, protected by JWT verification middleware
router.get('/order/get/:orderId', verifyJwt, orderController.getBuyOrder);

// Route to update the status of an order by its ID, protected by JWT verification middleware
router.put('/order/update/:id', verifyJwt, orderController.updateOrderStatus);

// Route to get details of all orders for the admin, protected by JWT verification middleware
router.get(
  '/allorder/admin/details',
  verifyJwt,
  orderController.adminOrderDetails
);

// Route to get details of all orders for a specific customer by their ID, protected by JWT verification middleware
router.get(
  '/allorder/customer/details/:id',
  verifyJwt,
  orderController.customerOrderDetails
);

// Route to cancel an order by its ID, protected by JWT verification middleware
router.put('/order/cancel/:id', verifyJwt, orderController.customerOrderCancel);

// Route to handle customer requests for order return, protected by JWT verification middleware
// Uses multerS3upload middleware to handle file uploads
router.post(
  '/orderReturnRequest',
  verifyJwt,
  upload.any(),
  orderController.customerRequestForOrderReturn
);

// Route to get the ShipRocket token
router.get('/getShipRocketToken', orderController.getShipRocketToken);

module.exports = router;
