import { useEffect, useState } from 'react';
import '../../Components/Sasin/ItemTable.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ItemTable = () => {

    const [itemList, setItemList] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:2001/item/items");
            console.log(response.data);
            if(response.data.success) {
                setItemList(response.data.items);
                alert("Advertisement Successfully fetched.")
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

    const handledelete = (id) => {
        axios.delete(`http://localhost:2001/Item/deleteitem/${id}`)
        .then((res) => {
            alert("Item Deleted Successfully.");
            setItemList(itemList.filter(item => item._id !== id));
        }).catch((error) => {
            console.error("Item not deleted, Error: ", error);
            alert("Item Delete Failed.");
        });
    };

    /*ddd*/

    return(
        <table>
            <tr>
                <th> Item Code </th>
                <th> Item Name </th>
                <th> Item Category </th>
                <th> Item Quantity </th>
                <th> Item Price </th>
                <th> Item Received Date </th>
                <th> Item Picture </th>
            </tr>
            <tbody>
                {itemList.map((item) => (
                    <tr key={item.itemCode}>
                        <td>{item.ItemName}</td>
                        <td>{item.itemCategory}</td>
                        <td>{item.itemQuantity}</td>
                        <td>{item.itemPrice}</td>
                        <td>{item.itemReceivedDate}</td>
                        <td><img src={item.itemPicture} alt='Item'></img></td>
                        <td>
                            <button type='button' onClick={() => navigate(`/edititem/${item._id}`)}> Edit </button>
                            <button type='button' onClick={() => handledelete(item._id)}> Delete </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ItemTable;