const bcrypt = require('bcrypt');
const prisma = require('./../../config/db');

// Api for get customer information.................................................
const getCustomer = async (req, res) => {
  try {
    // Extract customer ID from request parameters
    const customerId = req.params.id;

    // Fetch customer details from the database
    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
      // Select specific fields to retrieve
      select: {
        id: true,
        fullName: true,
        gender: true,
        dob: true,
        phone: true,
        email: true,
        address: true,
        profileImage: true,
      },
      // Include related data (billing addresses and shipping address)
      include: {
        BillingAddresses: true,
        ShippingAddress: true,
      },
    });

    // Send customer data as JSON response
    res.status(200).json(customer);
  } catch (err) {
    // Handle any errors and send an appropriate response
    res.status(500).json({ message: 'Internal Server error!' });
  }
};

// API for updating customer information.............................................
const updateCustomer = async (req, res) => {
  try {
    // Extract customer ID from request parameters
    const customerId = req.params.id;

    // Extract customer data from request body
    const {
      fullName,
      gender,
      dob,
      phone,
      address,
      email,
      houseNo,
      pincode,
      street,
      landmark,
      city,
      state,
    } = req.body;

    // Check if customer exists
    const Customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });
    if (!Customer) {
      return res.status(400).json({ message: `Customer not found!` });
    }

    // Check if profile image is uploaded
    if (req.files !== undefined && req.files.length !== 0) {
      // Update customer with profile image
      const customerUpdated = await prisma.customer.update({
        where: { id: customerId },
        data: {
          fullName,
          dob: dob, // Convert the formatted date to a JavaScript Date object
          gender,
          phone,
          address,
          email,
          houseNo,
          pincode,
          street,
          landmark,
          city,
          state,
          profileImage: req.files[0].location,
        },
      });
      res.status(201).json(customerUpdated);
    } else {
      // Update customer without profile image
      const customerUp = await prisma.customer.update({
        where: { id: customerId },
        data: {
          fullName,
          dob: dob, // Convert the formatted date to a JavaScript Date object
          gender,
          address,
          email,
          fullName,
          phone,
          houseNo,
          pincode,
          street,
          landmark,
          city,
          state,
        },
      });

      res.status(201).json(customerUp);
    }
  } catch (err) {
    // Handle any errors and send an appropriate response
    res.status(500).json({ message: 'Internal Server error!' });
  }
};

// API for deleting a customer (soft delete)..........................................
const deleteCustomer = async (req, res) => {
  try {
    // Extract customer ID from request parameters
    const customerId = req.params.id;

    // Find the customer by ID
    const customer = await prisma.customer.findFirst({
      where: {
        id: customerId,
      },
    });

    // Update customer's isActive status to its opposite (soft delete)
    await prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        isActive: !customer.isActive,
      },
    });

    // Send success message
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    // Handle any errors and send an appropriate response
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// API for retrieving all customers with filtering and pagination.............................
const getAllCustomers = async (req, res) => {
  try {
    // Destructure query parameters
    let { name, email, phoneNo, active, page, pageSize } = req.query;

    // Convert 'active' string to boolean if provided
    if (active !== undefined) {
      if (active === 'false') {
        active = false;
      } else if (active === 'true') {
        active = true;
      }
    }

    // Fetch customers based on filter criteria and pagination
    const customers = await prisma.customer.findMany({
      where: {
        AND: [
          {
            fullName: {
              startsWith: name,
              mode: 'insensitive', // Case-insensitive search
            },
          },
          {
            email: {
              startsWith: email,
              mode: 'insensitive', // Case-insensitive search
            },
          },
          {
            phone: {
              startsWith: phoneNo,
              mode: 'insensitive', // Case-insensitive search
            },
          },
          {
            isActive: active, // Filter by active status
          },
        ],
      },
      skip: (page - 1) * pageSize, // Calculate pagination offset
      take: parseInt(pageSize), // Limit the number of records per page
    });

    // Get total count of customers (for pagination)
    const totalCustomers = await prisma.customer.count({});

    // Send response with customers and total count
    res.status(200).json({ customers, totalCustomers });
  } catch (error) {
    // Handle errors and send appropriate response
    res.status(500).json({ error: 'Error retrieving customers' });
  }
};

