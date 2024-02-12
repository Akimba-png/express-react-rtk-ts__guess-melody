import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './app.tsx';
import { setupStore } from './store/store.ts';
import { fetchQuestions } from './store/thunk-actions/fetch-questions.ts';
import { checkAuth } from './store/thunk-actions/check-auth.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = setupStore();
store.dispatch(fetchQuestions());
store.dispatch(checkAuth());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer autoClose={2000}/>
    </Provider>
  </React.StrictMode>,
)
