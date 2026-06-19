import { create } from 'zustand';
import axios from 'axios';

const useCartStore = create((set, get) => ({
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
    }),

    syncCart: async () => {
        const cartItems = get().cartItems;
        if (!cartItems || cartItems.length === 0) return;
        try {
            const promises = cartItems.map((item) => axios.get(`/api/products/${item._id}`));
            const responses = await Promise.all(promises);
            
            let changed = false;
            const newCartItems = cartItems.map((item, index) => {
                const latest = responses[index].data;
                if (
                    item.price !== latest.price ||
                    item.countInStock !== latest.countInStock ||
                    item.name !== latest.name ||
                    item.image !== latest.image
                ) {
                    changed = true;
                    return {
                        ...item,
                        price: latest.price,
                        countInStock: latest.countInStock,
                        name: latest.name,
                        image: latest.image,
                    };
                }
                return item;
            });

            if (changed) {
                localStorage.setItem('cartItems', JSON.stringify(newCartItems));
                set({ cartItems: newCartItems });
            }
        } catch (error) {
            console.log("Error syncing cart: " + error.message);
        }
    }

}));

export default useCartStore;