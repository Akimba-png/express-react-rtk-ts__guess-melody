import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../http/create-api';

const api = createApi();

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  })
});
