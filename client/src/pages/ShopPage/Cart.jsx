import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState([
        {
            id: 1,
            name: "Wireless Headphones",
            price: 1299,
            quantity: 1,
            image: "https://placehold.co/300x300/E0E0E0/666?text=Product"
        },
        {
            id: 2,
            name: "Mechanical Keyboard",
            price: 2499,
            quantity: 2,
            image: "https://placehold.co/300x300/E0E0E0/666?text=Product"
        }
    ]);

    const updateQuantity = (id, amount) => {
        setCart((current) =>
            current
                .map((item) => {
                    if (item.id !== id) {
                        return item;
                    }

                    return {
                        ...item,
                        quantity: Math.max(1, item.quantity + amount)
                    };
                })
        );
    };

    const removeItem = (id) => {
        setCart((current) => current.filter((item) => item.id !== id));
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="page-header">
                    <h1>My Cart</h1>
                    <p>Review the products you want to purchase.</p>
                </div>

                {cart.length === 0 ? (
                    <div className="empty-state">
                        <h2>Your cart is empty</h2>
                        <p>Add some products to your cart to get started.</p>

                        <Link to="/home" className="dashboard-link">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="cart-layout">
                        <div className="cart-items">
                            {cart.map((item) => (
                                <div className="cart-item" key={item.id}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />

                                    <div className="cart-item-info">
                                        <h2>{item.name}</h2>
                                        <p>₱{item.price.toLocaleString()}</p>

                                        <div className="cart-item-actions">
                                            <div className="quantity-control">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, -1)
                                                    }
                                                >
                                                    -
                                                </button>

                                                <span>{item.quantity}</span>

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, 1)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                className="remove-button"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    <strong className="cart-item-total">
                                        ₱{(item.price * item.quantity).toLocaleString()}
                                    </strong>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h2>Order Summary</h2>

                            <div className="summary-row">
                                <span>Items</span>
                                <span>{cart.length}</span>
                            </div>

                            <div className="summary-row summary-total">
                                <span>Total</span>
                                <strong>₱{total.toLocaleString()}</strong>
                            </div>

                            <button className="checkout-button">
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
