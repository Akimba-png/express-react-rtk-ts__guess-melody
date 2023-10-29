import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../http/create-api';
import { gameDataSlice } from './slices/game-data-slice/game-data-slice';
import { gameProcessSlice } from './slices/game-process-slice/game-process-slice';

const api = createApi();

export const store = configureStore({
  reducer: {
    [gameDataSlice.name]: gameDataSlice.reducer,
    [gameProcessSlice.name]: gameProcessSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
