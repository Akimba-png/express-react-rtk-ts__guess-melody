import { fireEvent, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { RootState, setupStore } from '../../store/store';
import { GameBack } from './game-back';
import { renderWithProviders } from '../../utils/test-utils';
import { AppRoute } from '../../constants/const';

let router: ReturnType<typeof createMemoryRouter>;
describe('Component GameBack', () => {
  beforeEach(() => {
    router = createMemoryRouter([
      {
        path: AppRoute.Game,
        element: <GameBack />,
      },
      {
        path: AppRoute.Main,
        element: <h1>Main screen</h1>,
      },
    ], {
      initialEntries: [AppRoute.Game],
      initialIndex: 0,
    },);
  });
  it('should be rendered properly', () => {
    const preloadedState: Partial<RootState> = {
      gameProcess: {
        step: 0,
        errorCount: 0,
      },
    };
    renderWithProviders(
      <RouterProvider router={router}/>,
      { preloadedState }
    );
    expect(screen.getByAltText(/Угадай мелодию/)).toBeInTheDocument();
    expect(screen.getByRole(
      'link',
      { name: /Сыграть ещё раз/ })
    ).toBeInTheDocument();
  });

  it('should navigate to main page on user click', () => {
    const preloadedState: Partial<RootState> = {
      gameProcess: {
        step: 0,
        errorCount: 0,
      },
    };
    renderWithProviders(<RouterProvider router={router}/>, {preloadedState});
    const backButton = screen.getByRole('link', {name: /Сыграть ещё раз/});
    fireEvent.click(backButton);
    expect(
      screen.getByRole('heading', {name: /Main screen/})
    ).toBeInTheDocument();
  });

  it('should reset game process state on user click', () => {
    const initialState = {
      step: 0,
      errorCount: 0,
    };
    const prelodedState: Partial<RootState> = {
      gameProcess: {
        step: 3,
        errorCount: 2,
      },
    };
    const store = setupStore(prelodedState);
    renderWithProviders(<RouterProvider router={router}/>, {store});
    const backButton = screen.getByRole('link', {name: /Сыграть ещё раз/});
    fireEvent.click(backButton);
    expect(store.getState().gameProcess).toMatchObject(initialState);
  });
});
