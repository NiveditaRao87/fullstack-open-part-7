import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleNotification = (message,type) => {
    // Type to indicate if its an error message or a notification
    dispatch(setNotification({ message,type },5))
  }
  
  const handleLogin = (event) => {
    event.preventDefault()
    
    dispatch(login({username, password}))
    // } catch ({ response }) {
    //   if(response.status === 401){
    //     handleNotification('Wrong username or password','error')
    //   } else {
    //     handleNotification('Failed to login, try again later or contact your administrator','error')
    //   }
    // }
    setUsername('')
    setPassword('')
  }

  return <form onSubmit={handleLogin}>
    <h2>Login to blog application</h2>
    <div>
            username
      <input
        type="text"
        id="username"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
            password
      <input
        id='password'
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}

      />
    </div>
    <button id="login-button" type="submit">login</button>
  </form>
}

export default LoginForm