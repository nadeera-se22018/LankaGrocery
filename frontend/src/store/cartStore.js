import { create } from 'zustand';

const useCartStore = create((set) => ({
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],

    shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},

    paymentMethod: localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : 'Cash on Delivery',

    addToCart: (item) => set((state) => {
        const existItem = state.cartItems.find((x) => x._id === item._id);
        
        let newCartItems;

        if (existItem) {
            newCartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
        } else {
            newCartItems = [...state.cartItems, item];
        }

        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        
        return { cartItems: newCartItems };
    }),

    removeFromCart: (id) => set((state) => {
        const newCartItems = state.cartItems.filter((x) => x._id !== id);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        return { cartItems: newCartItems };
    }),

    saveShippingAddress: (data) => set(() => {
        localStorage.setItem('shippingAddress', JSON.stringify(data));
        return { shippingAddress: data };
    }),

    savePaymentMethod: (data) => set(() => {
        localStorage.setItem('paymentMethod', JSON.stringify(data));
        return { paymentMethod: data };
    }),

    clearCartItems: () => set(() => {
        localStorage.removeItem('cartItems');
        return { cartItems: [] };
    })

}));

export default useCartStore;