import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload; // Establece el token con el valor enviado
    },
    tokenNull: (state) => {
      state.token = null; // Establece el token con el valor null
    },
  },
});

// Exportar las acciones
export const { setToken, tokenNull } = tokenSlice.actions;

// Exportar el reductor
export default tokenSlice.reducer;
