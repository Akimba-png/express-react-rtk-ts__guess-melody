import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { SignupScreen } from './signup-screen';
import { RootState, setupStore } from '../../store/store';
import { DEFAULT_USER, UserAuthState } from '../../store/slices/user-auth-slice/user-auth-slice';
import { renderWithProviders } from '../../utils/test-utils';
import { ApiRoute, AppRoute, AuthStatus } from '../../constants/const';

describe('Component SignupScreen', () => {
  const TEST_USER = {
    id: '1',
    name: 'test name',
    email: 'test@test.test',
    accessToken: 'test token',
  };

  const router = createMemoryRouter([
    {
      path: AppRoute.Signup,
      element: <SignupScreen/>,
    },
    {
      path: AppRoute.Game,
      element: <h2>Game screen</h2>,
    },
  ], {
    initialEntries: [AppRoute.Signup],
    initialIndex: 0,
  });

  const preloadedState: Partial<RootState> = {
    userAuthSlice: {
      user: DEFAULT_USER,
      authStatus: AuthStatus.NotAuth,
    } as UserAuthState,
  };

  const restHandlers = [
    http.post(`${ApiRoute.BaseUrl}${ApiRoute.Signup}`, () => {
    return HttpResponse.json(TEST_USER);
    }),
  ];
  const server = setupServer(...restHandlers);

  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    server.resetHandlers();
    router.navigate(AppRoute.Signup);
  });
  afterAll(() => {
    server.close();
  })

  it('should be rendered properly', () => {
    renderWithProviders(<RouterProvider router={router}/>);
    expect(
      screen.getByText(/Зарегистрируйтесь!/)
    ).toBeInTheDocument();
  });

  it('should navigate to GameScreen on user play again click', () => {
    renderWithProviders(<RouterProvider router={router}/>);
    const playAgainButton = screen.getByRole(
      'button', { name: /Сыграть ещё раз/ }
      );
    fireEvent.click(playAgainButton);
    expect(screen.getByRole('heading', { name: /Game screen/ }));
  });

  it('should render correct text on user type', async () => {
    const user = userEvent.setup();
    renderWithProviders(<RouterProvider router={router}/>);
    const nameInput = screen.getByLabelText(/Ваше имя/);
    const emailInput = screen.getByLabelText(/Email/);
    const passwordInput = screen.getByLabelText(/Пароль/);
    await user.type(nameInput, 'test name');
    await user.type(emailInput, 'test@test.test');
    await user.type(passwordInput, 'test password');
    expect(screen.getByDisplayValue(/test name/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/test@test.test/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/test password/)).toBeInTheDocument();
  });

  it('should render error on empty fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<RouterProvider router={router}/>);
    const submitButton = screen.getByText(/Signup/);
    await user.click(submitButton);
    expect(screen.getByText(/Поле обязательно/)).toBeVisible();
  });

  it('should change store auth status & navigate to game screen',
  async () => {
    const user = userEvent.setup();
    const store = setupStore(preloadedState);
    renderWithProviders(<RouterProvider router={router}/>, { store });
    const nameInput = screen.getByLabelText(/Ваше имя/);
    const emailInput = screen.getByLabelText(/Email/);
    const passwordInput = screen.getByLabelText(/Пароль/);
    const submitButton = screen.getByText(/Signup/);
    await user.type(nameInput, TEST_USER.name);
    await user.type(emailInput, TEST_USER.email);
    await user.type(passwordInput, 'test');
    await user.click(submitButton);
    expect(store.getState().userAuthSlice.user).toEqual(TEST_USER);
    expect(screen.getByRole(
      'heading', { name: /Game screen/ })
    ).toBeInTheDocument();
  });
});
