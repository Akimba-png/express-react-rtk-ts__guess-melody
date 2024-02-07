import { RootState } from '../store/store';
import { useCheckAuth } from './useCheckAuth';
import { renderHookWithProviders } from '../utils/test-utils';
import { DEFAULT_USER } from '../store/slices/user-auth-slice/user-auth-slice';
import { AuthStatus, LoadingStatus } from '../constants/const';

describe('Hook useCheckAuth', () => {
  it('should return true when user is authorized', () => {
    const preloadedState: Partial<RootState> = {
      userAuthSlice: {
        authStatus: AuthStatus.Auth,
        user: DEFAULT_USER,
        loadingStatus: LoadingStatus.Idle,
        error: '',
      },
    };
    const { result } = renderHookWithProviders(useCheckAuth, {preloadedState});
    expect(result.current).toMatchObject({isAuth: true});
  });
  it('should return false when user is unauthorized', () => {
    const preloadedState: Partial<RootState> = {
      userAuthSlice: {
        authStatus: AuthStatus.NotAuth,
        user: DEFAULT_USER,
        loadingStatus: LoadingStatus.Idle,
        error: '',
      },
    };
    const { result } = renderHookWithProviders(useCheckAuth, {preloadedState});
    expect(result.current).toMatchObject({isAuth: false});
  });
  it('should return false on app started', () => {
    const preloadedState: Partial<RootState> = {
      userAuthSlice: {
        authStatus: AuthStatus.Unknown,
        user: DEFAULT_USER,
        loadingStatus: LoadingStatus.Idle,
        error: '',
      },
    };
    const { result } = renderHookWithProviders(useCheckAuth, {preloadedState});
    expect(result.current).toMatchObject({isAuth: false});
  });
});
