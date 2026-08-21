import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import { useApp } from "../../Context/appContext";
import { useToast } from "../../Context/ToastContext";
import useErrorHandler from "../../hooks/useErrorHandler";

export default function ShopView() {
    const { shopId } = useParams();
    const { server } = useApp();
    const { showLoading, hideLoading } = useToast();
    const { handle } = useErrorHandler();
    const [shop, setShop] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchShop = async () => {
            showLoading("Loading Shop...");

            try {
                const response = await axios.get(`${server}/getShop/${shopId}`, {
                    withCredentials: true
                });

                setShop(response.data?.shop);
                setProducts(response.data?.products || []);
            } catch (error) {
                handle(error, "toast");
            } finally {
                hideLoading();
            }
        };

        fetchShop();
    }, [shopId, server]);

    if (!shop) {
        return (
            <div className="shop-dashboard-page">
                <div className="shop-dashboard">
                    <Link to="/home/shops" className="back-link">
                        ← Back to Shops
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="shop-dashboard-page">
            <div className="shop-dashboard">
                <Link to="/home/shops" className="back-link">
                    ← Back to Shops
                </Link>

                <div className="shop-header">
                    <div className="shop-logo">
                        {shop.image ? (
                            <img src={shop.image} alt={`${shop.shopName} logo`} />
                        ) : (
                            <span>🏪</span>
                        )}
                    </div>

                    <div className="shop-info">
                        <h1>{shop.shopName}</h1>
                        <p>{shop.shopDescription || "No shop description available."}</p>

                        <div className="shop-meta">
                            <span>Sales: {shop.sales ?? 0}</span>
                            <span>⭐ {shop.rating ?? 0}</span>
                            <span>Followers: {shop.follower ?? 0}</span>
                        </div>
                    </div>
                </div>

                <div className="shop-stats">
                    <div className="stat-card">
                        <h2>{products.length}</h2>
                        <p>Products</p>
                    </div>
                    <div className="stat-card">
                        <h2>{shop.sales ?? 0}</h2>
                        <p>Sales</p>
                    </div>
                    <div className="stat-card">
                        <h2>{shop.rating ?? 0}</h2>
                        <p>Rating</p>
                    </div>
                </div>

                <div className="page-header">
                    <h1>Shop Products</h1>
                    <p>Explore products from {shop.shopName}.</p>
                </div>

                {products.length > 0 ? (
                    <div className="products-container">
                        {products.map((product) => (
                            <ProductCard
                                key={product?._id || product?.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <h2>No products yet</h2>
                        <p>This shop has not added any products.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
