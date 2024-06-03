const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

// Importing middleware and routes
const corsOptions = require('./config/corsOptions');
const allowCredentials = require('./middlewares/allowCredentials');
const errorHandler = require('./middlewares/errorHandler');
const { notFound } = require('./middlewares/notFoundHandler');
const routes = require('./routes/index');

// Initializing Express app
const app = express();
const Port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev')); // Logger
app.set('view engine', 'ejs'); // View engine setup
app.set('views', path.join(__dirname, 'views')); // Views directory setup
app.use(express.json()); // JSON body parser
app.use(cookieParser()); // Cookie parser

// Custom middleware
// app.use('*'); // Allow credentials middleware
// app.use(cors(corsOptions)); // CORS middleware
app.use(cors({ origin: 'http://localhost:5173' }));

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'HELLO' });
});
app.use('/api/v1/', routes); // API routes

// Error handling middleware
app.use(notFound); // Not found handler
app.use(errorHandler); // Error handler

// Start server
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
