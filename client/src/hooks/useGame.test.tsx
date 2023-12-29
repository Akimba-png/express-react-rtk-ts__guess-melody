import { useGame } from './useGame';
import { RootState } from '../store/store';
import { generateGenreQuestion } from '../utils/mock';
import { renderHookWithProviders } from './../utils/test-utils';
import { LoadingStatus } from '../constants/const';

const initialState: RootState = {
  gameData: {
    questions: [],
    loadingStatus: LoadingStatus.Idle,
    error: '',
  },
  gameProcess: {
    step: 0,
    errorCount: 0,
  },
};

describe('Custom hook useGame', () => {
  let preloadedState: RootState;
  beforeEach(() => {
    preloadedState = JSON.parse(JSON.stringify(initialState));
  });

  it('should return isLoading true on loading status pending', () => {
    preloadedState.gameData.loadingStatus = LoadingStatus.Pending;
    const {result} = renderHookWithProviders(useGame, {preloadedState});
    expect(result.current).toEqual([true, true, false, 0]);
  });

  it('should return win true on player win', () => {
    preloadedState.gameData.questions = [generateGenreQuestion()];
    preloadedState.gameProcess.step = 1;
    const {result} = renderHookWithProviders(useGame, {preloadedState});
    expect(result.current).toEqual( [false, true, false, 1] );
  });

  it('should return isFail true on player fail', () => {
    preloadedState.gameProcess.errorCount = 3;
    preloadedState.gameData.questions = [generateGenreQuestion()];
    const { result } = renderHookWithProviders(useGame, {preloadedState});
    expect(result.current).toEqual( [false, false, true, 0] );
  });
});
