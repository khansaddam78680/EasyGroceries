export interface CartItem {
    productId: number;
    productName: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface ShippingInfo {
    name: string;
    address: string;
    city: string;
    pinCode: string;
    mobileNo: string;
}

export interface Order {
    items: CartItem[];
    hasLoyaltyMembership: boolean;
    shippingInfo: ShippingInfo;
}

export interface ShippingSlip {
    customerId: number;
    orderNumber: number;
    cartItems: CartItem[];
    shippingInfo: ShippingInfo;
}