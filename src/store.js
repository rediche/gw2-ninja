import {
  createStore,
  compose as origCompose,
  applyMiddleware,
  combineReducers
} from "redux";
import thunk from "redux-thunk";
import { lazyReducerEnhancer } from "pwa-helpers/lazy-reducer-enhancer.js";
import { saveState, loadState } from "./localStorage.js";

// Import reducers for initially loaded ones
import settings from "./reducers/settings.js";

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;

// Initializes the Redux store with a lazyReducerEnhancer (so that you can
// lazily add reducers after the store has been created) and redux-thunk (so
// that you can dispatch async actions). See the "Redux and state management"
// section of the wiki for more details:
// https://github.com/Polymer/pwa-starter-kit/wiki/4.-Redux-and-state-management
export const store = createStore(
  (state, action) => state,
  loadState(), // If there is local storage data, load it.
  compose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk))
);

// Initially loaded reducers.
store.addReducers({
  settings
});

// This subscriber writes to local storage anytime the state updates.
store.subscribe(() => {
  saveState(store.getState());
});