import type { RootState } from './store';

export const getQuestion = (state: RootState) => {
  const step = state.gameProcess.step;
  return state.gameData.questions[step];
};
