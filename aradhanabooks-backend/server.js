const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require("path"); 

const app = express();
const port = 2001;
const host = 'localhost';

app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const uri = 'mongodb+srv://ransara00:projectitp@aradhanabooks.fdyw5ed.mongodb.net/?retryWrites=true&w=majority&appName=aradhanaBooks';

const connect = async () => {
    try {
        await mongoose.connect(uri);
        
    } catch (error) {
        console.log('MongoDB Error : ', error);
    }
};

connect();

const server = app.listen(port, host, () => {
    console.log(`Node Server is listening to ${server.address().port}`);
});


//Sasin
const itemRouter = require("./routes/Sasin/Item.js");
app.use('/item', itemRouter);

//Piyumal
const wholeSaleCustomerRoutes = require("./routes/Piyumal/wholeSaleCustomers.js");
app.use('/wcustomer', wholeSaleCustomerRoutes);

//Iresha
const complaintsRouter = require("./routes/Iresha/complaint.js");
app.use("/complaint", complaintsRouter);
const reviewsRouter = require("./routes/Iresha/review.js");
app.use("/review", reviewsRouter);

//KIshara
const trackRoutes = require('./routes/KIshara/track.js');
app.use('/track', trackRoutes);
const inquiryRoutes = require("./routes/KIshara/inquiryRoutes.js");
app.use("/api", inquiryRoutes);

//Malitha
const authRoutes = require('./routes/Malitha/auth.js');
app.use('/api/auth', authRoutes);
const loyaltyDiscountRoutes = require('./routes/Malitha/loyaltyDiscount.js');
app.use('/api/loyalty-discount', loyaltyDiscountRoutes);

//Luthira
const router = require('./routes/Luthira/router.js');
app.use('/api', router);

//Ishara
const addressRouter = require('./routes/Ishara/address');
app.use('/addresses', addressRouter);
const orderRoutes = require('./routes/Ishara/order');
app.use('/api/orders', orderRoutes);
const refundsRoute = require('./routes/Ishara/refunds');
app.use('/api/refunds', refundsRoute);
const salesOverviewRouter = require('./routes/Ishara/salesOverview');
app.use('/api/sales-overview', salesOverviewRouter);

//Janith
const deliveryRoutes = require('./routes/Janith/delivery.router.js');
app.use('/api', deliveryRoutes);