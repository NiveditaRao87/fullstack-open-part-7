import React, { useEffect } from 'react'
import { useField } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearError } from '../../reducers/loginReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { Form, FormGroup, Input, Button, Label } from 'reactstrap'

const Login = () => {

  const username = useField('text','username')
  const password = useField('text','password')
  const auth = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const styles = {
    width: {
      width: '80%'
    },
    loginBtn: {
      paddingLeft: '30px',
      paddingRight: '30px',
      fontSize: '1.2rem'
    }
  }

  useEffect(() => {
    //Dirty error handling for showing login failure. Will cause some extra renders but
    //since it is only in the login page, leaving it as is for now.
    dispatch(setNotification({ message: auth.error,type: 'error' },5))
    const timer = setTimeout(() => dispatch(clearError()),3000)
    return () => clearTimeout(timer)
  },[auth.error, dispatch])

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login({ username: username.value, password: password.value }))
    username.onReset()
    password.onReset()
  }

  return <Form onSubmit={handleLogin} style={styles.width}>
    <h2>Login</h2>
    <FormGroup>
      <Label for='username' className='sr-only'>Username</Label>
      <Input
        {...username}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for='password' className='sr-only'>Password</Label>
      <Input
        {...password}
        required
      />
    </FormGroup>
    <Button className='secondary-btn' style={styles.loginBtn} id="login-button" type="submit" >Login</Button>
  </Form>
}

export default Login