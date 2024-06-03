const {
  newPayment,
  checkStatus,
} = require('../../controller/payment/paymentController');
const express = require('express');
const router = express();

router.post('/payment', newPayment);
router.post('/status/:txnId', checkStatus);
// router.post("/status", checkStatus);

module.exports = router;
