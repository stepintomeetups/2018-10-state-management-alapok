import { createStore } from 'redux';
import { reducer } from './reducer';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

document.addEventListener('DOMContentLoaded', () => {
  const ui = document.querySelector('#tic-tac');
  console.log('Store: ', store);
  console.log('UI: ', ui);
});