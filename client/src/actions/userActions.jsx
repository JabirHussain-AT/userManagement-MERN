import { useDispatch } from "react-redux";
import axios from "axios";
const BACKEND_BASE_URL = `http://localhost:3002`;

export const setUser = ({ userId, name }) => {
  return { type: "SET-USER", payload: { userId, name } };
};

export const editUser = ({name}) =>{
  return  {type : 'EDIT_USER',payload:{name}}
}

export const logoutUser = ()=>{
  const value = false
  return  {type : 'LoGOUT_USER',payload :{value}}
} 




export const userSignup = (
  { userName, email, password },
  setErrorMessage,
  navigate
) => {
  return (dispatch) => {
    const credentials = {
      userName,
      email,
      password,
    };
    console.log(credentials);
    // Axios request in your Redux action
    axios
      .post(`${BACKEND_BASE_URL}/signup`, credentials, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res, "res");
        if (res.data.success) {
          const userId = res?.data?.userId;
          const name = res?.data?.name;
          dispatch(setUser({ userId, name }));
          navigate("/", { replace: true });
        } else {
          setErrorMessage(res?.data?.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};

// user Login : ============>

export const userLogin = ({ email, password, handleError, navigate }) => {
  return (dispatch) => {
    const credentials = {
      email,
      password,
    };
    axios
      .post(`${BACKEND_BASE_URL}/login`, credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data;
        if (response.success) {
          const userId = response?.userId;
          const name = response?.name;
          dispatch(setUser({ userId, name }));
          navigate("/", { replace: true });
        } else {
          handleError(response.message);
        }
      });
  };
};

export const userEdit = ({  newName,userData ,handleError,handleSuccess }) => {
  return (dispatch) => {
    const credentials = {
      newName,
    };
    axios.post(`${BACKEND_BASE_URL}/editProfile/${userData?._id}`, credentials, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((res)=>{
      const response = res.data;
      if (response.success) {
        const name = response?.response?.userName;
        dispatch(editUser({ name }));
       handleSuccess()
      } else {
        handleError();
      }
    })
  };
};

export const userLogout = (navigate) =>{
  return (dispatch) =>{
    axios.get(`${BACKEND_BASE_URL}/logout`,{
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }).then((res)=>{
      if(res?.data?.success){
        console.log('success logout ')
        dispatch(logoutUser())
        navigate("/login",{replace:true})
      }else{
      }
    })
  }
}
