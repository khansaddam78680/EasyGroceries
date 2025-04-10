import React from 'react';
import { ShippingSlip } from './models/Order';
import './App.css';

const ShippingSlipComponent: React.FC<{ slip: ShippingSlip; onNewOrder: () => void }> = ({ slip, onNewOrder }) => {
    return (
        <div className="shipping-slip" >
            <h2>Order Confirmation </h2>
            <div className="slip-details" >
                <p>Customer: {slip.customerId} </p>
                <p> Order number: {slip.orderNumber} </p>
            </div>

            <h3> Items to be shipped: </h3>
            <ul className="shipping-items" >
                {
                    slip.cartItems.map(item => (
                        <li key={`${item.productId}-${item.productName}`} >
                            {item.productName} "{item.description}" – Qty: {item.quantity}
                        </li>
                    ))}
            </ul>

            <button onClick={onNewOrder} > Start New Order </button>
        </div>
    );
};

export default ShippingSlipComponent;