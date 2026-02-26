import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/client';

export const toggleWishlist = createAsyncThunk('wishlist/toggle', async (productId) => {
  const { data } = await api.patch('/auth/wishlist', { productId });
  return data.wishlist;
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { ids: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleWishlist.fulfilled, (state, action) => {
      state.ids = action.payload;
    });
  }
});

export default wishlistSlice.reducer;
