import { createSlice } from '@reduxjs/toolkit';
import { type User } from '../../../models/user';
import { AuthStatus, LoadingStatus } from '../../../constants/const';
import { createSignupReducer } from '../../thunk-actions/signup';

export type UserAuthState = {
  user: User;
  authStatus: AuthStatus;
  loadingStatus: LoadingStatus;
  error: string;
}

const userAuthState: UserAuthState = {
  user: {
    id: '',
    name: '',
    email: '',
    accessToken: '',
  },
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
  },
});
