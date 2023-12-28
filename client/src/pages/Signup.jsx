import React, { useState } from 'react';
import SignupForm from '../components/SignupPage/SignupForm';
import { userSignup } from '../actions/userActions';

const Signup= () => {
  const [errorMessage,setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-gray-300">
      <div className="bg-gray-300 p-8 rounded-md shadow-md w-96">
      <h1 className='text-center text-xl font-mono font-bold'>Signup</h1>
       { errorMessage !== null ? <div className='flex justify-center items-center'><p className='text-center text-red-900'>{errorMessage}</p></div>:null } 
         <SignupForm setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} action={userSignup} />
         <p className='my-4 mx-5 text-sm'>Already Have An Account ?<span onClick={()=>navigate('/')} className='text-blue-700  underline'> Login</span></p>
      </div>
    </div>
  );
};

export default Signup;