const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    itemCode:{
        type: String,
        required: true
    },
    itemName:{
        type: String,
        required: true
    },
    itemCategory:{
        type: String,
        required: true
    },
    itemQuantity:{
        type: Number,
        required: true 
    },
    itemPrice:{
        type: Number,
        required: true 
    },
    itemReceivedDate:{
        type: String,
        required: true 
    },
    itemPicture:{
        type: String,
        required: true
    },
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
