// Imports for external dependencies
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Imports for internal dependencies
const { connect } = require('./db/connect');

// Routes
const minionRoute = require('./routes/minions');

// Initialize express
const app = express();

// Port number
const port = process.env.PORT || 8000;

// Use express body parser
app.use(express.json());

// Use Morgan
app.use(morgan('common'));

// Use Helmet
app.use(helmet());

// Use CORS
app.use(cors({
    origin: process.env.NODE_ENV.trim() === 'development' ? 'http://localhost:3000' : 'https://hs-bgs-simulator-client.vercel.app'
}));

// Use Express Routes
app.use('/api/', minionRoute);

// Use static content
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Starting server
app.listen(port, () => {
    connect();
});