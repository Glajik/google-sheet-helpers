import { createStore, combineReducers } from '../src/redux';
import { stub } from 'sinon';

it('createStore - should work', () => {
  const reducer = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      default:
        return state;
    }
  };

  const store = createStore(reducer);

  expect(store.getState()).toBe(0);

  store.dispatch({ type: 'INCREMENT' });

  expect(store.getState()).toBe(1);

  store.dispatch({ type: 'DECREMENT' });
  store.dispatch({ type: 'DECREMENT' });

  expect(store.getState()).toBe(-1);
});

it('subscribe - should work', () => {
  const reducer = (state = 0) => state;

  const store = createStore(reducer);

  const subscriber1 = stub();
  const subscriber2 = stub();

  const unsubscribeFirst = store.subscribe(subscriber1);
  store.subscribe(subscriber2);

  store.dispatch({ type: 'ANY' });

  expect(subscriber1.called).toBeTruthy();
  expect(subscriber2.called).toBeTruthy();

  unsubscribeFirst();

  store.dispatch({ type: 'ANY' });

  expect(subscriber1.calledOnce).toBeTruthy();
  expect(subscriber2.calledTwice).toBeTruthy();
});

it('combineReducers - should work', () => {
  const counter = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      default:
        return state;
    }
  };

  const visibility = (state = true, action) => {
    switch (action.type) {
      case 'SHOW':
        return true;
      case 'HIDE':
        return false;
      default:
        return state;
    }
  };

  const rootReducer = combineReducers({ counter, visibility });
  const store = createStore(rootReducer);

  expect(store.getState()).toEqual({ counter: 0, visibility: true });

  store.dispatch({ type: 'INCREMENT' });

  expect(store.getState()).toEqual({ counter: 1, visibility: true });

  store.dispatch({ type: 'HIDE' });

  expect(store.getState()).toEqual({ counter: 1, visibility: false });
});
