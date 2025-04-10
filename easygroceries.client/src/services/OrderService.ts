import axios from 'axios';
import { Order } from '../models/Order';

const API_URL = 'http://localhost:5272/api';

export const getProducts = async () => {
    const response = await axios.get(`${API_URL}/order/getProducts`);
    console.log(response.data);
    return response.data;
}

export const placeOrder = async (order:Order) => {
    const response = await axios.post(`${API_URL}/order/checkout`, order);
    console.log(response.data);
    return response.data;
}