import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_id: null,
    points: 0,
  },
  reducers: {
    setUser: (state, action) => {
      state.user_id = action.payload.user_id;
      state.points = action.payload.points;
    },
    clearUser: (state) => {
      state.user_id = null;
      state.points = 0;
    },
    updatePoints: (state, action) => {
      state.points = action.payload; // Actualiza solo los puntos
    },
    updateUser: (state, action) => {
      state.user_id = action.payload; // Actualiza solo los puntos
    },
  },
});

// Exportar las acciones
export const { setUser, clearUser, updatePoints, updateUser } = userSlice.actions;

// Exportar el reductor
export default userSlice.reducer;
