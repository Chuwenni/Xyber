import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ProductView() {
    const { productId } = useParams();

    const [product] = useState({
        id: productId,
        name: "Wireless Headphones",
        description:
            "Comfortable wireless headphones with clear sound, long battery life, and a lightweight design.",
        price: 1299,
        rating: 4.8,
        stock: 24,
        category: "Electronics",
        image: "https://placehold.co/700x700/E0E0E0/666?text=Product"
    });

    const [quantity, setQuantity] = useState(1);

    return (
        <div className="product-view-page">
            <div className="product-view-container">
                <Link to="/home" className="back-link">
                    ← Back to Products
                </Link>

                <div className="product-view-card">
                    <div className="product-view-image">
                        <img src={product.image} alt={product.name} />
                    </div>

                    <div className="product-view-content">
                        <span className="product-category">
                            {product.category}
                        </span>

                        <h1>{product.name}</h1>

                        <div className="product-view-rating">
                            ⭐ {product.rating}
                        </div>

                        <p className="product-view-description">
                            {product.description}
                        </p>

                        <div className="product-view-price">
                            ₱{product.price.toLocaleString()}
                        </div>

                        <p className="product-stock">
                            {product.stock} items available
                        </p>

                        <div className="product-quantity">
                            <span>Quantity</span>

                            <div className="quantity-control">
                                <button
                                    onClick={() =>
                                        setQuantity((value) =>
                                            Math.max(1, value - 1)
                                        )
                                    }
                                >
                                    -
                                </button>

                                <span>{quantity}</span>

                                <button
                                    onClick={() =>
                                        setQuantity((value) =>
                                            Math.min(product.stock, value + 1)
                                        )
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button className="add-cart-button">
                            Add to Cart
                        </button>

                        <Link
                            to="/home/myCart"
                            className="view-cart-link"
                        >
                            View My Cart
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
