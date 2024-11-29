import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import tokenReducer from './slices/tokenSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    token: tokenReducer, // Aquí agregamos el reducer de `token` al store
    user: userSlice,
  },
});

export default store;