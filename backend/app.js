const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') })

// Enable CORS for all origins
app.use(cors());

// Or, configure CORS options
app.use(cors({
    origin: 'http://localhost:49195', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
    credentials: true, // Allow credentials (cookies, etc.)
}));

const connectDB = require('./config/connectDB')
const products = require('./routes/product')
const orders = require('./routes/order')

connectDB()
app.use(express.json())
app.use('/api/v1/', products)
app.use('/api/v1/', orders)

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT)
    console.log(`Server listening to Port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});