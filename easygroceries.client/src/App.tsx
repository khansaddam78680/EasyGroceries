import React, { useState } from 'react';
import Products from './Products';
import Checkout from './Checkout';
import ShippingSlipComponent from './ShippingSlip';
import { CartItem } from './models/Order';
import './App.css';

const App: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [currentStep, setCurrentStep] = useState<'shopping' | 'checkout' | 'confirmation'>('shopping');
    const [shippingSlip, setShippingSlip] = useState<any>(null);

    const handleAddToCart = (product: any, quantity: number) => {
        if (quantity <= 0) return;

        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.productId === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                            totalPrice: (item.quantity + quantity) * item.unitPrice,
                        }
                        : item
                );
            } else {
                return [
                    ...prevCart,
                    {
                        productId: product.id,
                        productName: product.name,
                        description: product.description,
                        quantity,
                        unitPrice: product.price,
                        totalPrice: quantity * product.price,
                    },
                ];
            }
        });
    };

    const handlePlaceOrder = (slip: any) => {
        setShippingSlip(slip);
        setCurrentStep('confirmation');
        setCart([]);
    };

    const startNewOrder = () => {
        setCurrentStep('shopping');
        setShippingSlip(null);
    };

    return (
        <div className="app">
            <header>
                <h1>EasyGroceries</h1>
                <div className="cart-summary" onClick={() => setCurrentStep('checkout')}>
                    🛒 {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                </div>
            </header>

            <main>
                {currentStep === 'shopping' && (
                    <Products onAddToCart={handleAddToCart} />
                )}
                {currentStep === 'checkout' && (
                    <Checkout
                        items={cart}
                        onBack={() => setCurrentStep('shopping')}
                        onOrderPlaced={handlePlaceOrder}
                    />
                )}
                {currentStep === 'confirmation' && shippingSlip && (
                    <ShippingSlipComponent slip={shippingSlip.shippingSlip} onNewOrder={startNewOrder} />
                )}
            </main>
        </div>
    );
};

export default App;