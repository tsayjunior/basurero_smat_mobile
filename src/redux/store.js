import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import tokenReducer from './slices/tokenSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    token: tokenReducer, // Aquí agregamos el reducer de `token` al store
  },
});

export default store;