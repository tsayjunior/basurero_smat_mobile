import { useState } from 'react'

const FormText = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const [valueError, setValueError] = useState('');
    const [lineProgress, setLineProgress] = useState(false);

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
  const handleChangeLineProgress = (bool) => {
    setLineProgress(bool);
  };

  return{
    value,
    onChange: handleChange,
    reset,
    valueError,
    onChangeError: handleChangeError,
    resetError,
    lineProgress,
    onChangeLineProgress: handleChangeLineProgress
  };
}

export default FormText