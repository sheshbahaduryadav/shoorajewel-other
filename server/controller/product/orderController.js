const prisma = require('../../config/db');
const {
  updateShipRocketOrder,
  getAllOrder,
} = require('../../Utils/shipRocket');
const { getAccessToken } = require('../../Utils/shipRocket');

// Api to place a buy now order......................................................................................................
const buyNowOrder = async (req, res) => {
  let orderList = [];
  try {
    let {
      customerId,
      productList,
      subTotal,
      billingAddressId,
      shippingAddressId,
    } = req.body;

    // Convert subTotal to integer
    subTotal = parseInt(subTotal);

    productList.forEach(async (element) => {
      const product = await prisma.product.findUnique({
        where: {
          id: element.productId,
        },
      });

      // Create order for each product in the list
      const order = await prisma.myOrder.create({
        data: {
          productList: {
            connect: {
              id: element.productId,
            },
          },
          customer: {
            connect: {
              id: customerId,
            },
          },
          billingAddress: {
            connect: {
              id: billingAddressId,
            },
          },
          shippingAddress: {
            connect: {
              id: shippingAddressId,
            },
          },
          productStock: {
            connect: {
              id: element.productStockId,
            },
          },
          subTotal: product.price * element.quantity,
          productQuantity: element.quantity,
        },
        include: {
          customer: true,
          productStock: true,
          shippingAddress: true,
          billingAddress: true,
        },
      });
      // Push order to list
      arrylen = orderList.push(order);
      if (productList.length == orderList.length) {
        // Update product stock quantity and send response if all orders are processed
        productList.forEach(async (element) => {
          await prisma.productStock.update({
            where: {
              id: element.productStockId,
            },
            data: {
              quantity: { decrement: parseInt(element.quantity) },
            },
          });
        });
        return res.status(200).send(orderList);
      }
    });
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Api to update order payment status................................................................................................
const upadteOrderPaymentStatus = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Update order payment status to "done"
    const order = await prisma.myOrder.update({
      where: {
        id: orderId,
      },
      data: {
        paymentStatus: 'done',
      },
    });

    res.status(200).send(order);
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Api to update order status.................................................................................................
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Retrieve current order details
    const currentOrder = await prisma.myOrder.findFirst({
      where: {
        id: orderId,
      },
    });

    // Retrieve customer details
    const customer = await prisma.customer.findUnique({
      where: { id: currentOrder.customerId },
    });

    // Retrieve product details
    const product = await prisma.product.findUnique({
      where: { id: currentOrder.productId },
    });

    // Retrieve customer shipping address details
    const customerAddressDetails = await prisma.customer.findFirst({
      where: { id: customer.id },
      select: {
        fullName: true,
        phone: true,
        houseNo: true,
        street: true,
        pincode: true,
        landmark: true,
        city: true,
        state: true,
        address: true,
      },
    });

    // Update billing address details
    let billingAddressDetails;
    if (
      fullName ||
      phone ||
      houseNo ||
      street ||
      address ||
      landmark ||
      pincode ||
      city ||
      state
    ) {
      billingAddressDetails = await prisma.addresses.update({
        where: {
          id: currentOrder.billingAddressId,
        },
        data: {
          fullName,
          phone,
          houseNo,
          street,
          address,
          landmark,
          pincode,
          city,
          state,
          type: 'Billing',
          customerId: customer.id,
        },
      });
    } else {
      billingAddressDetails = await prisma.addresses.update({
        where: {
          id: currentOrder.billingAddressId,
        },
        data: {
          ...customerAddressDetails,
          type: 'Billing',
          customerId: customer.id,
        },
      });
    }

    // Update shipping address details
    let shippingAddressDetails;
    if (
      shippingFullName ||
      shippingAddress ||
      shippingCity ||
      shippingHouseNo ||
      shippingLandmark ||
      shippingStreet ||
      shippingState ||
      shippingPincode ||
      shippingPhone
    ) {
      shippingAddressDetails = await prisma.shippingAddress.update({
        where: {
          id: currentOrder.shippingAddressId,
        },
        data: {
          shippingFullName,
          shippingPhone,
          shippingHouseNo,
          shippingPincode,
          shippingAddress,
          shippingStreet,
          shippingLandmark,
          shippingCity,
          shippingState,
          shippingType: 'Shipping',
        },
      });
    } else {
      shippingAddressDetails = await prisma.shippingAddress.update({
        where: {
          id: currentOrder.shippingAddressId,
        },
        data: {
          shippingFullName: customerAddressDetails.fullName,
          shippingPhone: customerAddressDetails.phone,
          shippingHouseNo: customerAddressDetails.houseNo,
          shippingPincode: customerAddressDetails.pincode,
          shippingAddress: customerAddressDetails.address,
          shippingStreet: customerAddressDetails.street,
          shippingLandmark: customerAddressDetails.landmark,
          shippingCity: customerAddressDetails.city,
          shippingState: customerAddressDetails.state,
          shippingType: 'Shipping',
        },
      });
    }

    // Update order details
    const order = await prisma.myOrder.update({
      where: {
        id: orderId,
      },
      data: {
        quantity: quantity,
        customerId: customer.id,
        productId: product.id,
        billingAddressId: billingAddressDetails.id,
        shippingAddressId: shippingAddressDetails.id,
      },
      include: {
        shippingAddress: true,
        billingAddress: true,
        customer: true,
      },
    });

    // Update order status on ShipRocket
    const paymentSuccess = true;
    if (paymentSuccess) {
      const shipRocketResponse = await updateShipRocketOrder(
        order,
        shippingAddressDetails,
        billingAddressDetails
      );

      if (shipRocketResponse.success) {
        console.log(
          'Order successfully saved to ShipRocket:',
          shipRocketResponse.message
        );
      } else {
        console.error(
          'Failed to save order to ShipRocket:',
          shipRocketResponse.error
        );
      }
    }

    res.status(201).json(order);
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Api to get details of a buy order...........................................................................................
const getBuyOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Retrieve buy order details
    const productItem = await prisma.myOrder.findUnique({
      where: {
        id: orderId,
      },
      select: {
        customer: true,
        shippingAddress: true,
        billingAddress: true,
        status: true,
        quantity: true,
        size: true,
        paymentStatus: true,
        orderOn: true,
        product: true,
      },
    });

    res.status(200).json(productItem);
  } catch (error) {
    // Handle internal server error
    res.status(500).json({
      message: 'Internal server error!',
    });
  }
};

