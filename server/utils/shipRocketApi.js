const axios = require('axios');
const prisma = require('./../config/db');

// Variables to store ShipRocket access token and expiry timestamp
let accessToken = null;
let tokenExpiryTimestamp = null;

// Api to generate ShipRocket access token............................................................................................
async function generateAccessToken() {
  try {
    const response = await axios.post(
      'https://apiv2.shiprocket.in/v1/external/auth/login',
      {
        email: process.env.SHIP_ROCKET_EMAIL,
        password: process.env.SHIP_ROCKET_PASSWORD,
      }
    );

    // Set access token and expiry timestamp
    accessToken = response.data.token;
    tokenExpiryTimestamp = Date.now() + 10 * 24 * 60 * 60 * 1000; // 10 days expiration
  } catch (error) {
    console.error('Error generating access token:', error.message);
    throw error;
  }
}

// Api to get ShipRocket access token.......................................................................................
async function getAccessToken() {
  if (!accessToken || Date.now() > tokenExpiryTimestamp) {
    await generateAccessToken();
  }
  return accessToken;
}

// Api to create a ShipRocket order............................................................................................
const createShipRocketOrder = async (
  order,
  orderProductList,
  subTotal,
  shippingAddressDetails,
  billingAddressDetails
) => {
  try {
    // Check if order contains customer information
    if (!order.customer) {
      console.error(
        'Order object does not contain customer information:',
        order
      );
      return {
        success: false,
        error: 'Order object is missing customer information',
      };
    }

    // Destructure customer details
    const { fullName, phone } = order.customer;

    // Check if customer information is complete
    if (!fullName || !phone) {
      console.error(
        'Customer information is incomplete or missing:',
        order.customer
      );
      return {
        success: false,
        error: 'Customer information is incomplete or missing',
      };
    }

    // ShipRocket API endpoint and access token
    const shipRocketEndpoint =
      'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc';
    const shipRocketApiKey = await getAccessToken();

    // ShipRocket order data
    const shipRocketOrderData = {
      // Populate order data here
    };

    // Make API request to create order
    const shipRocketResponse = await axios.post(
      shipRocketEndpoint,
      shipRocketOrderData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${shipRocketApiKey}`,
        },
      }
    );

    // Update order data in database
    const orderDataUpdate = await prisma.myOrder.update({
      where: { id: order.id },
      data: {
        // Update order details here
      },
    });

    return {
      success: true,
      shipRocketResponse,
      message: 'Order created successfully',
    };
  } catch (error) {
    console.error('ShipRocket API request failed:', error);
    return { success: false, error: error };
  }
};

// Api to update a ShipRocket order..............................................................................................
const updateShipRocketOrder = async (
  order,
  shippingAddressDetails,
  billingAddressDetails
) => {
  try {
    // Check if order contains ShipRocket order ID
    if (!order.shipRocketOrderId) {
      console.error(
        'Order object does not contain ShipRocket order ID:',
        order
      );
      return {
        success: false,
        error: 'Order object is missing ShipRocket order ID',
      };
    }

    // Destructure customer details
    const { fullName, phone } = order.customer;

    // Check if customer information is complete
    if (!fullName || !phone) {
      console.error(
        'Customer information is incomplete or missing:',
        order.customer
      );
      return {
        success: false,
        error: 'Customer information is incomplete or missing',
      };
    }

    // ShipRocket API endpoint and access token
    const shipRocketEndpoint =
      'https://apiv2.shiprocket.in/v1/external/orders/update/adhoc';
    const shipRocketApiKey = await getAccessToken();

    // ShipRocket order data
    const shipRocketOrderData = {
      // Populate order data here
    };

    // Make API request to update order
    const shipRocketResponse = await axios.post(
      shipRocketEndpoint,
      shipRocketOrderData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${shipRocketApiKey}`,
        },
      }
    );

    return {
      success: true,
      shipRocketResponse,
      message: 'Order updated successfully',
    };
  } catch (error) {
    console.error('ShipRocket API request failed:', error);
    return { success: false, error: error };
  }
};

// Api to retrieve all orders from ShipRocket.......................................................................................
const getAllOrder = async () => {
  try {
    // ShipRocket API endpoint and access token
    const shipRocketApiKey = await getAccessToken();
    const shipRocketEndpoint = 'https://apiv2.shiprocket.in/v1/external/orders';

    // API request to retrieve all orders
    const response = await axios.get(shipRocketEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${shipRocketApiKey}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  createShipRocketOrder,
  updateShipRocketOrder,
  getAllOrder,
  getAccessToken,
};
