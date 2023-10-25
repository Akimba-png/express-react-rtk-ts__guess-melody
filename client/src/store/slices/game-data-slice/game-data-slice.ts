import { createSlice } from '@reduxjs/toolkit';
import { Questions } from './../../../models/data';
import { LoadingStatus } from './../../../constants/const';
import { fetchQuestions } from './../../thunk-actions/fetch-questions';

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
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.loadingStatus = LoadingStatus.Idle;
      state.questions = action.payload;
    });
    builder.addCase(fetchQuestions.pending, (state) => {
      state.error = '';
      state.loadingStatus = LoadingStatus.Pending;
    });
    builder.addCase(fetchQuestions.rejected, (state, action) => {
      state.loadingStatus = LoadingStatus.Idle;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = 'something goes wrong';
      }
    });
  },
});
