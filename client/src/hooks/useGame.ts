import { useAppSelector } from './store-hooks';
import { LoadingStatus } from '../constants/const';

const MAX_ERROR_COUNT = 3;

export function useGame(): [boolean, boolean, boolean, number] {
  const { step, errorCount } = useAppSelector(state => state.gameProcess);
  const { questions, loadingStatus} = useAppSelector(state => state.gameData);

  const isLoading = loadingStatus === LoadingStatus.Pending;
  const isFail = errorCount >= MAX_ERROR_COUNT;
  const isWin = step > questions.length - 1;

  return [ isLoading, isWin, isFail, step ];
}
