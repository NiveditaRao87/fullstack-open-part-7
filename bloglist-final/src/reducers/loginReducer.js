import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import storage from '../utils/storage'

const reducer = (state = { loggedInUser: null, error:  null },action) => {
  switch(action.type) {

  case 'LOAD_SAVED_USER':
  case 'LOGIN_SUCCESS':
    return { loggedInUser: action.data,
      error: null }
  case 'LOGIN_FAILURE':
    return { loggedInUser: null,
      error: action.error }
  case 'CLEAR_ERROR':
    return { ...state,
      error: null }
  case 'LOGOUT':
    return { ...state,
      loggedInUser: null }
  default:
    return state
  }
}

export const initialiseLoggedInUser = () => {
  return dispatch => {
    const data = storage.loadUser()
    dispatch({
      type: 'LOAD_SAVED_USER',
      data
    })
    data && blogService.setToken(data.token)
    data && userService.setToken(data.token)
  }
}

export const login = (credentials) => {
  return async dispatch => {
    try {
      const data = await loginService.login(credentials)
      storage.saveUser(data)
      blogService.setToken(data.token)
      userService.setToken(data.token)
      dispatch({
        type: 'LOGIN_SUCCESS',
        data
      })
    }catch(error){
      dispatch({
        type: 'LOGIN_FAILURE',
        error: 'Wrong username or password'
      })
    }
  }
}

export const clearError = () => {
  return { type: 'CLEAR_ERROR' }
}


export const logout = () => {

  storage.logoutUser()
  blogService.setToken(null)
  userService.setToken(null)
  return { type: 'LOGOUT' }
}

export default reducer

