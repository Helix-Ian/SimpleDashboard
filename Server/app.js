import express from 'express';
import connectDB from './config/db';

const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('Server is running'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));