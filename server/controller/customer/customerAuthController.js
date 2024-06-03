const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('./../../config/db');
const crypto = require('crypto');
const sendEmail = require('../../middlewares/email');
require('dotenv').config();

const registerCustomer = async (req, res) => {
  try {
    const { fullName, phone, email, password } = req.body;
    if (!fullName || !phone || !email || !password) {
      return res.status(400).json({ message: 'All fields are mendatory!' });
    }

    const duplicate = await prisma.customer.findMany({
      where: {
        email,
        phone,
      },
    });
    //if duplicate
    if (duplicate.length > 0) {
      return res
        .status(409)
        .json({ message: 'This email is already registered!' });
    } //conflict

    const hashedPassword = await bcrypt.hash(password, 10);

    if (req.files !== undefined && req.files.length !== 0) {
      const createCustomer = await prisma.customer.create({
        data: {
          fullName,
          phone,
          email,
          password: hashedPassword,
          roles: 'Customer',
          profileImage: req.files[0].location,
        },
      });
      res.status(201).json(createCustomer);
    } else {
      const createCustomer = await prisma.customer.create({
        data: {
          fullName,
          phone,
          email,
          password: hashedPassword,
          roles: 'Customer',
        },
      });
      if (createCustomer) {
        const verifiyURL = `${process.env.FRONTEND_URL}verify-email/${createCustomer.id}`;
        const message = `Verifie your Email? Hi ${createCustomer.name}, Please click here to this link ${verifiyURL} for your email verification!`;
        try {
          await sendEmail({
            email: createCustomer.email,
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
      res.status(201).json(createCustomer);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'User registration and image upload failed.' });
  }
};
const verifyEmail = async (req, res, next) => {
  const verifyId = req.params.id;
  try {
    const user = await prisma.customer.findFirst({
      where: {
        id: verifyId,
      },
    });
    if (!user || user.length == 0) {
      return res.status(400).json({ message: 'verifyId is invalid ' });
    } else {
      await prisma.customer.update({
        where: {
          id: user.id,
        },
        data: {
          isVerifiedEmail: true,
        },
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Email verified successfully',
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'All fields are mendatory!' }); //not found
    const CustomerLogin = await prisma.customer.findUnique({
      where: { email },
    });
    if (!CustomerLogin) {
      return res.status(401).send('User does not exist');
    } //unauthorize.
    if (CustomerLogin.isActive == false) {
      return res
        .status(403)
        .json({ message: 'You have not permission to login!' });
    }
    const match = await bcrypt.compare(password, CustomerLogin.password);
    if (!match)
      return res.status(403).json({ message: 'Invalid email and password!' }); //forbidden
    if (CustomerLogin) {
      const roles = Object.values(CustomerLogin.roles);
      //create jwt
      const accessToken = jwt.sign(
        {
          userInfo: {
            fullName: CustomerLogin.fullName,
            id: CustomerLogin.id,
          },
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: '5d',
        }
      );

      const refreshToken = jwt.sign(
        {
          userInfo: {
            fullName: CustomerLogin.fullName,
            id: CustomerLogin.id,
          },
        },
        process.env.REFRESH_TOKEN,
        {
          expiresIn: '7d',
        }
      );

      const result = await prisma.customer.update({
        where: { email },
        data: {
          refreshToken: refreshToken,
        },
      });

      res.cookie('userjwt', refreshToken, {
        httpOnly: true,
        // sameSite: "None",
        // secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      const CustomerDetails = {
        CustomerName: CustomerLogin.fullName,
        email: CustomerLogin.email,
        phone: CustomerLogin.phone,
        gender: CustomerLogin.gender,
        CustomerId: CustomerLogin.id,
        profileImage: CustomerLogin.profileImage,
      };
      return res.json({ accessToken, result: CustomerDetails });
    }
  } catch (err) {
    res.json(err.message);
  }
};

const loginRefresh = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.userjwt) {
      return res.status(400).json({ message: 'Unauthorized' });
    }
    const refreshToken = cookies.userjwt;
    const foundUser = await prisma.customer.findFirst({
      where: {
        refreshToken: refreshToken,
      },
      include: {
        myorder: true,
        mycart: true,
      },
    });
    if (!foundUser) {
      return res.status(400).json({ message: 'Unauthorized' });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err || foundUser.fullName !== decoded.userInfo.fullName) {
        return res.status(400).json({ message: 'Unauthorized' });
      }
      const accessToken = jwt.sign(
        {
          userInfo: {
            fullName: decoded.userInfo.fullName,
            id: decoded.userInfo.id,
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '7d' }
      );
      const CustomerDetails = {
        CustomerName: foundUser.fullName,
        email: foundUser.email,
        phone: foundUser.phone,
        gender: foundUser.gender,
        CustomerId: foundUser.id,
        profileImage: foundUser.profileImage,
      };
      res.status(200).json({ accessToken, result: CustomerDetails });
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
const customerLogout = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.userjwt) return res.sendStatus(204); //no content
  res.clearCookie('userjwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
  res.json({ message: 'Customer logout successfully' });
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  // 1.) Get user based on posted email
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
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hash = crypto.createHash('sha256').update(resetToken).digest('hex');
  // const hash = await bcrypt.hash(resetToken, 10);

  let passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  const updateUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetToken: hash,
      passwordResetExpires: passwordResetExpires,
    },
  });

  const resetURL = `${process.env.BASE_URL}user-forgot-password/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password to ${resetURL}.\nif you didn't forget your password,plese ignore this email!  `;
  try {
    await sendEmail({
      email: updateUser.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    return res.status(200).json({
      message: 'Token sent to email!',
      resetToken,
    });
  } catch (error) {
    updateUser.resetToken = undefined;
    updateUser.passwordResetExpires = undefined;
    res.status(500).json({ message: 'Internal server error!' });
  }
};

const resetPassword = async (req, res, next) => {
  // 1.) get user based on the token
  const resetToken = req.params.token;
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

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

  const newPassword = req.body.password;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
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
  res.status(200).json({
    status: 'success',
    token,
  });
};

module.exports = {
  verifyEmail,
  loginRefresh,
  registerCustomer,
  customerLogin,
  customerLogout,
  forgotPassword,
  resetPassword,
};
