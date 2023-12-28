import { combineReducers } from "redux";
const user = {
    isAuthenticated: false,
  };
const admin = {
    isAuthenticated: false,
  };
  const initialState = {
    users: [],
    error: null,
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

  export const adminReducer = (prevState = admin, action) => {
    switch (action.type) {
      case "SET-ADMIN":
        return {
          ...prevState,
          adminId: action?.payload?.adminId,
          name: action?.payload?.name,
          isAuthenticated: true,
        };
      case "LOGOUT_ADMIN":
        return {
          ...prevState,
          adminId: null,
          name:null,
          isAuthenticated: action?.payload?.value,
        };
      default:
        return prevState; 
    }
  };
  const fetchReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USERS_SUCCESS':
        return { ...state, users: action.payload, error: null };
      case 'FETCH_USERS_FAILURE':
        return { ...state, users: [], error: action.payload };
      default:
        return state;
    }
  };
  
const rootReducer = combineReducers({
    user: userReducer,
    admin : adminReducer,
    users : fetchReducer
  });
  export default rootReducer;