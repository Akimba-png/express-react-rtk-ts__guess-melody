import { Provider } from 'react-redux';
import { type RenderOptions, type RenderHookOptions, render, renderHook } from '@testing-library/react';
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

interface ExtendedRenderHookOptions extends RenderHookOptions<unknown> {
  store?: AppStore,
  preloadedState?: Partial<RootState>,
}

export function renderHookWithProviders(
  render: (initialProps?: unknown) => unknown,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderHookOptions
  }: ExtendedRenderHookOptions = {}
) {
  function Wrapper({children}: PropsWithChildren) {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }
  return {
    store,
    ...renderHook(render, {wrapper: Wrapper, ...renderHookOptions})
  };
}
