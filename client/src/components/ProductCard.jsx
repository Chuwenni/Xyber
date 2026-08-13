const Products = ({product}) => {

  return (
    <div className='products'>
      <div className="product-card">

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

          <button className="product-button">
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  )
}

export default Products