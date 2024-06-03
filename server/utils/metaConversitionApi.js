const bizSdk = require('facebook-nodejs-business-sdk');

// Importing necessary classes from the SDK
const CustomData = bizSdk.CustomData;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;

// Fetching environment variables
const access_token = process.env.META_PIXEL_KEY;
const pixel_id = process.env.META_PIXEL_ID;

// Initializing Facebook Ads API with access token
const api = bizSdk.FacebookAdsApi.init(access_token);

// Function to send events to Facebook Pixel
const sendEvent = async (event, customer, product, req, quantity) => {
  try {
    // Get current timestamp in seconds
    let current_timestamp = Math.floor(new Date() / 1000);

    // Constructing UserData object
    const userData = new UserData()
      .setEmails([customer.email])
      .setPhones([customer.phone])
      .setGender(customer.gender)
      .setFirstName(customer.fullName)
      .setClientIpAddress(req.connection.remoteAddress) // Set Client IP
      .setClientUserAgent(req.headers['user-agent']); // Set User Agent

    // Constructing CustomData object
    const customData = new CustomData()
      .setContentType('product')
      .setCurrency('INR')
      .setContentName(product.productTitle)
      .setValue(product.price)
      .setNumItems(quantity);

    // Constructing ServerEvent object
    const serverEvent = new ServerEvent()
      .setEventName(event)
      .setEventTime(current_timestamp)
      .setUserData(userData)
      .setCustomData(customData)
      .setActionSource('website');

    // Logging event details for debugging
    console.log('SendEvent===>', event, userData, customData);

    // Array containing the ServerEvent object
    const eventsData = [serverEvent];

    // Constructing EventRequest object
    const eventRequest = new EventRequest(access_token, pixel_id).setEvents(
      eventsData
    );

    // Executing the event request and awaiting response
    const response = await eventRequest.execute(eventRequest);
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendEvent };
