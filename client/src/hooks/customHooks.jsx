import { useState } from 'react';

const initialFormData = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const useFormData = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return [formData, setFormData, handleChange];
};
