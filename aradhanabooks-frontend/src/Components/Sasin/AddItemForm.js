import { useState } from 'react';
import aradhanabooklogo from '../../Images/aradhanabookslogo.png';
import './AddItemForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddItemForm = () => {

    const [itemCode, setItemCode] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemCategory, setItemCategory] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemReceivedDate, setItemReceivedDate] = useState("");
    const [itemPicture, setItemPicture] = useState("");
    const [errors, setErrors] = useState({
        itemCode: "",
        itemName: "",
        itemCategory: "",
        itemQuantity: "",
        itemPrice: "",
        itemReceivedDate: "",
        itemPicture: "",
    });

    const clearForm = () => {
        setItemCode("");
        setItemName("");
        setItemCategory("");
        setItemQuantity("");
        setItemPrice("");
        setItemReceivedDate("");
        setItemPicture("");
        setErrors("");
    };

    const navigate = useNavigate();

    const validateInputs = () => {
        let valid = true;
        const newErrors = { ...errors };

        if(!itemCode) {
            newErrors.itemCode = " Item Code is required..";
            valid = false;
        } else {
            newErrors.itemCode = "";
        }

        if(!itemName) {
            newErrors.itemName = " Item Name is required..";
            valid = false;
        } else {
            newErrors.itemName = "";
        }
        
        if(!itemCategory) {
            newErrors.itemCategory = " Item Category is required..";
            valid = false;
        } else {
            newErrors.itemCategory = "";
        }

        if(!itemQuantity) {
            newErrors.itemQuantity = " Item Quantity is required..";
            valid = false;
        } else if(isNaN(itemQuantity)) {
            newErrors.itemQuantity = "Invalid Input.";
            valid = false;
        } else {
            newErrors.itemQuantity = "";
        }

        if(!itemPrice) {
            newErrors.itemPrice = " Item Price is required..";
        } else if (isNaN(itemPrice)) {
            newErrors.Price = " Invalid Number.";
            valid = false;
        } else {
            newErrors.itemPrice = "";
        }
        
        if(!itemReceivedDate) {
            newErrors.itemReceivedDate = " Item Received Date is required..";
            valid = false;
        } else {
            newErrors.itemReceivedDate = "";
        }

        if(!itemPicture) {
            newErrors.itemPicture = " Item Received Date is required..";
        } else {
            newErrors.itemPicture = "";
        }

        setErrors(newErrors);
        return valid;
    };

    const sendData = (e) => {
        e.preventDefault();

        if(!validateInputs()){
            return;
        };

        const newItem = {
            itemCode,
            itemName,
            itemCategory,
            itemQuantity,
            itemPrice: parseFloat(itemPrice),
            itemReceivedDate,
            itemPicture,
        };

        axios
            .post("http://localhost:2001/item/additem", newItem)
            .then(() => {
                alert("Item Added Successfully.");
                clearForm();
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div className='SR-additempage'>
            <div className="SR-additemcontent">
                <div className="SR-additemformtitle">
                    <img className="SR-additemtitleimg" src={aradhanabooklogo} alt="Aradhana Grocery Logo" />
                    <h1 className='SR-additemformname'>Add Products</h1>
                    <button type="batton" className="SR-itemview" onClick={() => navigate('/viewAllItem')}>View Items</button>
                </div>

                <div className="SR-additemform" onSubmit={sendData}>
                    <form>
                        <label className="SR-itemlabel">Item Code :</label>
                        <input type="text" className="SR-itembar" id="itemCode" value={itemCode} onChange={ (e) => {setItemCode(e.target.value); }} />

                        <label className="SR-itemlabel">Item Name :</label>
                        <input type="text" className="SR-itembar" id="itemName" value={itemName} onChange={ (e) => {setItemName(e.target.value); }} />

                        <label className="SR-itemlabel">Item Category :</label>
                        <select className="SR-itembar" id="itemCategory" value={itemCategory} onChange={ (e) => {setItemCategory(e.target.value); }}>
                            <option>Select Category</option>
                            <option>A5 Exercise Books</option>
                            <option>A4 CR Books</option>
                            <option>B5 Books</option>
                            <option>A5 Practical Books</option>
                            <option>Notebooks</option>
                            <option>A4 Drawing Books</option>
                            <option>A4 Science Books</option>
                            <option>A4 CR Practical Books</option>
                        </select>

                        <label className="SR-itemlabel">Item Quantity :</label>
                        <input type="text" className="SR-itembar" id="itemQuantity" value={itemQuantity} onChange={ (e) => {setItemQuantity(e.target.value); }} />

                        <label className="SR-itemlabel">Item Price :</label>
                        <input type="text" className="SR-itembar" id="itemPrice" value={itemPrice} onChange={ (e) => {setItemPrice(e.target.value); }} />

                        <label className="SR-itemlabel">Item Received Date :</label>
                        <input type="text" className="SR-itembar" id="itemReceivedDate" value={itemReceivedDate} onChange={ (e) => {setItemReceivedDate(e.target.value); }} />

                        <label className="SR-itemlabel">Item Picture :</label>
                        <input type="text" className="SR-itembar" id="itemPicture" value={itemPicture} onChange={ (e) => {setItemPicture(e.target.value); }} />

                        <button type="submit" className="SR-itemsubmit">ADD PRODUCT</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddItemForm;
