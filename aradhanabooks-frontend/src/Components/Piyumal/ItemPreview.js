import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ItemPreview.css";

const ItemPreview = () => {
  const { itemCode } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const navigate = useNavigate();
  const [cartQuantity, setCartQuantity] = useState(0); 

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2001/item/${itemCode}`
        );
        setItem(response.data);
      } catch (error) {
        alert("Failed to fetch item details.");
      }
    };

    fetchItem();
  }, [itemCode]);

  useEffect(() => {
    // Check the cart for this item and get the quantity already added
    const savedCart = localStorage.getItem("cart");
    const cart = savedCart ? JSON.parse(savedCart) : [];

    const cartItem = cart.find((cartItem) => cartItem.item._id === itemCode);
    setCartQuantity(cartItem ? cartItem.quantity : 0); 
  }, [itemCode]);

  const handleIncrease = () => {
    if (quantity + cartQuantity < item.itemQuantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      alert(
        `Maximum quantity reached. Only ${item.itemQuantity - cartQuantity} items available for purchase.`
      );
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addItemToCart = (newItem) => {
    const savedCart = localStorage.getItem("cart");
    let cart = savedCart ? JSON.parse(savedCart) : [];

    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.item._id === newItem._id
    );
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ item: newItem, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleAddToCart = () => {
    if (item.itemQuantity === 0) {
      alert("This item is currently out of stock and cannot be added to the cart.");
      return; 
    }

    if (cartQuantity + quantity > item.itemQuantity) {
      alert(
        `You can only add up to ${item.itemQuantity - cartQuantity} more items to the cart.`
      );
      return;
    }

    addItemToCart(item);
    setShowConfirmBox(true);
  };

  const handleContinueShopping = () => {
    setShowConfirmBox(false);
    navigate("/");
  };

  const handleViewCart = () => {
    setShowConfirmBox(false);
    navigate("/cart");
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="piyumal__item-preview">
      <h1>{item.itemName}</h1>
      <img src={item.itemPicture} alt={item.itemName} />
      <p>Category: {item.itemCategory}</p>
      <p>Price: Rs.{item.itemPrice}</p>
      <p>Available Quantity: {item.itemQuantity}</p>
      <p>Received Date: {item.itemReceivedDate}</p>

      <div className="piyumal__quantity-control">
        <button onClick={handleDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={handleIncrease}>+</button>
      </div>

      <button className="piyumal__add-to-cart-button" onClick={handleAddToCart}>
        ADD TO CART
      </button>

      {showConfirmBox && (
        <div className="piyumal__confirm-box">
          <div className="piyumal__confirm-box-content">
            <h2>{item.itemName}</h2>
            <p>Price per unit: LKR {item.itemPrice}.00</p>
            <p>
              <b>Item Added Successfully ✅</b>
            </p>
            <div className="piyumal__confirm-box-actions">
              <button onClick={handleContinueShopping}>
                Continue Shopping
              </button>
              <button onClick={handleViewCart}>View Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemPreview;
