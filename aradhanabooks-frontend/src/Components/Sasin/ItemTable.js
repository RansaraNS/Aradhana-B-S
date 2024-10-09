import { useCallback, useEffect, useState } from 'react';
import '../../Components/Sasin/ItemTable.css';
import aradhanabooklogo from '../../Images/Aradhana Books & Stationary Logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ItemTable = () => {
    const [itemList, setItemList] = useState([]);
    const [filter, setFilter] = useState('total');
    const [searchQuantity, setSearchQuantity] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:2001/item/items");
            if(response.data.success) {
                setItemList(response.data.items);
                setFilteredItems(response.data.items);
            } else {
                alert("Failed to fetch Items");
            }
        } catch (error) {
            console.error("Error fetched: ", error);
            alert("Failed to fetch Items");
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:2001/Item/deleteitem/${id}`)
        .then((res) => {
            alert("Item Deleted Successfully.");
            setItemList(itemList.filter(item => item._id !== id));
        }).catch((error) => {
            console.error("Item not deleted, Error: ", error);
            alert("Item Delete Failed.");
        });
    };

    const totalItem = itemList.length;
    const lowStockCount = itemList.filter(item => item.itemQuantity > 0 && item.itemQuantity <= 5).length;
    const outOfStockCount = itemList.filter(item => item.itemQuantity === 0).length;

    const applyFilter = useCallback((filter) => {
        let filtered = [...itemList];
        if (filter === 'lowStock') {
            filtered = filtered.filter(item => item.itemQuantity > 0 && item.itemQuantity <= 5);
        } else if (filter === 'outOfStock') {
            filtered = filtered.filter(item => item.itemQuantity === 0);
        }
        setFilteredItems(filtered);
    }, [itemList]);

    useEffect(() => {
        applyFilter(filter);
    }, [filter, itemList, applyFilter]);

    const handleSearch = () => {
        const filteredByQuantity = itemList.filter(item => item.itemQuantity < parseInt(searchQuantity));
        setFilteredItems(filteredByQuantity);
    };

    const getReport = () => {
        const doc = new jsPDF();

        const currentDate = new Date();

        const columns = ["Item Code", "Item Name", "Item Category", "Item Quantity", "Unit Price", "Amount", "Item Received Date"];

        const rows = filteredItems.map(item => [item.itemCode, item.itemName, item.itemCategory, item.itemQuantity, "Rs."+item.itemPrice, "Rs."+item.itemQuantity*item.itemPrice, item.itemReceivedDate]);

        const totalCost = filteredItems.reduce((acc, item) => acc + (item.itemQuantity * item.itemPrice), 0);

        const pdfLogo = new Image();
        pdfLogo.src = aradhanabooklogo;

        pdfLogo.onload = function() {
            doc.addImage(aradhanabooklogo, 'PNG', 15, 3, 30, 20);

            doc.setFont("Jura", "bold");
            doc.setFontSize(20);
            doc.setTextColor(0, 0, 0);
            doc.text("Aradhana Books & Stationary®", 60, 15);

            doc.setFont("Jura", "bold");
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text("Experience the Difference in Every Aisle", 80, 20);

            doc.line(10, 25, 200, 25);

            doc.setFontSize(10);
            const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
            doc.text(`Date : ${formattedDate}`, 168, 30);
            
            doc.setFont("Jura", "bold");
            doc.setFontSize(16);
            doc.setTextColor(0, 3, 5);
            doc.text("Stock Report", 15, 32);

            doc.autoTable({
                head: [columns],
                body: rows,
                startY: 40,
                theme: 'grid',
                styles: {
                    fontSize: 10,
                    overflow: 'linebreak',
                    callPadding: 2,
                    textColor: [0, 0, 0],
                    fontStyle: 'normal',
                    halign: 'center',
                    valign: 'middle',
                },
                headStyles: {
                    fillColor: [194, 28, 99],
                    textColor: [255, 255, 255],
                },
                columnStyles: {
                    0: { cellWidth: 20 },
                    1: { cellWidth: 40 },
                    2: { cellWidth: 25 },
                    3: { cellWidth: 23 },
                    4: { cellWidth: 25 },
                    5: { cellWidth: 25 },
                    6: { cellWidth: 25 },
                },
                margin: { top: 10 },

            });

            doc.setFont("Jura", "bold");
            doc.setFontSize(12);
            doc.text(`Total Available Cost : Rs ${totalCost.toFixed(2)}`, 135, doc.lastAutoTable.finalY + 10);

            doc.line(10, doc.lastAutoTable.finalY + 15, 200, doc.lastAutoTable.finalY + 15);

            doc.setFont("Jura", "bold");
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text("COPYRIGHT © ARADHANA BOOKS & STATIONARY", 65, doc.lastAutoTable.finalY + 20);

            doc.save("aradhanabooks_stock.pdf");
        };
    };

    return(
        <div className='SR-itemTableArea'>
            <h2 className='SR-itemTableTitle'> ITEM TABLE</h2>

            <div className='SR-itemTable'>
                <div className='SR-itemTableHead'>
                    <button type="button" className="SR-itemTablebtn1" onClick={() => navigate('/itemadd')}>Add New Item</button>
                    <img className="SR-itemTableimg" src={aradhanabooklogo} alt="Aradhana Grocery Logo" />
                    <button type="button" className="SR-itemTablebtn2" onClick={() => navigate('/item')}>View Item Page</button>
                </div>

                <div className='SR-itemTableMainBar'>
                    <button className='SR-itemTableMB1' onClick={() => setFilter('total')}> Total Items: {totalItem} </button>
                    <button className='SR-itemTableMB2' onClick={() => setFilter('lowStock')}> Low Stock Items: {lowStockCount} </button>
                    <button className='SR-itemTableMB3' onClick={() => setFilter('outOfStock')}> Out of Stock Items: {outOfStockCount} </button>
                    <button type='button' className='SR-itemTableMB4'onClick={getReport}> Get Report </button>
                </div>

                <div className='SR-itemTableBody'>
                    <table>
                        <tr className='SR-itemTabletr'>
                            <th className='SR-itemTableth'> Item Code </th>
                            <th className='SR-itemTableth'> Item Picture </th>
                            <th className='SR-itemTableth'> Item Name </th>
                            <th className='SR-itemTableth'> Item Category </th>
                            <th className='SR-itemTableth'> Item Quantity </th>
                            <th className='SR-itemTableth'> Unit Price </th>
                            <th className='SR-itemTableth'> Amount </th>
                            <th className='SR-itemTableth'> Item Received Date </th>
                            <th className='SR-itemTableth'> Action </th>
                        </tr>
                        <tbody className='SR-itemTabletb'>
                            {filteredItems.map((item) => (
                                <tr key={item.itemCode}>
                                    <td className='SR-itemTabletd'>{item.itemCode}</td>
                                    <td className='SR-itemTabletd'><img className='SR-itemTabletdimg' src={item.itemPicture} alt='Item'></img></td>
                                    <td className='SR-itemTabletd'>{item.itemName}</td>
                                    <td className='SR-itemTabletd'>{item.itemCategory}</td>
                                    <td className='SR-itemTabletd'>{item.itemQuantity}</td>
                                    <td className='SR-itemTabletd'>Rs.{item.itemPrice}</td>
                                    <td className='SR-itemTabletd'>Rs.{Number(item.itemQuantity) * Number(item.itemPrice)}</td>
                                    <td className='SR-itemTabletd'>{item.itemReceivedDate}</td>
                                    <td className='SR-itemTabletd'>
                                        <button type='button' className='SR-itemTabletdbtn1' onClick={() => navigate(`/itemupdate/${item._id}`)}> UPDATE </button>
                                        <button type='button' className='SR-itemTabletdbtn2' onClick={() => handleDelete(item._id)}> REMOVE </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='SR-itemTableSearch'>
                    <input 
                        type="number" 
                        value={searchQuantity} 
                        onChange={(e) => setSearchQuantity(e.target.value)} 
                        placeholder="Enter Quantity"
                        className='SR-itemTableSearchPlace'
                    />
                    <button className='SR-itemTableSearchButton' onClick={handleSearch}>SEARCH</button>
                </div>
            </div>
        </div>
    );
}

export default ItemTable;
