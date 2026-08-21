import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useApp } from "../Context/appContext"
import { useErrorHandler} from "../hooks/useErrorHandler"
import axios from "axios"
const Products = () => {

    const [products, setProducts] = useState([{}]);
    const { server } = useApp();
    const { handle } = useErrorHandler();

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${server}/getProducts`, {
                withCredentials: true
            })
            setProducts(response.data.products)
        } catch (error) {
            handle(error, "toast")
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div className="products-container">

            {products.map((element) => (
                <ProductCard
                    product={element}
                    key={element?._id || element?.id}
                />
            ))}

        </div>
    );
};

export default Products;