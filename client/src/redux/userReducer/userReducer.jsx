import { combineReducers } from "redux";
const user = {
    isAuthenticated: false,
  };
  
  export const userReducer = (prevState = user, action) => {
    switch (action.type) {
      case "SET-USER":
        return {
          ...prevState,
          userId: action?.payload?.userId,
          name: action?.payload?.name,
          isAuthenticated: true,
        };
      case "EDIT_USER":
        return {
          ...prevState,
          name: action?.payload?.name,
        };
      case "LoGOUT_USER":
        return {
          ...prevState,
          userId: null,
          name: null,
          isAuthenticated: action?.payload?.value,
        };
      default:
        return prevState; 
    }
  };
  
const rootReducer = combineReducers({
    user: userReducer
  });
  export default rootReducer;