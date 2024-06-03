// Importing required modules
const bcrypt = require('bcrypt');
const prisma = require('../../../config/db');

// Api to get all users.................................................................................................
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.User.findMany({}); // Retrieving all users from the database
    res.status(200).json(users); // Sending the retrieved users as a JSON response
  } catch (error) {
    console.error(error); // Logging any errors that occur
    res.status(500).json({ error: 'Error retrieving users' }); // Sending an error response if there's an issue retrieving users
  }
};

// Api to get a specific user by ID.................................................................................................
const getUser = async (req, res) => {
  try {
    const userId = req.params.id; // Extracting the user ID from the request parameters
    const User = await prisma.User.findUnique({
      // Finding the user with the specified ID
      where: {
        id: userId,
      },
    });
    res.status(200).json(User); // Sending the retrieved user as a JSON response
  } catch (err) {
    res.status(500).json({ message: 'Internal server error!' }); // Sending an error response if there's an issue
  }
};

// Api to update a user's information.................................................................................
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id; // Extracting the user ID from the request parameters
    if (!userId)
      // Checking if the user ID is provided
      return res.status(400).json({ message: `${userId} not found!` }); // Sending a bad request response if the user ID is missing
    const {
      // Extracting user information from the request body
      fullName,
      gender,
      phone,
      email,
      houseNo,
      street,
      landmark,
      pincode,
      city,
      state,
    } = req.body;
    if (userId) {
      // Checking if the user ID exists
      const userUpdate = await prisma.User.update({
        // Updating the user information in the database
        where: { id: userId },
        data: {
          fullName,
          gender,
          phone,
          email,
          houseNo,
          street,
          landmark,
          pincode,
          city,
          state,
        },
      });
      res.status(203).json(userUpdate); // Sending a success response with the updated user information
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error!' }); // Sending an error response if there's an issue
  }
};

// Api to delete a user..........................................................................................
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Extracting the user ID from the request parameters
    const user = await prisma.user.findFirst({
      // Finding the user with the specified ID
      where: {
        id: userId,
      },
    });
    await prisma.user.update({
      // Updating the user's isActive status to deactivate the account
      where: {
        id: userId,
      },
      data: {
        isActive: !user.isActive,
      },
    });
    res.json({ message: 'User deleted successfully' }); // Sending a success response
  } catch (err) {
    res.status(500).json({ message: 'Internal server error!' }); // Sending an error response if there's an issue
  }
};

// Exporting the Apis for use in the application
module.exports = { getUser, updateUser, deleteUser, getAllUsers };
