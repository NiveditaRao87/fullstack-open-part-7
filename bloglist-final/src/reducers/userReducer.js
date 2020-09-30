import userService from '../services/users'

const byBlogs = (a1,a2) => a2.blogs.length - a1.blogs.length

const reducer = (state = [], action) => {

  switch(action.type) {
  case 'INIT_USERS':
    return action.data.sort(byBlogs)
  default:
    return state
  }
}

export const initialiseUsers = () => {
  return async dispatch => {
    const data = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data
    })
  }
}

export default reducer