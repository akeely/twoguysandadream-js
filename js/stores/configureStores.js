import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStores(initialState) {
  const store = createStore(
    rootReducer,
    initialState
  );

  return store;
}