// API for toggling user's active/inactive status......................................................
const makeUserActiveInactive = async (userId) => {
  try {
    // Convert userId to integer
    const customerId = parseInt(userId);

    // Assuming isActive is a parameter passed to the function

    // Update user's isActive status based on the provided isActive parameter
    if (isActive) {
      // Deactivate the user
      const updatedUser = await prisma.customer.update({
        where: { id: customerId },
        data: {
          isActive: false,
        },
      });
      // Send response indicating the user is now inactive
      return `User with ID ${updatedUser.id} is now inactive.`;
    } else {
      // Activate the user
      const updatedUser = await prisma.customer.update({
        where: { id: customerId },
        data: {
          isActive: true,
        },
      });
      // Send response indicating the user is now active
      return `User with ID ${updatedUser.id} is now active.`;
    }
  } catch (error) {
    // Handle any errors and send an appropriate response
    return { message: 'Internal server error!' };
  }
};

// API for creating a new billing address.............................................................
const createBillingAddress = async (req, res) => {
  try {
    // Destructure request body to extract necessary data
    const {
      customerId,
      fullName,
      phone,
      houseNo,
      street,
      landmark,
      address,
      pincode,
      city,
      state,
    } = req.body;

    // Create a new billing address in the database
    const newBillingAddress = await prisma.billingAddresses.create({
      data: {
        fullName,
        phone,
        houseNo,
        street,
        landmark,
        address,
        pincode: parseInt(pincode), // Convert pincode to integer
        city,
        state,
        customerId: customerId, // Assign the billing address to the customer
      },
    });

    // Send a success response with the newly created billing address
    res.status(201).json(newBillingAddress);
  } catch (error) {
    // Log the error for debugging purposes
    console.log(error);
    // Send an error response if an internal server error occurs
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// API for updating a billing address..........................................................................
const updateBillingAddress = async (req, res) => {
  try {
    // Destructure request body to extract necessary data
    const {
      id,
      customerId,
      fullName,
      phone,
      houseNo,
      street,
      landmark,
      address,
      pincode,
      city,
      state,
    } = req.body;

    // Update the billing address in the database
    const updatedBillingAddress = await prisma.billingAddresses.update({
      where: {
        id: id, // Specify the ID of the billing address to update
      },
      data: {
        fullName,
        phone,
        houseNo,
        street,
        landmark,
        address,
        pincode: parseInt(pincode), // Convert pincode to integer
        city,
        state,
        customerId: customerId, // Assign the billing address to the customer
      },
    });

    // Send a success response with the updated billing address
    res.status(201).json(updatedBillingAddress);
  } catch (error) {
    // Log the error for debugging purposes
    console.log(error);
    // Send an error response if an internal server error occurs
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// API for updating a shipping address.........................................................................
const updateShippingAddress = async (req, res) => {
  try {
    // Destructure request body to extract necessary data
    const {
      id,
      customerId,
      fullName,
      phone,
      houseNo,
      street,
      landmark,
      address,
      pincode,
      city,
      state,
    } = req.body;

    // Update the shipping address in the database
    const updatedShippingAddress = await prisma.shippingAddress.update({
      where: {
        id: id, // Specify the ID of the shipping address to update
      },
      data: {
        fullName,
        phone,
        houseNo,
        street,
        landmark,
        address,
        pincode: parseInt(pincode), // Convert pincode to integer
        city,
        state,
        customerId: customerId, // Assign the shipping address to the customer
      },
    });

    // Send a success response with the updated shipping address
    res.status(201).json(updatedShippingAddress);
  } catch (error) {
    // Log the error for debugging purposes
    console.log(error);
    // Send an error response if an internal server error occurs
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// API for retrieving billing addresses of a user....................................................................
const getBillingAddress = async (req, res) => {
  // Extract user ID from request parameters
  const { id } = req.params;
  try {
    // Retrieve billing addresses associated with the user ID from the database
    const userBillingAddress = await prisma.billingAddresses.findMany({
      where: {
        customerId: id, // Filter by customer ID
      },
    });
    // Send a success response with the user's billing addresses
    res.status(200).json(userBillingAddress);
  } catch (error) {
    // Handle any errors and send an appropriate response
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// API for retrieving a billing address by its ID.......................................................................
const getBillingAddressById = async (req, res) => {
  // Extract billing address ID from request parameters
  const { id } = req.params;
  try {
    // Retrieve the billing address from the database by its ID
    const userBillingAddress = await prisma.billingAddresses.findUnique({
      where: {
        id, // Filter by billing address ID
      },
    });
    // Send a success response with the retrieved billing address
    res.status(200).json(userBillingAddress);
  } catch (error) {
    // Handle any errors and send an appropriate response
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// API for retrieving shipping addresses of a user.....................................................................
const getShippingAddress = async (req, res) => {
  // Extract user ID from request parameters
  const { id } = req.params;
  try {
    // Retrieve shipping addresses associated with the user ID from the database
    const userShippingAddress = await prisma.shippingAddress.findMany({
      where: {
        customerId: id, // Filter by customer ID
      },
    });
    // Send a success response with the user's shipping addresses
    res.status(200).json(userShippingAddress);
  } catch (error) {
    // Handle any errors and send an appropriate response
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// API for retrieving a shipping address by its ID.......................................................................
const getShippingAddressById = async (req, res) => {
  // Extract shipping address ID from request parameters
  const { id } = req.params;
  try {
    // Retrieve the shipping address from the database by its ID
    const userShippingAddress = await prisma.shippingAddress.findUnique({
      where: {
        id, // Filter by shipping address ID
      },
    });
    // Send a success response with the retrieved shipping address
    res.status(200).json(userShippingAddress);
  } catch (error) {
    // Handle any errors and send an appropriate response
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// API for deleting a billing address
const deleteBillingAddress = async (req, res) => {
  try {
    // Extract the ID of the billing address to be deleted from request parameters
    const { id } = req.params;

    // Delete the billing address from the database
    const deletedAddress = await prisma.billingAddresses.delete({
      where: { id: id }, // Specify the ID of the billing address to delete
    });

    // Send a success response with the deleted billing address
    res.status(201).json(deletedAddress);
  } catch (error) {
    // Handle any errors and send an appropriate response
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// API for creating a new shipping address
const createShippingAddress = async (req, res) => {
  try {
    // Destructure request body to extract necessary data
    const {
      customerId,
      fullName,
      phone,
      houseNo,
      street,
      address,
      landmark,
      pincode,
      city,
      state,
    } = req.body;

    // Create a new shipping address in the database
    const newShippingAddress = await prisma.shippingAddress.create({
      data: {
        fullName,
        phone,
        houseNo,
        street,
        address,
        landmark,
        pincode: parseInt(pincode), // Convert pincode to integer
        city,
        state,
        customerId: customerId, // Assign the shipping address to the customer
      },
    });

    // Send a success response with the newly created shipping address
    res.status(201).json(newShippingAddress);
  } catch (error) {
    // Log the error for debugging purposes
    console.log(error);
    // Send an error response if an internal server error occurs
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// API for deleting a shipping address..................................................................................
const deleteShippingAddress = async (req, res) => {
  try {
    // Extract the ID of the shipping address to be deleted from request parameters
    const { id } = req.params;

    // Delete the shipping address from the database
    const deletedAddress = await prisma.shippingAddress.delete({
      where: { id: id }, // Specify the ID of the shipping address to delete
    });

    // Send a success response with the deleted shipping address
    res.status(201).json(deletedAddress);
  } catch (error) {
    // Handle any errors and send an appropriate response
    res.status(500).json({ message: 'Internal server error!' });
  }
};

module.exports = {
  getCustomer,
  updateCustomer,
  deleteCustomer,
  getAllCustomers,
  makeUserActiveInactive,
  createBillingAddress,
  createShippingAddress,
  deleteBillingAddress,
  deleteShippingAddress,
  getBillingAddress,
  getBillingAddressById,
  getShippingAddress,
  updateBillingAddress,
  updateShippingAddress,
  getShippingAddressById,
};
