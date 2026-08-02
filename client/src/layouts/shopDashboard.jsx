import { Link } from "react-router-dom";
import { useState, useEffect} from "react"
import "./ShopDashboard.css";

export default function ShopDashboard() {

    const [shop, setShop] = useState(fetchShop() | null)

    // const shop = {
    //     name: "Tech Haven",
    //     description: "Affordable gadgets and accessories.",
    //     followers: 1254,
    //     sales: 3842,
    //     rating: 4.9,
    //     products: 120,
    //     logo: ""
    // };

    useEffect(()=> {
        const fetchShop = async () => {
            const response
        }
    }, [])

    return (
        <div className="shop-dashboard-page">

            <div className="shop-dashboard">

                <div className="shop-header">

                    <div className="shop-logo">
                        {shop.logo
                            ? <img src={shop.logo} alt="" />
                            : <span>🏪</span>}
                    </div>

                    <div className="shop-info">

                        <h1>{shop.name}</h1>

                        <p>{shop.description}</p>

                        <div className="shop-meta">
                            <span>⭐ {shop.rating}</span>
                            <span>👥 {shop.followers} Followers</span>
                            <span>📦 {shop.sales} Sales</span>
                        </div>

                        <Link
                            to="/home/shop/edit"
                            className="edit-shop-btn"
                        >
                            Edit Shop
                        </Link>

                    </div>

                </div>

                <div className="shop-stats">

                    <div className="stat-card">
                        <h2>{shop.followers}</h2>
                        <p>Followers</p>
                    </div>

                    <div className="stat-card">
                        <h2>{shop.sales}</h2>
                        <p>Total Sales</p>
                    </div>

                    <div className="stat-card">
                        <h2>{shop.rating}</h2>
                        <p>Rating</p>
                    </div>

                    <div className="stat-card">
                        <h2>{shop.products}</h2>
                        <p>Products</p>
                    </div>

                </div>

                <div className="shop-actions">

                    <Link
                        to="/home/shop/products"
                        className="secondary-btn"
                    >
                        Manage Products
                    </Link>

                    <Link
                        to="/home/shop/add-product"
                        className="primary-btn"
                    >
                        Add New Product
                    </Link>

                </div>

            </div>

        </div>
    );
}