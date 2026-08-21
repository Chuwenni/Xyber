import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useApp } from "../../Context/appContext";
import { useToast } from "../../Context/ToastContext";
import useErrorHandler from "../../hooks/useErrorHandler";

export default function ProductView() {
    const { productId } = useParams();
    const { server } = useApp();
    const { showLoading, hideLoading } = useToast();
    const { handle } = useErrorHandler();
    const [product, setProduct] = useState(null);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            showLoading("Loading Product...");

            try {
                const response = await axios.get(`${server}/getProduct/${productId}`, {
                    withCredentials: true
                });

                setProduct(response.data?.product);
            } catch (error) {
                handle(error, "toast");
            } finally {
                hideLoading();
            }
        };

        fetchProduct();
    }, [productId, server]);

    if (!product) {
        return (
            <div className="product-view-page">
                <div className="product-view-container">
                    <Link to="/home" className="back-link">
                        ← Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    const stock = product.stocks ?? product.stock ?? 0;

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
                            {stock} items available
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
                                            Math.min(stock, value + 1)
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
