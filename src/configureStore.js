import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools, devToolsEnhancer } from "redux-devtools-extension";

export default function configureStore(persistedState) {
    const store = createStore(
      rootReducer,
      persistedState,
      composeWithDevTools(
      applyMiddleware(),
      )
      
    );
    return store;
  }

  