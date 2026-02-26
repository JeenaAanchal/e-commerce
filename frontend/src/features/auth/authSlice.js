import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/client';

const saved = JSON.parse(localStorage.getItem('userInfo') || 'null');

export const login = createAsyncThunk('auth/login', async (payload) => {
  const { data } = await api.post('/auth/login', payload);
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
});

export const register = createAsyncThunk('auth/register', async (payload) => {
  const { data } = await api.post('/auth/register', payload);
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { userInfo: saved },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
