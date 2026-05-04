import { create } from 'zustand';

const useCartStore = create((set) => ({
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    
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
    })
}));

export default useCartStore;