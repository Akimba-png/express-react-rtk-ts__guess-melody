import { createBrowserRouter } from 'react-router-dom';
import { WelcomeScreen } from '../screens/welcome-screen/welcome-screen';
import { LoginScreen } from '../screens/login-screen/login-screen';
import { GameScreen } from '../screens/game-screen/game-screen';
import { SuccessScreen } from '../screens/success-screen/success-screen';
import { FailScreen } from '../screens/fail-screen/fail-screen';
import { AppRoute } from '../constants/const';

export const router = createBrowserRouter([
  {
    path: AppRoute.Main,
    element: <WelcomeScreen />,
  },
  {
    path: AppRoute.Login,
    element: <LoginScreen />,
  },
  {
    path: AppRoute.Game,
    element: <GameScreen />,
  },
  {
    path: AppRoute.Success,
    element: <SuccessScreen />,
  },
  {
    path: AppRoute.Fail,
    element: <FailScreen />,
  },
]);
