import { Link } from "react-router-dom";

const Products = ({product}) => {
  const productId = product?._id?.toString?.() || product?._id || product?.id || "";

  return (
    <div className='products'>
      <div
        className="product-card"
        data-product-id={productId}
      >

        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-content">

          <h3 className="product-name">
            {product.name}
          </h3>

          <p className="product-description">
            {product.description}
          </p>

          <div className="product-footer">

            <span className="product-price">
              ₱{product.price}
            </span>

            <span className="product-rating">
              ⭐ {product.rating}
            </span>

          </div>

          <Link
            to={`/home/products/${productId}`}
            className="product-button"
          >
            View Product
          </Link>

        </div>

      </div>
    </div>
  )
}

export default Products