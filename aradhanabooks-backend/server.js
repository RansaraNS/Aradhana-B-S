const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 2001;
const host = 'localhost';

app.use(cors());
app.use(express.json());

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

const itemRouter = require("./routes/Sasin/Item.js");
app.use('/item', itemRouter);
