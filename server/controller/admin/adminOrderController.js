const prisma = require('./../../config/db');
const { createShipRocketOrder } = require('./../../utils/shipRocketApi');

// Api to create a new order......................................................................................................
const createNewOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Retrieve order details including shipping, billing, customer, and product list
    const order = await prisma.myOrder.findUnique({
      where: {
        id: orderId,
      },
      include: {
        shippingAddress: true,
        billingAddress: true,
        customer: true,
        productList: true,
      },
    });

    // Initialize arrays to store order product list and address details
    let orderProductList = [];
    let shippingAddressDetails = order.shippingAddress;
    let billingAddressDetails = order.billingAddress;

    // Iterate through product list to generate order product details
    const productList = order.productList;
    productList.forEach((element) => {
      // Generate random HSN (Harmonized System of Nomenclature) code
      min = Math.ceil(4000);
      max = Math.floor(5000);
      const randHSn = Math.floor(Math.random() * (max - min) + min);

      // Construct order product details
      orderProductList.push({
        name: element.productTitle,
        sku: element.productTitle + ':' + randHSn,
        units: element.quantity,
        selling_price: element.price,
        discount: element.discountPrice,
        tax: '',
        hsn: randHSn,
      });
    });

    const subTotal = order.subTotal;

    // Create order on ShipRocket platform
    const shipRocketResponse = await createShipRocketOrder(
      order,
      orderProductList,
      subTotal,
      shippingAddressDetails,
      billingAddressDetails
    );

    // Check if order creation on ShipRocket was successful
    if (shipRocketResponse.success) {
      console.log(
        'Order successfully saved to ShipRocket:',
        shipRocketResponse.message
      );
    } else {
      // Handle error if order creation on ShipRocket fails
      console.error(
        'Failed to save order to ShipRocket:',
        shipRocketResponse.error
      );
      return res.status(500).json({ error: shipRocketResponse.error });
    }

    // Respond with success message
    res.status(200).send('ok');
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Api to retrieve all orders with optional filters and pagination.................................................................
const getAllOrders = async (req, res) => {
  try {
    let {
      status,
      paymentStatus,
      page,
      pageSize,
      orderReturnRequest,
      orderReturnConfirm,
    } = req.query;

    // Convert string query params to boolean if provided
    if (orderReturnRequest === 'false') {
      orderReturnRequest = false;
    } else if (orderReturnRequest === 'true') {
      orderReturnRequest = true;
    }

    if (orderReturnConfirm === 'false') {
      orderReturnConfirm = false;
    } else if (orderReturnConfirm === 'true') {
      orderReturnConfirm = true;
    }

    // Retrieve orders based on filters and pagination
    const orders = await prisma.myOrder.findMany({
      where: {
        AND: [
          { status: status },
          { paymentStatus: paymentStatus },
          { orderReturnRequest: orderReturnRequest },
          { orderReturnConfirm: orderReturnConfirm },
        ],
      },
      include: {
        billingAddress: true,
        shippingAddress: true,
        customer: true,
        productList: true,
        productStock: true,
      },
      skip: (page - 1) * pageSize,
      take: parseInt(pageSize),
    });

    // Retrieve total count of orders
    const totalOrder = await prisma.myOrder.count({});

    // Respond with orders and total count
    res.status(200).send({ orders, totalOrder });
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Api to retrieve an order by ID..................................................................................................
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve order by ID
    const order = await prisma.myOrder.findUnique({
      where: { id: id },
    });

    // Respond with the order
    res.status(200).send(order);
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Api to assign a courier to an order..............................................................................................
const assignCourierToOrder = async (req, res) => {
  const { orderId, courierId } = req.params;
  try {
    // Update order with the assigned courier
    const order = await prisma.myOrder.update({
      where: { id: orderId },
      data: {
        shipRocketCourierId: courierId,
      },
    });

    // Respond with the updated order
    res.status(200).send(order);
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Api to update order status...................................................................................................
const orderStatusUpdate = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    // Update order status
    const order = await prisma.myOrder.update({
      where: { id: orderId },
      data: {
        status: status,
      },
    });

    // Respond with the updated order
    res.status(200).send(order);
  } catch (error) {
    // Handle internal server error
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Api to set ShipRocket values for an order.....................................................................................
const orderSetShipRocketValues = async (req, res) => {
  try {
    const {
      id,
      shipRocketOrderId,
      shipRocketShipmentId,
      shipRocketTrackId,
      shipRocketCourierId,
      shipRocketAWBId,
    } = req.body;

    // Update order with ShipRocket values
    const orderUpdate = await prisma.myOrder.update({
      where: {
        id: id,
      },
      data: {
        shipRocketOrderId: shipRocketOrderId?.toString(),
        shipRocketShipmentId: shipRocketShipmentId?.toString(),
        shipRocketTrackId: shipRocketTrackId?.toString(),
        shipRocketCourierId: shipRocketCourierId?.toString(),
        shipRocketAWBId: shipRocketAWBId?.toString(),
      },
    });

    // Respond with success message
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Exporting functions.........................................................................................................
module.exports = {
  assignCourierToOrder,
  createNewOrder,
  getAllOrders,
  getOrderById,
  orderStatusUpdate,
  orderSetShipRocketValues,
};
