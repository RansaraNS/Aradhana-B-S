import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateItemQuantity = (itemId, quantity) => {
    setCart((prevCart) => {
      return prevCart.map((cartItem) =>
        cartItem.item._id === itemId
          ? { ...cartItem, quantity: Math.max(1, quantity) }
          : cartItem
      );
    });
  };

  const removeItemFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.item._id !== itemId)
    );
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, cartItem) => total + cartItem.item.itemPrice * cartItem.quantity,
      0
    );
  };

  const handleQuantityChange = (
    itemId,
    currentQuantity,
    change,
    availableQuantity
  ) => {
    const newQuantity = currentQuantity + change;

    if (newQuantity > availableQuantity) {
      alert(`You cannot add more than ${availableQuantity} items to the cart.`);
      return;
    }

    if (newQuantity >= 1) {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  //IsharaUpdateCheck
  const handleCheckout = () => {
    navigate('/checkout', { state: { cart } }); // Pass cart data as part of the navigation state
  };

  return (
    <div className="piyumal_wholesale">
      <h1>MY CART</h1>
      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(({ item, quantity }) => (
                <tr key={item._id}>
                  <td>
                    {item.itemPicture ? (
                      <img
                        src={item.itemPicture}
                        alt={item.itemName}
                        className="piyumal__item-photo"
                        onError={(e) => {
                          e.target.src = "default-image-url.jpg";
                        }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>{item.itemName}</td>
                  <td>LKR {item.itemPrice}</td>
                  <td>
                    <div className="piyumal__quantity-control">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            quantity,
                            -1,
                            item.itemQuantity
                          )
                        }
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            quantity,
                            1,
                            item.itemQuantity
                          )
                        }
                        disabled={quantity >= item.itemQuantity}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>LKR {item.itemPrice * quantity}</td>
                  <td>
                    <button onClick={() => removeItemFromCart(item._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">Total</td>
                <td>LKR {getCartTotal()}</td>
              </tr>
            </tfoot>
          </table>
          <div className="piyumal__cart-totals">
            <h2>Cart Totals</h2>
            <div className="piyumal__cart-total">
              <span>Total</span>
              <span>LKR {getCartTotal()}.00</span>
            </div>
            
            <button className="piyumal__checkout-button" onClick={handleCheckout}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
