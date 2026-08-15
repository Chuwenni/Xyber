import { Link } from "react-router-dom";

const ShopCard = ({ shop }) => {

    return (
        <div className="shop-container">
            <div className="shop-grid">
                <div className="shop-card" key={shop.id}>
                    <div className="shop-card-logo">
                        <img src={shop.image.image} alt="shopImage" />
                    </div>

                    <div className="shop-card-content">
                        <h2>{shop.shopName}</h2>
                        <p>{shop.ShopDescription}</p>

                        <div className="shop-card-meta">
                            <span>Sales: {shop.sales}</span>
                            <span>⭐ {shop.rating}</span>
                        </div>

                        <Link
                            to={`/home/shops/${shop.id}`}
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