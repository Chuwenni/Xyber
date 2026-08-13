import { useState } from "react";

export default function CreateProduct() {

    const [product, setProduct] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: ""
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(product);
        console.log(image);
    };

    return (
        <div className="create-product-page">

            <div className="create-product-card">

                <h1>Add New Product</h1>

                <form onSubmit={handleSubmit}>

                    <div className="image-upload">

                        <img
                            src={
                                preview ||
                                "https://placehold.co/500x300/E0E0E0/666?text=Product+Image"
                            }
                            alt=""
                            className="product-preview"
                        />

                        <label
                            htmlFor="productImage"
                            className="upload-image-btn"
                        >
                            Upload Product Image
                        </label>

                        <input
                            hidden
                            id="productImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                        />

                    </div>

                    <div className="form-group">
                        <label>Product Name</label>

                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            name="description"
                            rows="5"
                            value={product.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="row">

                        <div className="form-group">
                            <label>Category</label>

                            <select
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option>Electronics</option>
                                <option>Fashion</option>
                                <option>Food</option>
                                <option>Home</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Price</label>

                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="form-group">

                        <label>Stock Quantity</label>

                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button type="submit">
                        Create Product
                    </button>

                </form>

            </div>

        </div>
    );
}