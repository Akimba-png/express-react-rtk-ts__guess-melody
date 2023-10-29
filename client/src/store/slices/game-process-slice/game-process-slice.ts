import { createSlice } from '@reduxjs/toolkit';

type GameProcessState = {
  step: number;
  errorCount: number;
}

const gameProcessState: GameProcessState = {
  step: 0,
  errorCount: 0,
};

export const gameProcessSlice = createSlice({
  name: 'gameProcess',
  initialState: gameProcessState,
  reducers: {
    incrementStep: (state) => {
      state.step++;
    },
    incrementErrorCount: (state) => {
      state.errorCount++;
    },
    resetGame: (state) => {
      state.step = 0;
      state.errorCount = 0;
    },
  },
});

export const {
  incrementStep,
  incrementErrorCount,
  resetGame,
} = gameProcessSlice.actions;
