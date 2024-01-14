import { type ActionReducerMapBuilder, type PayloadAction } from '@reduxjs/toolkit';
import { type AxiosError, type AxiosResponse } from 'axios';
import { UserAuthState } from '../slices/user-auth-slice/user-auth-slice';
import { type RegData, type User } from '../../models/user';
import { createAppAsyncThunk } from './../create-app-async-thunk';
import { ApiRoute, AuthStatus, LoadingStatus } from '../../constants/const';

export const signup = createAppAsyncThunk<User, RegData>(
  'user/signup',
  async (regData, {extra, rejectWithValue}) => {
    try {
      const user = await extra.post<RegData, AxiosResponse<User>>(
        ApiRoute.Signup, regData
      );
      return user.data;
    } catch (error: unknown) {
      const e = error as AxiosError<{message: string}>;
      if (e.response) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  }
);

export const createSignupReducer = (
  builder: ActionReducerMapBuilder<UserAuthState>
) => {
  builder.addCase(signup.pending, (state) => {
    state.error = '';
    state.loadingStatus = LoadingStatus.Pending;
  });
  builder.addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
    state.loadingStatus = LoadingStatus.Idle;
    state.authStatus = AuthStatus.Auth;
    state.user = action.payload;
  });
  builder.addCase(signup.rejected, (state, action) => {
    state.loadingStatus = LoadingStatus.Idle;
    if (action.payload) {
      state.error = action.payload;
    } else {
      state.error = 'something goes wrong';
    }
  });
};
