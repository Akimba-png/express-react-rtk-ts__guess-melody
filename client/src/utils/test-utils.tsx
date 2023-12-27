import { Provider } from 'react-redux';
import { type RenderOptions, render } from '@testing-library/react';
import { setupStore } from '../store/store';
import type { PropsWithChildren, ReactElement } from 'react';
import type { AppStore, RootState } from '../store/store';


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: AppStore,
  preloadedState?: Partial<RootState>,
};

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({children}: PropsWithChildren): JSX.Element {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }
  return {
    store,
    ...render(ui, {wrapper: Wrapper, ...renderOptions})
  }
};