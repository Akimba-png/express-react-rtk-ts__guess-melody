import type { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import {
  type RenderOptions,
  type RenderHookOptions,
  render,
  renderHook,
} from '@testing-library/react';
import  { type AppStore, type RootState, setupStore } from '../store/store';


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

interface ExtendedRenderHookOptions<T> extends RenderHookOptions<T> {
  store?: AppStore,
  preloadedState?: Partial<RootState>,
}

export function renderHookWithProviders<U, R>(
  render: (initialProps: U) => R,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderHookOptions
  }: ExtendedRenderHookOptions<U> = {}
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
