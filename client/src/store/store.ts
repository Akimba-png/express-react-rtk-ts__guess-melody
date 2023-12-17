import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createApi } from '../http/create-api';
import { gameDataSlice } from './slices/game-data-slice/game-data-slice';
import { gameProcessSlice } from './slices/game-process-slice/game-process-slice';

const api = createApi();

const rootReducer = combineReducers({
  [gameDataSlice.name]: gameDataSlice.reducer,
  [gameProcessSlice.name]: gameProcessSlice.reducer,
});

export const setupStore = (preloadedState: Partial<RootState> = {}) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
