import { Link } from "react-router-dom";

const ShopCard = ({ shop }) => {
    const shopId = shop?._id?.toString?.() || shop?._id || shop?.id || "";

    return (
        <div className="shop-container">
            <div className="shop-grid">
                <div className="shop-card" data-shop-id={shopId}>
                    <div className="shop-card-logo">
                        {shop.image && <img src={shop.image.image || shop.image} alt={`${shop.shopName} logo`} />}
                    </div>

                    <div className="shop-card-content">
                        <h2>{shop.shopName}</h2>
                        <p>{shop.shopDescription}</p>

                        <div className="shop-card-meta">
                            <span>Sales: {shop.sales}</span>
                            <span>⭐ {shop.rating}</span>
                        </div>

                        <Link
                            to={`/home/shops/${shopId}`}
                            className="dashboard-link"
                        >
                            View Shop
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopCard