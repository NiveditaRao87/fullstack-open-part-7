import { useState } from 'react'

export const useField = (type, label) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const onReset = () => {
      setValue('')
  }
  return {
    type,
    value,
    id: label.toLowerCase(),
    placeholder: label.charAt(0).toUpperCase() + label.slice(1),
    onChange,
    onReset
  }
}
