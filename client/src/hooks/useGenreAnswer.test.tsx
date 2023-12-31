import { act } from 'react-dom/test-utils';
import { renderHookWithProviders } from '../utils/test-utils';
import { RootState } from '../store/store';
import {
  type Variant,
  useGenreAnswer,
} from './useGenreAnwer';
import { LoadingStatus } from '../constants/const';

const initialState: RootState = {
  gameData: {
    loadingStatus: LoadingStatus.Idle,
    questions: [],
    error: '',
  },
  gameProcess: {
    step: 0,
    errorCount: 0,
  },
};

const variants: Variant[] = [
  {src: 'src-one', genre: 'reggae'},
  {src: 'src-second', genre: 'rock'},
];

describe('Hook useGenreAnswer', () => {
  let preloadedState: RootState;
  beforeEach(() => {
    preloadedState = JSON.parse(JSON.stringify(initialState));
  });

  it('should return object', () => {
    const { result } = renderHookWithProviders(
      ({correctValue, variants}) => useGenreAnswer(correctValue, variants),
      {
        preloadedState,
        initialProps: { correctValue: 'reggae', variants},
      }
    );
    expect(result.current).toBeTypeOf('object');
  });

  it('should increment step on right answer', () => {
    const { result, store } = renderHookWithProviders(
      ({correctValue, variants}) => useGenreAnswer(correctValue, variants),
      {
        preloadedState,
        initialProps: { correctValue: 'reggae', variants},
      }
    );
    const [answerHandler, submitHandler] = result.current;
    act(() => answerHandler(0));
    act(() => submitHandler());
    expect(store.getState().gameProcess.step).toBe(1);
  });

  it('should increment step and mistake count on wrong answer', () => {
    const { result, store } = renderHookWithProviders(
      ({correctValue, variants}) => useGenreAnswer(correctValue, variants),
      {
        preloadedState,
        initialProps: { correctValue: 'reggae', variants},
      }
    );
    const [answerHandler, submitHandler] = result.current;
    act(() => answerHandler(1));
    act(() => submitHandler());
    expect(store.getState().gameProcess.errorCount).toBe(1);
    expect(store.getState().gameProcess.step).toBe(1);
  });
});
