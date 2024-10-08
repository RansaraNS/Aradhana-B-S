const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wholesaleSchema = new Schema({
    customername: {
        type: String,
        required: true
    },
    customeremail: {
        type: String,
        required: true
    },
    customerphone: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    customeraddress: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false 
    }
});

const Wholesalecus = mongoose.model("wCustomer", wholesaleSchema);

module.exports = Wholesalecus;