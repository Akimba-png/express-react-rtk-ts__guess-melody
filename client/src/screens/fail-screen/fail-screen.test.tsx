import {
  RouteObject,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';
import { FailScreen } from './fail-screen';
import { RootState } from '../../store/store';
import { renderWithProviders } from '../../utils/test-utils';
import { AppRoute } from '../../constants/const';

const routes: RouteObject[] = [
  {
    path: AppRoute.Fail,
    element: <FailScreen />,
  },
  {
    path: AppRoute.Game,
    element: <h2>Game screen</h2>,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: [AppRoute.Fail],
  initialIndex: 0,
});


describe('Component failScreen', () => {
  let preloadedState: Partial<RootState>;
  beforeEach(() => {
    preloadedState = {
      gameProcess: {
        step: 2,
        errorCount: 3,
      },
    };
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
