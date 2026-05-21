import { create } from 'zustand';
import toast from 'react-hot-toast';

const useWishlistStore = create((set, get) => ({
    wishlistItems: localStorage.getItem('wishlistItems') 
        ? JSON.parse(localStorage.getItem('wishlistItems')) 
        : [],

    addToWishlist: (item) => {
        const currentItems = get().wishlistItems;
        const existItem = currentItems.find((x) => x._id === item._id);

        if (!existItem) {
            const updatedWishlist = [...currentItems, item];
            set({ wishlistItems: updatedWishlist });
            localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
            toast.success('Added to Wishlist ❤️');
        } else {
            toast.error('Item is already in Wishlist');
        }
    },

    removeFromWishlist: (id) => {
        const updatedWishlist = get().wishlistItems.filter((x) => x._id !== id);
        set({ wishlistItems: updatedWishlist });
        localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
        toast.success('Removed from Wishlist 💔');
    }
}));

export default useWishlistStore;