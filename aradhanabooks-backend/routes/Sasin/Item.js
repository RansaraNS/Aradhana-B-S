const router = require("express").Router();
const Item = require('../../models/Sasin/item');

router.route('/additem').post((req, res) => {
    const itemCode = req.body.itemCode;
    const itemName = req.body.itemName;
    const itemCategory = req.body.itemCategory;
    const itemQuantity = Number(req.body.itemQuantity);
    const itemPrice = Number(req.body.itemPrice);
    const itemReceivedDate = req.body.itemReceivedDate;
    const itemPicture = req.body.itemPicture;

    const newItem = new Item({
        itemCode,
        itemName,
        itemCategory,
        itemQuantity: Number(itemQuantity),
        itemPrice: Number(itemPrice),
        itemReceivedDate,
        itemPicture,
    })
    
    newItem.save().then(() => {
        res.json("Item Added Successfully.")
    }).catch((err) => {
        console.log(err);
        res.status(400).json("Error: " + err.message);
    })

});

router.route('/items').get((req, res) => {
    Item.find()
        .then((items) => {
            res.json({ success: true, items })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ success: false, error: "Error fetching items" });
        });
});

router.route('/updateitem/:id').put(async(req,res) => {
    let itemId = req.params.id;
    const {itemCode, itemName, itemCategory, itemQuantity, itemPrice, itemReceivedDate, itemPicture} = res.body;
    const updateitem = {
        itemCode,
        itemName,
        itemCategory,
        itemQuantity,
        itemPrice,
        itemReceivedDate,
        itemPicture
    }
    const update = await Item.findByIdAndUpdate(itemId, updateitem).then(() => {
            res.status(200).send({ status: "Item updated.." });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ status: "Item not updated, Try Again.." });
    })
});

router.route('/deleteitem/:id').delete(async(req,res) => {
    try{
        const itemId = req.params.id;
        await Item.findByIdAndDelete(itemId);
        res.status(200).json({ status: "Item deleted.." });
    } catch(error) {
        console.error("Error deleting item: " ,error);
        res.status(500).json({ status: "Item not deleted.."}); 
    }
});

router.get('/item/:id', async(req,res) => {
    try {
        const item = await Item.findById(req.params.id);
        if(!item) {
            return res.status(404).json({ error: "Item not found.." });
        }
        res.json(item);
    } catch (error) {
        console.error("Error fetching item by Id: ", error);
        res.status(500).json({ error: "Error fetching item" });
    }
});

module.exports = router;

