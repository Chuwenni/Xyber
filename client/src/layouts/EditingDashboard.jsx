import { useState } from "react";
import { useApp } from "../Context/appContext"
import { useToast } from "../Context/ToastContext";
import axios from "axios"

export default function EditProfile() {

    const { user, fetchUser, setUser, server} = useApp();

    const { showToast } = useToast();

    const [username, setUsername] = useState(user.username);

    const [preview, setPreview] = useState(user.profile);

    const [image, setImage] = useState(null);

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
        try{
            const response = await axios.post(`${server}/imageUpload`, 
             form,
             {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
             }
            )

            await fetchUser()

            showToast(response.data.message, response.data.type);
        }catch(error){
            showToast(error.message, "error")
        }
    };

    return (

        <div className="edit-profile-page">

            <div className="edit-profile-card">

                <h1>Edit Profile</h1>

                <form onSubmit={handleSubmit}>

                    <div className="image-section">

                        <img
                            src={
                                preview ||
                                user.profile
                            }
                            alt="Profile"
                            className="profile-preview"
                        />

                        <label
                            htmlFor="profileImage"
                            className="upload-btn"
                        >
                            Change Photo
                        </label>

                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                        />

                    </div>

                    <div className="form-group">

                        <label>Username</label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                        />

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            value={user.email}
                            disabled
                        />

                    </div>

                    <button type="submit">
                        Save Changes
                    </button>

                </form>

            </div>

        </div>

    );
}