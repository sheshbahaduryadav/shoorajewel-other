// Import required modules
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../../config/db');
const crypto = require('crypto');
const sendEmail = require('./../../../middlewares/email');

// Api to register a new user..........................................................................
const registerUser = async (req, res) => {
  try {
    const { fullName, gender, dob, phone, email, password, roleId } = req.body;
    // Check if all required fields are provided
    if (
      !fullName ||
      !gender ||
      !dob ||
      !phone ||
      !email ||
      !password ||
      !roleId
    ) {
      return res.status(400).json({ message: 'All fields are mandatory!' });
    }
    // Split and rearrange the "dd/mm/yyyy" date input to "yyyy-mm-dd" format for a DateTime object
    const [day, month, year] = dob.split('/');
    const formattedDOB = `${year}-${month}-${day}`;
    const duplicate = await prisma.user.findMany({
      where: {
        email,
        phone,
      },
    });
    // Check for duplicate users
    if (duplicate.length > 0) {
      return res.status(409).json({ message: 'Duplicate User!' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user in the database
    const createUser = await prisma.User.create({
      data: {
        fullName,
        gender,
        dob: new Date(formattedDOB), // Convert the formatted date to a JavaScript Date object
        phone,
        email,
        password: hashedPassword,
        role: {
          connect: {
            id: roleId,
          },
        },
      },
    });
    if (createUser) {
      const verifiyURL = `${process.env.FRONTEND_URL}verify-email/${createUser.id}`;
      const message = `Verifie your Email? Hi ${createUser.name}, Please click here to this link ${verifiyURL} for your email verification!`;
      try {
        await sendEmail({
          email: createUser.email,
          subject: 'Your Email verification!)',
          message,
        });
        return res.status(200).json({
          message: 'verification link sent to email!',
        });
      } catch (error) {
        console.error(error);
      }
    }
    // Send a success response
    res.json(createUser);
  } catch (err) {
    // Send an error response if an internal server error occurs
    return res.status(500).json({ message: 'Internal server error!.' });
  }
};

// Api to verify user's email...........................................................................
const verifyEmail = async (req, res, next) => {
  // Extract the verification ID from the request parameters
  const verifyId = req.params.id;
  try {
    // Find the user based on the verification ID
    const user = await prisma.user.findFirst({
      where: {
        id: verifyId,
      },
    });
    // If user is not found or the result is empty, return an error
    if (!user || user.length == 0) {
      return res.status(400).json({ message: 'verifyId is invalid ' });
    } else {
      // If user is found, update the 'isVerifiedEmail' flag to true
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isVerifiedEmail: true,
        },
      });
    }
    // Send a success response
    return res.status(200).json({
      status: 'success',
      message: 'Email verified successfully',
    });
  } catch (error) {
    // Handle any errors and send an appropriate response
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Api for user login...............................................................................
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password)
      return res.status(400).json({ message: 'All fields are mandatory!' });
    const userLogin = await prisma.user.findUnique({
      where: { email },
    });
    // Return unauthorized if user doesn't exist
    if (!userLogin) return res.sendStatus(401);
    // Check if user is inactive
    if (userLogin.isActive == false) {
      return res.status(403).json({ message: 'Unauthorized!' });
    }
    // Compare passwords
    const match = await bcrypt.compare(password, userLogin.password);
    // Return forbidden if passwords don't match
    if (!match)
      return res.status(403).json({ message: 'Invalid email and password!' });
    if (userLogin) {
      // Create JWT tokens
      const accessToken = jwt.sign(
        {
          userInfo: {
            fullName: userLogin.fullName,
            id: userLogin.id,
          },
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: '7d',
        }
      );
      const refreshToken = jwt.sign(
        {
          userInfo: {
            fullName: userLogin.fullName,
            id: userLogin.id,
          },
        },
        process.env.REFRESH_TOKEN,
        {
          expiresIn: '7d',
        }
      );
      // Update user's refresh token in the database
      const result = await prisma.user.update({
        where: {
          id: userLogin.id,
        },
        data: {
          refreshToken: refreshToken,
        },
        include: { role: true },
      });
      // Set refresh token as a cookie
      res.cookie('userjwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      // Prepare user details to be sent in the response
      const userDetails = {
        userName: result.fullName,
        email: result.email,
        phone: result.phone,
        gender: result.gender,
        userId: result.id,
      };
      // Send access token and user details in the response
      return res.json({ accessToken, userDetails });
    }
  } catch (err) {
    res.json(err.message);
  }
};

// Api to refresh user token..........................................................................
const loginRefresh = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.userjwt) {
      return res.status(400).json({ message: 'Unauthorized' });
    }
    const refreshToken = cookies.userjwt;
    const foundUser = await prisma.user.findFirst({
      where: {
        refreshToken: refreshToken,
      },
      include: {
        role: true,
      },
    });
    if (!foundUser) {
      return res.status(400).json({ message: 'Unauthorized' });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err || foundUser.fullName !== decoded.userInfo.fullName) {
        return res.status(400).json({ message: 'Unauthorized' });
      }
      // Create a new access token
      const accessToken = jwt.sign(
        {
          userInfo: {
            fullName: foundUser.fullName,
            id: foundUser.id,
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '7d' }
      );
      // Send the new access token in the response
      res.status(200).json({ accessToken, result: foundUser });
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Api for user logout.................................................................................
const userLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.userjwt) return res.sendStatus(204);
  // Clear the user jwt cookie
  res.clearCookie('userjwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
  res.json({ message: 'User Logout Successfully' });
};

// Api for resetting user password........................................................................
const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  // Get user based on provided email
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res
      .status(404)
      .json({ message: 'There is no user with this email address' });
  }
  // Generate a random reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hash = crypto.createHash('sha256').update(resetToken).digest('hex');
  let passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  // Update user's reset token and expiration time in the database
  const updateUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetToken: hash,
      passwordResetExpires: passwordResetExpires,
    },
  });
  // Construct the reset password URL
  const resetURL = `${process.env.BASE_URL}user-forgot-password/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password to ${resetURL}.\nif you didn't forget your password,plese ignore this email!  `;
  try {
    // Send password reset token to user's email
    await sendEmail({
      email: updateUser.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    // Send a success response
    return res.status(200).json({
      message: 'Token sent to email!',
      resetToken,
    });
  } catch (error) {
    // Send an error response if an internal server error occurs
    updateUser.resetToken = undefined;
    updateUser.passwordResetExpires = undefined;
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Api for resetting user password..................................................................................
const resetPassword = async (req, res, next) => {
  const resetToken = req.params.token;
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  // Find user based on the reset token and expiration time
  const users = await prisma.user.findFirst({
    where: {
      resetToken: hashedToken,
      passwordResetExpires: {
        gt: new Date(Date.now()),
      },
    },
  });
  if (!users || users.length == 0) {
    return res.status(400).json({ message: 'token is invalid or has expired' });
  }
  // Hash the new password
  const newPassword = req.body.password;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  // Update user's password and clear reset token and expiration time
  const updatedUser = await prisma.user.update({
    where: {
      id: users.id,
    },
    data: {
      password: hashedPassword,
      resetToken: null,
      passwordResetExpires: null,
    },
  });
  // Create a new access token
  const aToken = (id) => {
    return jwt.sign(
      {
        id,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: '10d' }
    );
  };
  const token = aToken(users.id);
  // Send a success response with the new access token
  res.status(200).json({
    status: 'success',
    token,
  });
};

// Export all Apis
module.exports = {
  registerUser,
  verifyEmail,
  userLogin,
  userLogout,
  forgetPassword,
  loginRefresh,
  resetPassword,
};
