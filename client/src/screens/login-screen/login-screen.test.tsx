import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { LoginScreen } from './login-screen';
import { RootState, setupStore } from '../../store/store';
import { DEFAULT_USER, UserAuthState } from '../../store/slices/user-auth-slice/user-auth-slice';
import { Credentials, User } from '../../models/user';
import { renderWithProviders } from '../../utils/test-utils';
import { ApiRoute, AppRoute, AuthStatus } from '../../constants/const';

const MOCK_DATA: Credentials = {
  email: 'test@test.test',
  password: 'test',
};

const MOCK_USER: User = {
  id: '1',
  name: 'test name',
  email: MOCK_DATA.email,
  accessToken: 'test token',
};

const router = createMemoryRouter([
  {
    path: AppRoute.Login,
    element: <LoginScreen/>,
  },
  {
    path: AppRoute.Signup,
    element: <h2>Signup screen</h2>,
  },
  {
    path: AppRoute.Game,
    element: <h2>Game screen</h2>,
  },
], {
  initialEntries: [AppRoute.Signup],
  initialIndex: 0,
});

const initialState: Partial<RootState> = {
  userAuthSlice: {
    authStatus: AuthStatus.NotAuth,
    user: DEFAULT_USER,
  } as UserAuthState,
};

const setupRender = (preloadedState: Partial<RootState> = initialState) => {
  const store = setupStore(preloadedState);
  renderWithProviders(<RouterProvider router={router}/>, { store });
  return {
    store,
  }
};

const requestHandlers = [
  http.post(`${ApiRoute.BaseUrl}${ApiRoute.Login}`, () => {
    return HttpResponse.json(MOCK_USER);
  }),
];

const server = setupServer(...requestHandlers);

describe('Component LoginScreen', () => {
  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    server.resetHandlers();
    router.navigate(AppRoute.Login);
  });
  afterAll(() => {
    server.close();
  });

  it('should be rendered properly', () => {
    setupRender();
    expect(
      screen.getByRole('heading', {name: /Вы настоящий меломан!/})
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Войти/)
    ).toBeInTheDocument();
  });

  it('should render user input', async () => {
    setupRender();
    const user = userEvent.setup();
    const loginInput = screen.getByLabelText(/Логин/);
    const emailInput = screen.getByLabelText(/Пароль/);
    await user.type(loginInput, MOCK_DATA.email);
    await user.type(emailInput, MOCK_DATA.password);
    expect(
      screen.getByDisplayValue(MOCK_DATA.email)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(MOCK_DATA.password)
    ).toBeInTheDocument();
  });

  it('should render error field on wrong input', async () => {
    setupRender();
    const user = userEvent.setup();
    const emailInput = screen.getByLabelText(/Логин/);
    const passwordInput = screen.getByLabelText(/Пароль/);
    const submitButton = screen.getByText(/Войти/);
    await user.type(emailInput, 'test');
    await user.type(passwordInput, 'pa');
    await user.click(submitButton);
    expect(
      screen.getByText(/Поле должно содежать @/)
    ).toBeVisible();
    expect(
      screen.getByText(/Минимум 3 символа/)
    ).toBeVisible();
  });

  it('should navigate on game screen on play again click', async () => {
    setupRender();
    const user = userEvent.setup();
    const playAgainButton = screen.getByRole(
      'button', { name: /Сыграть ещё раз/ }
    );
    await user.click(playAgainButton);
    expect(
      screen.getByRole('heading', { name: /Game screen/ })
    ).toBeInTheDocument();
  });

  it('should navigate on signup screen on user signup click', async () => {
    setupRender();
    const user = userEvent.setup();
    const signupLink = screen.getByRole(
      'link', { name: /или зарегистрироваться/ }
    );
    await user.click(signupLink);
    expect(
      screen.getByRole('heading', { name: /Signup screen/ })
    ).toBeInTheDocument();
  });

  it('should update state & navigate on game screen on user submit',
    async () => {
      const {store} = setupRender();
      const user = userEvent.setup();
      const emailInput = screen.getByLabelText(/Логин/);
      const passwordInput = screen.getByLabelText(/Пароль/);
      const submitButton = screen.getByText(/Войти/);
      await user.type(emailInput, MOCK_DATA.email);
      await user.type(passwordInput, MOCK_DATA.password);
      await user.click(submitButton);
      expect(
        store.getState().userAuthSlice.authStatus
      ).toBe(AuthStatus.Auth);
      expect(
        store.getState().userAuthSlice.user
      ).toEqual(MOCK_USER);
      expect(
        screen.getByRole('heading', { name: /Game screen/ })
      ).toBeInTheDocument();
    }
  );
});

