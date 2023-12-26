import { createStore ,applyMiddleware} from "redux";
import rootReducer from "./userReducer/userReducer";

import { thunk } from "redux-thunk";

export const store = createStore(rootReducer, {}, applyMiddleware(thunk));