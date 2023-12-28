import React ,{useState} from 'react'
import LoginForm from '../../components/LoginPage/LoginForm'
import { loginAdmin } from '../../actions/adminActions'
import { useSelector } from 'react-redux'

const AdminLogin = () => {
  const [errorMessage,setErrorMessage] = useState(null)
  const data = useSelector((state)=>{
    return state.admin
  })
  return (
    <div className="bg-gradient-to-r from-gray-800 to-black min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
    { errorMessage !== null ? <div className='flex justify-center items-center'><p className='text-center text-red-900'>{errorMessage}</p></div>:null } 
      <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
       <LoginForm setErrorMessage={setErrorMessage} dispatchLogin={loginAdmin}/>
    </div>
  </div>

  )
}

export default AdminLogin