import React, { useState } from 'react';
import SignupForm from '../components/SignupPage/SignupForm';

const Signup= () => {
  const [errorMessage,setErrorMessage] = useState(null)
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-gray-100 p-8 rounded-md shadow-md w-96">
       { errorMessage !== null ? <div className='flex justify-center items-center'><p className='text-center text-red-900'>{errorMessage}</p></div>:null } 
         <SignupForm setErrorMessage={setErrorMessage} />
      </div>
    </div>
  );
};

export default Signup;