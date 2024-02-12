import { AxiosError } from 'axios';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../create-app-async-thunk';
import { UserAuthState } from '../slices/user-auth-slice/user-auth-slice';
import { User } from '../../models/user';
import { ApiRoute, AuthStatus, LoadingStatus } from '../../constants/const';

export const checkAuth = createAppAsyncThunk<User>(
  'auth/checkAuth',
  async (_, { extra, rejectWithValue }) => {
    try {
      const response = await extra.get<User>(ApiRoute.Login);
      return response.data;
    } catch (error) {
      const e = error as AxiosError<{message: string}>;
      if (e.response) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  }
);

export const createCheckAuthReducer = (
  builder: ActionReducerMapBuilder<UserAuthState>
) => {
  builder.addCase(checkAuth.pending, (state) => {
    state.loadingStatus = LoadingStatus.Pending;
    state.error = '';
  });
  builder.addCase(checkAuth.fulfilled, (state, action) => {
    state.loadingStatus = LoadingStatus.Idle;
    state.authStatus = AuthStatus.Auth;
    state.user = action.payload;
  });
  builder.addCase(checkAuth.rejected, (state, action) => {
    state.loadingStatus = LoadingStatus.Idle;
    state.authStatus = AuthStatus.NotAuth;
    if (action.payload) {
      state.error = action.payload;
    } else {
      state.error = 'something goes wrong';
    }
  });
};
