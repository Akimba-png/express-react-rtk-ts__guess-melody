import { screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { type RootState, setupStore } from '../../store/store';
import { GameScreen } from './game-screen';
import { renderWithProviders } from '../../utils/test-utils';
import { generateArtistQuestion, generateGenreQuestion } from '../../utils/mock';
import { AppRoute, LoadingStatus } from '../../constants/const';

describe('Component GameScreen', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render correctly whith no questions', () => {
    renderWithProviders(<GameScreen />);
    expect(screen.getByText(/А вопросов-то и нет/)).toBeInTheDocument();
  });

  it('should show loading when data is loading', () => {
    const initialState: Partial<RootState> = {
      gameData: {
        questions: [],
        loadingStatus: LoadingStatus.Pending,
        error: '',
      }
    };
    const store = setupStore(initialState);
    renderWithProviders(<GameScreen />, {store});
    expect(screen.getByText(/loading/)).toBeInTheDocument();
  });

  it('should navigate to fail screen', () => {
    const mockQuestion = generateGenreQuestion();
    const initialState: RootState = {
      gameProcess: {
        step: 0,
        errorCount: 4,
      },
      gameData: {
        questions: [mockQuestion],
        loadingStatus: LoadingStatus.Idle,
        error: '',
      },
    }
    const store = setupStore(initialState);
    const router = createMemoryRouter([
      {
        path: AppRoute.Fail,
        element: <h1>Game over</h1>,
      },
      {
        path: AppRoute.Game,
        element: <GameScreen />,
      },
    ], {
      initialEntries: [AppRoute.Game],
      initialIndex: 0,
    });
    renderWithProviders(<RouterProvider router={router}/>, {store});
    expect(screen.getByText(/Game over/)).toBeInTheDocument();
  });

  it('should navigate to success screen', () => {
    const mockQuestion = generateGenreQuestion();
    const initialState: RootState = {
      gameProcess: {
        step: 1,
        errorCount: 0,
      },
      gameData: {
        questions: [mockQuestion],
        loadingStatus: LoadingStatus.Idle,
        error: '',
      },
    };
    const router = createMemoryRouter([
      {
        path: AppRoute.Game,
        element: <GameScreen />,
      },
      {
        path: AppRoute.Success,
        element: <h1>Success screen</h1>,
      }
    ], {
      initialEntries: [AppRoute.Game],
      initialIndex: 0,
    });
    renderWithProviders(
      <RouterProvider router={router}/>,
      {preloadedState: initialState}
    );
    expect(screen.getByText(/Success screen/)).toBeInTheDocument();
  });

  it('should render artistGame when question type is artist', () => {
    const mockQuestion = generateArtistQuestion();
    HTMLMediaElement.prototype.pause = vi.fn();
    const initialState: RootState = {
      gameData: {
        questions: [mockQuestion],
        loadingStatus: LoadingStatus.Idle,
        error: '',
      },
      gameProcess: {
        step: 0,
        errorCount: 0,
      },
    };
    renderWithProviders(
      <GameScreen/>, {
      preloadedState: initialState,
    });
    expect(screen.getByText(/Кто исполняет эту песню?/)).toBeInTheDocument();
  });

  it('should render genreGame when question type is genre', () => {
    const mockQuestion = generateGenreQuestion();
    const initialState: RootState = {
      gameData: {
        questions: [mockQuestion],
        loadingStatus: LoadingStatus.Idle,
        error: '',
      },
      gameProcess: {
        step: 0,
        errorCount: 0,
      },
    };
    HTMLMediaElement.prototype.pause = vi.fn();
    renderWithProviders(<GameScreen/>, {
      preloadedState: initialState,
    });
    expect(screen.getByText(/^Выберите [a-zA-z]+ треки$/)).toBeInTheDocument();
  });
});
