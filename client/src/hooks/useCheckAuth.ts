import { AuthStatus } from '../constants/const';
import { useAppSelector } from './store-hooks';

export const useCheckAuth = () => {
  const { authStatus } = useAppSelector(state => state.userAuthSlice);
  const isAuth = authStatus === AuthStatus.Auth;
  return { isAuth };
};
