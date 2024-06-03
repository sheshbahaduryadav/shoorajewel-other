require('dotenv').config();
const crypto = require('crypto');
const axios = require('axios');
const prisma = require('../../config/db');
const metaConversionsApi = require('../../utils/metaConversitionApi');

const merchant_id = process.env.MERCHANT_ID;
const salt_key = process.env.SALT_KEY;
const BACKEND_URL = process.env.BACKEND_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Function to initiate a new payment
const newPayment = async (req, res) => {
  try {
    const merchantTransactionId = req.body.transactionId;

    // Extract order IDs from request body
    const orderId = req.body.orderData.map((item) => {
      return item.id;
    });

    const data = {
      merchantId: merchant_id,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: req.body.MUID,
      name: req.body.name,
      amount: req.body.amount * 100,
      redirectUrl: `${BACKEND_URL}/customer/status/${merchantTransactionId}?ids=${orderId}`,
      redirectMode: 'POST',
      mobileNumber: req.body.number,
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString('base64');
    const keyIndex = 1;
    const string = payloadMain + '/pg/v1/pay' + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + keyIndex;

    const prod_URL = 'https://api.phonepe.com/apis/hermes/pg/v1/pay';
    const options = {
      method: 'POST',
      url: prod_URL,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        return res.send(response.data.data.instrumentResponse.redirectInfo.url);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    // Handle internal server error
    res.status(500).json({ message: 'Internal server error!' });
  }
};

// Function to check payment status
const checkStatus = async (req, res) => {
  const merchantTransactionId = res.req.body.transactionId;
  const merchantId = res.req.body.merchantId;
  let { ids } = req.query;
  ids = ids.split(',');
  console.log(ids);

  const keyIndex = 1;
  const string =
    `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + '###' + keyIndex;

  const options = {
    method: 'GET',
    url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
      'X-MERCHANT-ID': `${merchantId}`,
    },
  };

  // Check payment status
  axios
    .request(options)
    .then(async (response) => {
      if (response.data.code !== 'PAYMENT_PENDING') {
        ids.map(async (id) => {
          const order = await prisma.myOrder.update({
            where: {
              id: id,
            },
            data: {
              paymentStatus: 'DONE',
            },
            include: {
              customer: true,
              productList: true,
            },
          });
          const metaConversionsApiRes = await metaConversionsApi.sendEvent(
            'Purchase',
            order.customer,
            order.productList,
            req,
            order.productQuantity
          );
          console.log(metaConversionsApiRes);
        });
        const url = `${FRONTEND_URL}/payment-success/`;
        return res.redirect(url);
      } else {
        const url = `${FRONTEND_URL}/payment-failed/`;
        return res.redirect(url);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  newPayment,
  checkStatus,
};
