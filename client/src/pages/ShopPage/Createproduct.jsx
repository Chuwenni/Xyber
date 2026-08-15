import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useToast } from "../../Context/ToastContext"
import { useApp } from "../../Context/appContext"
import { useErrorHandler } from "../../hooks/useErrorHandler"
import axios from "axios"
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
    const { server } = useApp()
    const { showModal } = useToast();
    const { handle } = useErrorHandler();
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            showModal("Please Select an Image for The Products", "ok", "warning")
            return
        }

        const form = new FormData();

        form.append("name", product.name);
        form.append("description", product.description);
        form.append("category", product.category);
        form.append("price", product.price);
        form.append("stock", product.stock);
        form.append("image", image);
        try {
            const response = await axios.post(`${server}/newProduct`,
                form,
                {
                    withCredentials: true
                })
            showModal(response.data?.message, "ok", response.data?.type)

            navigate("/home/myShop/products", { replace: true })
        } catch (error) {
            handle(error, "modal")
        }
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