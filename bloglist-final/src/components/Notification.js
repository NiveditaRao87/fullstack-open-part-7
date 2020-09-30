import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'reactstrap'
import './Notification.css'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  const width = {
    width: '80%',
    margin: '0 10%'
  }

  if (!notification.message) {
    return null
  }

  const { message, type } = notification

  return (
    <Alert id='notification' color={type !== 'error' ? 'success' : 'danger'} style={width}>
      {message}
    </Alert>
  )
}

export default Notification