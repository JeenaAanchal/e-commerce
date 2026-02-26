import { createSlice } from '@reduxjs/toolkit';

const initialItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: initialItems,
    shippingAddress: JSON.parse(localStorage.getItem('shippingAddress') || '{}')
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.cartItems.find((x) => x._id === item._id);
      if (existing) {
        existing.qty = item.qty;
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    }
  }
});

export const { addToCart, removeFromCart, saveShippingAddress, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
