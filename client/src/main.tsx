import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './app.tsx';
import { store } from './store/store.ts';
import { fetchQuestions } from './store/thunk-actions/fetch-questions.ts';

store.dispatch(fetchQuestions());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