// Api to get admin order details..............................................................................................
const adminOrderDetails = async (req, res) => {
  const orderDetails = await prisma.myOrder.findMany({
    include: {
      billingAddress: true,
      // product: true,
    },
  });
  const shipRocketResponse = await getAllOrder();

  res.status(201).json({ orderDetails, shipRocketResponse });
};

// Api to get customer order details..............................................................................................
const customerOrderDetails = async (req, res) => {
  try {
    let { search, status, page, pageSize } = req.query;

    const customerId = req.params.id;
    const orderDetails = await prisma.myOrder.findMany({
      where: {
        customerId: customerId,
        AND: [
          {
            status: status,
          },
          {
            productList: {
              productTitle: {
                startsWith: search,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      include: {
        shippingAddress: true,
        billingAddress: true,
        productList: true,
      },
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
    });

    const totalOrders = await prisma.myOrder.count({
      where: {
        customerId: customerId,
      },
    });

    res.status(200).json({ orderDetails, totalOrders });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api to cancel customer order..............................................................................................
const customerOrderCancel = async (req, res) => {
  const orderId = parseInt(req.params.id);
  if (!orderId) return res.status(404).json({ message: 'Order not Found!' });
  const orderCancel = await prisma.myOrder.update({
    where: { id: orderId },
    data: {
      status: 'Order Cancel',
    },
  });
  res.status(201).json(orderCancel);
};

// Api for customer to request order return...................................................................................
const customerRequestForOrderReturn = async (req, res) => {
  try {
    const { orderId, reason, description, userId } = req.body;

    // Retrieve order
    const getOrder = await prisma.myOrder.findUnique({
      where: {
        id: orderId,
      },
    });

    // Check if order exists
    if (!getOrder) {
      return res.status(404).json({ message: 'order not found!' });
    }

    // Check if user is authorized to return the order
    if (getOrder.customerId !== userId) {
      return res
        .status(404)
        .json({ message: 'You are not authorized to return this order!' });
    }

    // Check if order is already in return process
    if (getOrder.orderReturnRequest === true) {
      return res.status(404).json({ message: 'Order is in return process ' });
    }

    // Update order with return details
    const order = await prisma.myOrder.update({
      where: {
        id: orderId,
      },
      data: {
        orderReturnReason: reason,
        orderReturnDesc: description,
        orderReturnAttachment: req.files[0].location,
        orderReturnRequest: true,
      },
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api to get ShipRocket access token.........................................................................................
const getShipRocketToken = async (req, res) => {
  try {
    const token = await getAccessToken();
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Exporting functions.........................................................................................................
module.exports = {
  buyNowOrder,
  getBuyOrder,
  updateOrderStatus,
  adminOrderDetails,
  customerOrderDetails,
  customerOrderCancel,
  upadteOrderPaymentStatus,
  customerRequestForOrderReturn,
  getShipRocketToken,
};
