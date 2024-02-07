import { fireEvent, render, screen } from '@testing-library/react';
import { WelcomeScreen } from './welcome-screen';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { AppRoute } from '../../constants/const';

const router = createMemoryRouter([
  {
    path: AppRoute.Main,
    element: <WelcomeScreen />,
  },
  {
    path: AppRoute.Game,
    element: <h1>Game screen</h1>,
  },
], {
  initialEntries: [AppRoute.Main],
  initialIndex: 0,
});

describe('Component WelcomeScreen', () => {
  it('should render properly', () => {
    render(<RouterProvider router={router} />)
    expect(screen.getByText(/Правила игры/)).toBeInTheDocument();
  });

  it('should navigate to game screen on play button click', () => {
    render(<RouterProvider router={router} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText(/Game screen/)).toBeInTheDocument();
  })
});
