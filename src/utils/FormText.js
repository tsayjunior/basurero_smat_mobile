import { useState } from 'react'

const FormText = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const [valueError, setValueError] = useState('');

  const handleChange = (text) => {
    setValue(text);
  };

  const reset = () => {
    setValue(initialValue);
  };
  
  const handleChangeError = (text) => {
    setValueError(text);
  };

  const resetError = () => {
    setValueError(initialValue);
  };
  return{
    value,
    onChange: handleChange,
    reset,
    valueError,
    onChangeError: handleChangeError,
    resetError,
  };
}

export default FormText