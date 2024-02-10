import {
  createMemoryRouter,
  type RouteObject,
  RouterProvider
} from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';
import { SuccessScreen } from './success-screen';
import { RootState } from '../../store/store';
import { renderWithProviders } from '../../utils/test-utils';
import { AppRoute, AuthStatus } from '../../constants/const';
import { UserAuthState } from '../../store/slices/user-auth-slice/user-auth-slice';

const MOCK_STATE = {
  Step: 3,
  ErrorCount: 2,
};

describe('Component SuccessScreen', () => {
  const preloadedState: Partial<RootState> = {
    gameProcess: {
      step: MOCK_STATE.Step,
      errorCount: MOCK_STATE.ErrorCount,
    },
    userAuthSlice: {
      authStatus: AuthStatus.Auth,
    } as UserAuthState,
  };
  const routes: RouteObject[] = [
    {
      path: AppRoute.Success,
      element: <SuccessScreen />,
    },
    {
      path: AppRoute.Game,
      element: <h2>Game screen</h2>,
    },
    {
      path: AppRoute.Main,
      element: <h2>Main screen</h2>,
    },
    {
      path: AppRoute.Signup,
      element: <h2>Signup</h2>,
    },
  ];
  const router = createMemoryRouter(routes);

  beforeEach(() => {
    router.navigate(AppRoute.Success);
  });

  it('should render properly', () => {
    renderWithProviders(<RouterProvider router={router} />, {preloadedState});
    expect(
      screen.getByRole('heading', {name: /Вы настоящий меломан/})
    ).toBeInTheDocument();
  });

  it('Should render correct info from the state', () => {
    renderWithProviders(<RouterProvider router={router} />, {preloadedState});
    expect(
      screen.getByText(
        `Вы ответили правильно на ${MOCK_STATE.Step - MOCK_STATE.ErrorCount} вопросов и совершили ${MOCK_STATE.ErrorCount} ошибки`
      ),
    ).toBeInTheDocument();
  });

  it('should navigate to Gamescreen on user play again interaction', () => {
    renderWithProviders(<RouterProvider router={router} />, {preloadedState});
    const playAgainButton = screen.getByRole(
      'button', {name: /Сыграть ещё раз/}
    );
    fireEvent.click(playAgainButton);
    expect(screen.getByRole(
      'heading', {name: /Game screen/})
    ).toBeInTheDocument();
  });

  it('should navigate to Main screen on user exit interaction', () => {
    renderWithProviders(<RouterProvider router={router} />, {preloadedState});
    const exitButton = screen.getByRole('link', {name: /Выход/});
    fireEvent.click(exitButton);
    expect(
      screen.getByRole('heading', {name: 'Main screen'})
    ).toBeInTheDocument();
  });

  it('should redirect to Signup screen on unAuth', () => {
    if (preloadedState.userAuthSlice) {
      preloadedState.userAuthSlice.authStatus = AuthStatus.NotAuth;
    }
    renderWithProviders(<RouterProvider router={router}/>, {preloadedState});
    expect(screen.getByRole('heading', {name: /Signup/})).toBeInTheDocument();
  });
});
