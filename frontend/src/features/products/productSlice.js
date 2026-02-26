import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/client';

export const fetchProducts = createAsyncThunk('products/fetch', async (params) => {
  const { data } = await api.get('/products', { params });
  return data;
});

export const fetchFeatured = createAsyncThunk('products/featured', async () => {
  const { data } = await api.get('/products/featured');
  return data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: { products: [], featured: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchFeatured.fulfilled, (state, action) => {
      state.featured = action.payload;
    });
  }
});

export default productSlice.reducer;
