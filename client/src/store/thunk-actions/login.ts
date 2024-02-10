import { AxiosError } from 'axios';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../create-app-async-thunk';
import { UserAuthState } from '../slices/user-auth-slice/user-auth-slice';
import { tokenService } from '../../services/token-service';
import { Credentials, User } from '../../models/user';
import { ApiRoute, AuthStatus, LoadingStatus } from '../../constants/const';

export const login = createAppAsyncThunk<User, Credentials>(
  'auth/login', async (
  credentials: Credentials, { extra, rejectWithValue }
) => {
  try {
    const response = await extra.post<User>(ApiRoute.Login, credentials);
    return response.data;
  } catch (error) {
    const e = error as AxiosError<{message: string}>;
    if (e.response) {
      return rejectWithValue(e.response.data.message);
    }
    return rejectWithValue(e.message);
  }
});

export const createLoginReducer = (
  builder: ActionReducerMapBuilder<UserAuthState>
) => {
  builder.addCase(login.pending, (state) => {
    state.loadingStatus = LoadingStatus.Pending;
    state.error = '';
  });
  builder.addCase(login.fulfilled, (state, action) => {
    state.loadingStatus = LoadingStatus.Idle;
    state.authStatus = AuthStatus.Auth;
    state.user = action.payload;
    tokenService.setToken(action.payload.accessToken);
  });
  builder.addCase(login.rejected, (state, action) => {
    state.loadingStatus = LoadingStatus.Idle;
    if (action.payload) {
      state.error = action.payload;
    }
  });
}
