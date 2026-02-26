import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/client';

export const createOrder = createAsyncThunk('orders/create', async (payload) => {
  const { data } = await api.post('/orders', payload);
  return data;
});

export const fetchMyOrders = createAsyncThunk('orders/my', async () => {
  const { data } = await api.get('/orders/my');
  return data;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: { currentOrder: null, myOrders: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.currentOrder = action.payload;
    });
    builder.addCase(fetchMyOrders.fulfilled, (state, action) => {
      state.myOrders = action.payload;
    });
  }
});

export default orderSlice.reducer;
