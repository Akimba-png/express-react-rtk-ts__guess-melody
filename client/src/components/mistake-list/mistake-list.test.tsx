import { screen } from '@testing-library/react';
import { MistakeList } from './mistake-list';
import { RootState, setupStore } from '../../store/store';
import { renderWithProviders } from '../../utils/test-utils';

describe('Component mistake-list', () => {
  it('should not be rendered when there are no mistakes', () => {
    const initialState: Partial<RootState> = {
      gameProcess: {
        step: 0,
        errorCount: 0,
      },
    }
    const store = setupStore(initialState);
    renderWithProviders(<MistakeList />, {store});
    expect(screen.getByTestId('mistake-list')).toBeInTheDocument();
    expect(screen.queryAllByTestId('mistake').length).toBe(0);
  });

  it('should render 1 mistake', () => {
    const initialState: Partial<RootState> = {
      gameProcess: {
        step: 0,
        errorCount: 1,
      },
    }
    const store = setupStore(initialState);
    renderWithProviders(<MistakeList />, {store});
    expect(screen.getByTestId('mistake-list')).toBeInTheDocument();
    expect(screen.queryAllByTestId('mistake').length).toBe(1);
  });

  it('should render 3 mistakes', () => {
    const initialState: Partial<RootState> = {
      gameProcess: {
        step: 0,
        errorCount: 3,
      },
    }
    const store = setupStore(initialState);
    renderWithProviders(<MistakeList />, {store});
    expect(screen.getByTestId('mistake-list')).toBeInTheDocument();
    expect(screen.queryAllByTestId('mistake').length).toBe(3);
  });
});
