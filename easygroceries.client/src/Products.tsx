import React, { useState, useEffect } from 'react';
import { Product } from './models/Product';
import { getProducts } from './services/OrderService';
import './App.css';

const Products: React.FC<{ onAddToCart: (product: Product, quantity: number) => void }> = ({ onAddToCart }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts();
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const handleQuantityChange = (productId: number, value: string) => {
        const quantity = parseInt(value) || 0;
        setQuantities({ ...quantities, [productId]: quantity });
    };

    return (
        <div className="product-list" >
            <h2>Our Products </h2>
            {
                products.map(product => (
                    <div key={product.id} className="product-card" >
                        <h3>{product.name} </h3>
                        < p > {product.description} </p>
                        <p>£{product.price.toFixed(2)} </p>
                        < div className="quantity-control" >
                            <input
                                type="number"
                                min="0"
                                value={quantities[product.id] || 0}
                                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                            />
                            < button onClick={() => onAddToCart(product, quantities[product.id] || 1)}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Products;