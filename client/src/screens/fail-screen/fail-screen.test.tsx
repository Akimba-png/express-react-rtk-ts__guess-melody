import {
  RouteObject,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';
import { FailScreen } from './fail-screen';
import { RootState } from '../../store/store';
import { renderWithProviders } from '../../utils/test-utils';
import { AppRoute, AuthStatus } from '../../constants/const';
import { UserAuthState } from '../../store/slices/user-auth-slice/user-auth-slice';

const routes: RouteObject[] = [
  {
    path: AppRoute.Fail,
    element: <FailScreen />,
  },
  {
    path: AppRoute.Game,
    element: <h2>Game screen</h2>,
  },
  {
    path: AppRoute.Signup,
    element: <h2>Signup</h2>,
  },
];
let router: ReturnType<typeof createMemoryRouter>;

describe('Component failScreen', () => {
  let preloadedState: Partial<RootState>;
  beforeEach(() => {
    preloadedState = {
      gameProcess: {
        step: 2,
        errorCount: 3,
      },
      userAuthSlice: {
        authStatus: AuthStatus.Auth,
      } as UserAuthState,
    };
    router = createMemoryRouter(routes, {
      initialEntries: [AppRoute.Fail],
      initialIndex: 0,
    });
  });

  it('should navigate on signup screen on unAuth', () => {
    if (preloadedState.userAuthSlice) {
      preloadedState.userAuthSlice.authStatus = AuthStatus.NotAuth;
    }
    renderWithProviders(<RouterProvider router={router}/>, {preloadedState});
    expect(screen.getByRole('heading', {name: /Signup/})).toBeInTheDocument();
  });

  it('should be rendered properly', () => {
    renderWithProviders(<RouterProvider router={router} />, {preloadedState});
    const heading = screen.getByRole('heading', {name: /Какая жалость/});
    expect(heading).toBeInTheDocument();
  });

  it('should navigate on game screen on user interaction', () => {
    renderWithProviders(<RouterProvider router={router} />, {preloadedState});
    const tryAgainButton = screen.getByRole(
      'button', {name: /Попробовать ещё раз/}
    );
    fireEvent.click(tryAgainButton);
    expect(
      screen.getByRole('heading', {name: /Game screen/})
    ).toBeInTheDocument();
  });
});
