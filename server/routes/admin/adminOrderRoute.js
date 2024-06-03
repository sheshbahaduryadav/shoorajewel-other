const express = require('express');
const router = express.Router();
const adminOrderController = require('../../controller/admin/adminOrderController');
const verifyJwt = require('../../middlewares/verifiyJwt');

// Route to get all orders, protected by JWT verification middleware
router.get('/order/getAll', verifyJwt, adminOrderController.getAllOrders);

// Route to get an order by its ID, protected by JWT verification middleware
router.get('/order/getById', verifyJwt, adminOrderController.getOrderById);

// Route to create a new order by order ID, protected by JWT verification middleware
router.get(
  '/order/createNewOrder/:orderId/',
  verifyJwt,
  adminOrderController.createNewOrder
);

// Route to assign a courier to an order by order ID and courier ID, protected by JWT verification middleware
router.get(
  '/order/assignCourier/:orderId/:courierId',
  verifyJwt,
  adminOrderController.assignCourierToOrder
);

// Route to update the status of a product, protected by JWT verification middleware
router.post(
  '/adminProducts/productStatusUpdate',
  verifyJwt,
  adminOrderController.orderStatusUpdate
);

// Route to set ShipRocket values for an order, protected by JWT verification middleware
router.post(
  '/orderSetShipRocketValues',
  verifyJwt,
  adminOrderController.orderSetShipRocketValues
);

module.exports = router;
