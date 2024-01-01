import { act } from 'react-dom/test-utils';
import { useUserAnswer } from './useUserAnswer';
import { renderHookWithProviders } from './../utils/test-utils';
import { RootState } from '../store/store';

const MOCK_ARTIST = 'unknown artist';

describe('Hook useUserAnswer', () => {
  let preloadedState: Partial<RootState>;
  const initialState: Partial<RootState> = {
    gameProcess: {
      step: 0,
      errorCount: 0,
    },
  };
  beforeEach(() => {
    preloadedState = JSON.parse(JSON.stringify(initialState));
  });

  it('should be rendered', () => {
    const {result} = renderHookWithProviders(
      ({expectedAnswer}) => useUserAnswer(expectedAnswer),
      {
        initialProps: {
          expectedAnswer: MOCK_ARTIST,
        },
      },
    );
    expect(result.current).toBeTypeOf('object');
  });

  it('should increment step on correct answer', () => {
    const { result, store } = renderHookWithProviders(
      ({expectedAnswer}) => useUserAnswer(expectedAnswer),
      {
        initialProps: {expectedAnswer: MOCK_ARTIST},
        preloadedState,
      },
    );
    const [userAnswerHandler] = result.current;
    act(() => userAnswerHandler(MOCK_ARTIST));
    const step = store.getState().gameProcess.step;
    expect(step).toBe(1);
  });

  it('should increment error count & step on wrong answer', () => {
    const { result, store } = renderHookWithProviders(
      ({expectedAnswer}) => useUserAnswer(expectedAnswer),
      {
        initialProps: { expectedAnswer: MOCK_ARTIST},
        preloadedState,
      },
    );
    const [ userAnswerHandler ] = result.current;
    act(() => userAnswerHandler('wrong answer'));
    const { step, errorCount } = store.getState().gameProcess;
    expect(step).toBe(1);
    expect(errorCount).toBe(1);
  });
});
