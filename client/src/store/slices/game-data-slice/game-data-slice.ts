import { createSlice } from '@reduxjs/toolkit';
import { Questions } from './../../../models/data';
import { LoadingStatus } from '../../../constants/const';

type GameDataState = {
  questions: Questions;
  loadingStatus: LoadingStatus;
  error: string;
};

const gameDataState: GameDataState = {
  questions: [],
  loadingStatus: LoadingStatus.Idle,
  error: '',
};

export const gameDataSlice = createSlice({
  name: 'gameData',
  initialState: gameDataState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder.addCase();
  // },
});
