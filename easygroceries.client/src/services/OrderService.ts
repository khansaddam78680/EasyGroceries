import axios from 'axios';
import { Order } from '../models/Order';

const API_URL = 'http://localhost:5272/api';

const api = axios.create({
    baseURL: API_URL,
});

export const getProducts = () => {
    const response = api.get('/order/getProducts');
    return response;
}

export const placeOrder = (order:Order) => {
    const response = api.post('/order/checkout', order);
    return response;
}