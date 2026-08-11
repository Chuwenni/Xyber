import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useApp } from "../Context/appContext";
import { useToast } from "../Context/ToastContext";
export default function CreateShop() {

    const [shopName, setShopName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const { server } = useApp();
    const { showToast, fetchUser } = useToast();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setPreview(URL.createObjectURL(file));
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();

        form.append("image", image)
        form.append("name", shopName)
        form.append("desc", description)

        try {
            const response = await axios.post(`${server}/newShop`,
                form,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )

            await fetchUser();

            showToast(response.data.message, response.data.type)
            
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="create-shop-page">

            <div className="create-shop-card">

                <div className="create-shop-header">
                    <h1>Create Your Shop</h1>
                    <p>
                        Set up your shop and start selling your products.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="shop-image-section">

                        <div className="shop-image-preview">

                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Shop preview"
                                />
                            ) : (
                                <span>🏪</span>
                            )}

                        </div>

                        <div className="shop-image-actions">

                            <label
                                htmlFor="shopImage"
                                className="upload-shop-btn"
                            >
                                Upload Shop Image
                            </label>

                            <input
                                id="shopImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                hidden
                            />

                            <p>
                                Recommended size: 500 × 500px
                            </p>

                        </div>

                    </div>

                    <div className="form-group">

                        <label htmlFor="shopName">
                            Shop Name
                        </label>

                        <input
                            id="shopName"
                            type="text"
                            value={shopName}
                            onChange={(e) =>
                                setShopName(e.target.value)
                            }
                            placeholder="Enter your shop name"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="shopDescription">
                            Shop Description
                        </label>

                        <textarea
                            id="shopDescription"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="Tell customers about your shop"
                            rows="6"
                            required
                        />

                    </div>

                    <div className="create-shop-actions">

                        <Link
                            to="/home/myShop"
                            className="cancel-shop-btn"
                        >
                            Cancel
                        </Link>

                        <button type="submit">
                            Create Shop
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}