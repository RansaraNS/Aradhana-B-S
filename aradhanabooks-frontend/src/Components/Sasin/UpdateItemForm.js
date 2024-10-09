import aradhanabooklogo from '../../Images/Aradhana Books & Stationary Logo.png';
import './UpdateItemForm.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateItemForm = () => {
    const navigate = useNavigate();
    const { itemId } = useParams();
    const [formData, setFormData] = useState({
        itemCode: "",
        itemName: "",
        itemCategory: "",
        itemQuantity: "",
        itemPrice: "",
        itemReceivedDate: "",
        itemPicture: "",
    });

    useEffect(() => {
        if (itemId) {
                axios.get(`http://localhost:2001/item/${itemId}`)
                .then((response) => {
                    const itemData = response.data;
                    if (itemData) {
                        setFormData({
                            itemCode: response.data.itemCode || "",
                            itemName: response.data.itemName || "",
                            itemCategory: response.data.itemCategory || "",
                            itemQuantity: response.data.itemQuantity || "",
                            itemPrice: response.data.itemPrice || "",
                            itemReceivedDate: response.data.itemReceivedDate || "",
                            itemPicture: response.data.itemPicture || "",
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error Fetching Item Details: ", error);
                });
        }
    }, [itemId]);

    const handleChange = (e) => {

        const { id, value } = e.target;

        if(id === "itemQuantity") {
            if(!isNaN(value) && Number(value) > 0) {
                setFormData((formData) => ({
                    ...formData,
                    [id]: value,
                }));
            }
        } else if (id === "itemPrice") {
            if(!isNaN(value) && Number(value) > 0) {
                setFormData((formData) => ({
                    ...formData,
                    [id]: value,
                }));
            }
        } else {
            setFormData((formData) => ({
                ...formData,
                [e.target.id]: e.target.value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:2001/item/updateitem/${itemId}`, formData)
            .then((response) => {
                console.log(response.data);
                alert("Item Update Successfully.")
                navigate('/itemtable');
            })
            .catch((error) => {
                    console.error("Item Details Not Updated: ", error);
                    alert("Item Update Failed.");
            });
    }

    return (
        <div>
            <h1 className='SR-updateitemformname'>UPDATE ITEM DETAILS</h1>
            <div className='SR-updateitempage'>
                <div className="SR-updateitemcontent">
                    <div className="SR-updateitemformtitle">
                        <img className="SR-updateitemtitleimg" src={aradhanabooklogo} alt="Aradhana Grocery Logo" />
                        <button type="button" className="SR-itemview" onClick={() => navigate('/itemtable')}>View Item Table</button>
                        <button type="button" className="SR-itemview1" onClick={() => navigate('/item')}>View Item Page</button>
                    </div>

                    <div className="SR-updateitemform" onSubmit={handleSubmit}>
                        <form>
                            <label className="SR-itemlabel">Item Code :</label>
                            <input type="text" className="SR-itembar" id="itemCode" value={formData.itemCode} onChange={handleChange} />

                            <label className="SR-itemlabel">Item Name :</label>
                            <input type="text" className="SR-itembar" id="itemName" value={formData.itemName} onChange={handleChange} />

                            <label className="SR-itemlabel">Item Category :</label>
                            <select className="SR-itembar" id="itemCategory" value={formData.itemCategory} onChange={handleChange}>
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
                            <input type="text" className="SR-itembar" id="itemQuantity" value={formData.itemQuantity} onChange={handleChange} />

                            <label className="SR-itemlabel">Item Price :</label>
                            <input type="text" className="SR-itembar" id="itemPrice" value={formData.itemPrice} onChange={handleChange} />

                            <label className="SR-itemlabel">Item Received Date :</label>
                            <input type="text" className="SR-itembar" id="itemReceivedDate" value={formData.itemReceivedDate} onChange={handleChange} />

                            <label className="SR-itemlabel">Item Picture :</label>
                            <input type="text" className="SR-itembar" id="itemPicture" value={formData.itemPicture} onChange={handleChange} />

                            <button type="submit" className="SR-itemsubmit">UPDATE ITEM</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateItemForm;