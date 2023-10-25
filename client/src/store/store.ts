import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../http/create-api';
import { gameDataSlice } from './slices/game-data-slice/game-data-slice';

const api = createApi();

export const store = configureStore({
  reducer: {
    [gameDataSlice.name]: gameDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
