import { createStore ,applyMiddleware} from "redux";
import rootReducer from "./appReducer/appReducer";

import { thunk } from "redux-thunk";

export const store = createStore(rootReducer, {}, applyMiddleware(thunk));