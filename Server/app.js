const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const users = require('./routes/api/users');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Server Connected'));

// use Routes
app.use('/api/users', users);

const port = process.env.PORT || 8083;

app.listen(port, () => console.log(`Server running on port ${port}`));