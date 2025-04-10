import React, { useState } from 'react';
import { CartItem, ShippingInfo, Order } from './models/Order';
import { placeOrder } from './services/OrderService';
import './App.css';

const Checkout: React.FC<{
    items: CartItem[];
    onBack: () => void;
    onOrderPlaced: (shippingSlip: any) => void;
}> = ({ items, onBack, onOrderPlaced }) => {
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        name: '',
        address: '',
        city: '',
        pinCode: '',
        mobileNo: ''
    });
    const [hasLoyaltyMembership, setHasLoyaltyMembership] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const discount = hasLoyaltyMembership ? subtotal * 0.2 : 0;
    const loyaltyCost = hasLoyaltyMembership ? 5 : 0;
    const total = subtotal - discount + loyaltyCost;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const order: Order = {
            items,
            hasLoyaltyMembership,
            shippingInfo,
        };

        try {
            const response = await placeOrder(order);
            onOrderPlaced(response);
        } catch (error) {
            console.error('Order failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="checkout" >
            <h2>Checkout </h2>
            < div className="order-summary" >
                <h3>Your Order </h3>
                {
                    items.map(item => (
                        <div key={`${item.productId}-${item.productName}`} className="order-item" >
                            <span>{item.productName} "{item.description}" </span>
                            < span > Qty: {item.quantity} </span>
                            <span>£{(item.totalPrice).toFixed(2)} </span>
                        </div>
                    ))}
                <div className="order-totals" >
                    <div>Subtotal: £{subtotal.toFixed(2)} </div>
                    {
                        hasLoyaltyMembership && (
                            <>
                                <div>Discount(20 %): -£{discount.toFixed(2)} </div>
                                < div > Loyalty Membership: £5.00 </div>
                            </>
                        )
                    }
                    <div className="total" > Total: £{total.toFixed(2)} </div>
                </div>
            </div>

            < form onSubmit={handleSubmit} >
                <div className="form-group" >
                    <label>
                        <input
                            type="checkbox"
                            checked={hasLoyaltyMembership}
                            onChange={(e) => setHasLoyaltyMembership(e.target.checked)}
                        />
                        Add EasyGroceries loyalty membership(£5)
                    </label>
                </div>

                < h3 > Shipping Information </h3>
                < div className="form-group" >
                    <label>Name: </label>
                    < input
                        type="text"
                        value={shippingInfo.name}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                        required
                    />
                </div>
                < div className="form-group" >
                    <label>Address: </label>
                    < input
                        type="text"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        required
                    />
                </div>
                < div className="form-group" >
                    <label>City: </label>
                    < input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        required
                    />
                </div>
                < div className="form-group" >
                    <label>Pin Code: </label>
                    < input
                        type="text"
                        value={shippingInfo.pinCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, pinCode: e.target.value })}
                        required
                    />
                </div>
                < div className="form-group" >
                    <label>Mobile Number: </label>
                    < input
                        type="text"
                        value={shippingInfo.pinCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, mobileNo: e.target.value })}
                        required
                    />
                </div>

                < div className="checkout-actions" >
                    <button type="button" onClick={onBack} > Back to Shopping </button>
                    < button type="submit" disabled={isSubmitting} >
                        {isSubmitting ? 'Processing...' : 'Place Order'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;