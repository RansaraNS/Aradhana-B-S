import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllItems.css';

function Allitems () {
    const [itemList, setItemList] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:2001/item/items");
            console.log(response.data);
            if(response.data.success) {
                setItemList(response.data.items);
            } else {
                alert("Failed to fetch Items");
            }
        } catch (error) {
            console.error("Error fetched : ", error);
            alert("Failed to fetch Items")
            
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const getStockStatus = (quantity) => {
        if (quantity === 0) {
            return "Out of stock";
        } else if (quantity < 5) {
            return "Low stock";
        } else {
            return "In stock";
        }
    };

    return(
        <div>
            <div className="itemCardArea">
                {itemList.map((item) => (
                    <div key={item.itemCode} className="SR-itemCard">
                        <h2 className="SR-itemCardName">{item.itemName}</h2>
                        <h2 className="SR-itemCardCategory">{item.itemCategory}</h2>
                        <img src={item.itemPicture} alt="Item pic" className="SR-itemCardImg" />
                        <h2 className="SR-itemCardPrice">Rs.{item.itemPrice}.00</h2>
                        <h2 className="SR-itemCardQuantity">{getStockStatus(item.itemQuantity)}</h2>
                        <button className="SR-itemCardBtn" type="button" onClick={() => navigate()}>PREVIEW</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Allitems;