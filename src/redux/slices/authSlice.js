import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    authenticate: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

// Exportar las acciones
export const { authenticate, logout } = authSlice.actions;

// Exportar el reductor
export default authSlice.reducer;
