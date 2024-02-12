import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createApi } from '../http/create-api';
import { gameDataSlice } from './slices/game-data-slice/game-data-slice';
import { gameProcessSlice } from './slices/game-process-slice/game-process-slice';
import { clientLogout, userAuthSlice } from './slices/user-auth-slice/user-auth-slice';

const rootReducer = combineReducers({
  [gameDataSlice.name]: gameDataSlice.reducer,
  [gameProcessSlice.name]: gameProcessSlice.reducer,
  [userAuthSlice.name]: userAuthSlice.reducer,
});

export const setupStore = (
  preloadedState: Partial<RootState> = {},
) => {
  const api = createApi(() => store.dispatch(clientLogout()));
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
    preloadedState,
  });
  return store;
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
