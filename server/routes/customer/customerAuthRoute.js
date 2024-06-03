const express = require('express');
const customerAuthController = require('../../controller/customer/customerAuthController');
const upload = require('./../../middlewares/multerS3Upload');
const router = express.Router();

router.post('/register', upload.any(), customerAuthController.registerCustomer);
router.post('/login', customerAuthController.customerLogin);
router.get('/loginRefresh', customerAuthController.loginRefresh);
router.get('/logout', customerAuthController.customerLogout);
router.post('/forgot-password', customerAuthController.forgotPassword);
router.patch('/reset-password/:token', customerAuthController.resetPassword);

module.exports = router;
