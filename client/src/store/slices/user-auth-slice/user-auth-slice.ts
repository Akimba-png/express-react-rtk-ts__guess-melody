import { createSlice } from '@reduxjs/toolkit';
import { type User } from '../../../models/user';
import { AuthStatus, LoadingStatus } from '../../../constants/const';
import { createSignupReducer } from '../../thunk-actions/signup';
import { createLoginReducer } from '../../thunk-actions/login';
import { createLogoutReducer } from '../../thunk-actions/logout';
import { createCheckAuthReducer } from '../../thunk-actions/check-auth';

export type UserAuthState = {
  user: User;
  authStatus: AuthStatus;
  loadingStatus: LoadingStatus;
  error: string;
};

export const DEFAULT_USER: User = {
  id: '',
  name: '',
  email: '',
  accessToken: '',
};

const userAuthState: UserAuthState = {
  user: DEFAULT_USER,
  authStatus: AuthStatus.Unknown,
  loadingStatus: LoadingStatus.Idle,
  error: '',
};

export const userAuthSlice = createSlice({
  name: 'userAuthSlice',
  initialState: userAuthState,
  reducers: {},
  extraReducers: (builder) => {
    createSignupReducer(builder);
    createLoginReducer(builder);
    createLogoutReducer(builder);
    createCheckAuthReducer(builder);
  },
});
