const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./utils/db');
const authRoutes=require('./routes/authRoutes');
const cartRoutes=require('./routes/cartRoutes');

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api/auth",authRoutes);
app.use("/api/cart",cartRoutes);

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port no: ${PORT}`);

    })
})