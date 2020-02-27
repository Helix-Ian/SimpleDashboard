// app.js

const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Server Running Here'));

const port = process.env.PORT || 8083;

app.listen(port, () => console.log(`Server running on port ${port}`));