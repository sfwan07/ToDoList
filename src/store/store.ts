import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export const configureStore = (initialState?: any) => {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  // sagaMiddleware.run(rootSaga);

  return store;
};
