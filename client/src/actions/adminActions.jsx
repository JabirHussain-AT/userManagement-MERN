import { useDispatch } from "react-redux";
import axios from "axios";
const BACKEND_BASE_URL = `http://localhost:3002/admin`;

export const setAdmin = ({ adminId, name }) => {
  return { type: "SET-ADMIN", payload: { adminId, name } };
};
export const logoutAdmin = ()=>{
    const value = false
    return  {type : 'LOGOUT_ADMIN',payload :{value}}
  } 


export const loginAdmin = ({ email, password, handleError, navigate }) => {
    console.log('i am hereat admin actions loginAdmin')
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
        console.log(res,)
        if (response.success) {
          const adminId = response?.adminId;
          const name = response?.name;
          dispatch(setAdmin({ adminId, name }));
          navigate("/dashboard", { replace: true });
        } else {
          handleError(response.message);
        }
      });

  };
};


export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/users`,
      {headers: { "Content-Type": "application/json" },
      withCredentials: true}
      );
      const users = response.data;
      dispatch({ type: 'FETCH_USERS_SUCCESS', payload: users });
    } catch (error) {
      dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
    }
  };
};



export const editUser = ({selectedUserId,editedUserName},setSuccessMessage,setErrorMessage )=>{
    return (dispatch) =>{
    const credentials = {
       userId : selectedUserId,
       editedValue : editedUserName
    }
    axios
    .post(`${BACKEND_BASE_URL}/edit-user`, credentials, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((res) => {
      const response = res.data;
      console.log(res,'this is res in edit user ')
      if (response.success) {
        
        setSuccessMessage('Edited Successfully')
      } else {
        setErrorMessage(response?.message)
      }
    });
}
} 

export const userDelete = (userId,setSuccessMessage,setErrorMessage) =>{
    return (()=>{
        console.log('i am hereeeeeeeeeee')
        const credentials={
            userId
        }
        axios
        .post(`${BACKEND_BASE_URL}/delete-user`, credentials, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          const response = res.data;
          console.log(res,'this is res in delete user ')
          if (response.success) {
            
            setSuccessMessage('Deleted Successfully')
            setTimeout(()=>{
                setSuccessMessage('')
            },2000)
          } else {
            setErrorMessage(response?.message)
          }
        });
    })()
} 
export const userAdding = (userData,setSuccessMessage,setErrorMessage, navigate) =>{
    return () =>{
        axios
        .post(`${BACKEND_BASE_URL}/add-user`, userData, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          const response = res.data;
          console.log(res,'this is res in delete user ')
          if (response.success) {
              setSuccessMessage('user added successfully ')
            setTimeout(()=>{
                navigate('/admin')
            },2000)
          } else {
            setErrorMessage(response?.message)
          }
        });
    }
} 
export const adminLogout = (navigate) =>{
    return (dispatch) =>{
        console.log('success logout ')
      axios.get(`${BACKEND_BASE_URL}/logout`,{
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }).then((res)=>{
        if(res?.data?.success){
          console.log('success logout ')
          dispatch(logoutAdmin())
          navigate("/admin",{replace:true})
        }else{
        }
      })
    }
  }
  

