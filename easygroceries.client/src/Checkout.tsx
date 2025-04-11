import React, { useState } from 'react';
import { CartItem, ShippingInfo, Order, ShippingSlip } from './models/Order';
import { placeOrder } from './services/OrderService';
import './App.css';

const Checkout: React.FC<{
    cartItems: CartItem[];
    onBack: () => void;
    onOrderPlaced: (shippingSlip: any) => void;
}> = ({ cartItems, onBack, onOrderPlaced }) => {
    const [shippingDetails, setShippingDetails] = useState<ShippingInfo>({
        name: '',
        address: '',
        city: '',
        pinCode: '',
        mobileNo: ''
    });
    const [hasLoyaltyMembership, setHasLoyaltyMembership] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const discount = hasLoyaltyMembership ? subtotal * 0.2 : 0;
    const loyaltyCost = hasLoyaltyMembership ? 5 : 0;
    const total = subtotal - discount + loyaltyCost;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const order: Order = {
            cartItems,
            hasLoyaltyMembership,
            shippingDetails,
        };

        try {
            const response = await placeOrder(order);
            console.log(response.data);
            onOrderPlaced(response.data);
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
                    cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                    cartItems.map(item => (
                        <div key={`${item.productId}-${item.productName}`} className="order-item" >
                            <span>{item.productName} "{item.description}" </span>
                            < span > Qty: {item.quantity} </span>
                            <span>&pound;{(item.totalPrice).toFixed(2)} </span>
                        </div>
                    )
                    ))}
                <div className="order-totals" >
                    <div>Subtotal: &pound;{subtotal.toFixed(2)} </div>
                    {
                        hasLoyaltyMembership && (
                            <>
                                <div>Discount(20 %): -�{discount.toFixed(2)} </div>
                                < div > Loyalty Membership: &pound;5.00 </div>
                            </>
                        )
                    }
                    <div className="total" > Total: &pound;{total.toFixed(2)} </div>
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
                        Add EasyGroceries loyalty membership(&pound;5)
                    </label>
                </div>

                < h3 > Shipping Information </h3>
                < div className="form-group" >
                    <label>Name: </label>
                    < input
                        type="text"
                        value={shippingDetails.name}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                        required
                    />
                </div>
                < div className="form-group" >
                    <label>Address: </label>
                    < input
                        type="text"
                        value={shippingDetails.address}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                        required
                    />
                </div>
                < div className="form-group" >
                    <label>City: </label>
                    < input
                        type="text"
                        value={shippingDetails.city}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                        required
                    />
                </div>
                < div className="form-group" >
                    <label>Pin Code: </label>
                    < input
                        type="text"
                        value={shippingDetails.pinCode}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, pinCode: e.target.value })}
                        required
                    />
                </div>
                < div className="form-group" >
                    <label>Mobile Number: </label>
                    < input
                        type="text"
                        value={shippingDetails.mobileNo}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, mobileNo: e.target.value })}
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