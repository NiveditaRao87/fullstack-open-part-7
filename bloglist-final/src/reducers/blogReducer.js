import blogService from '../services/blogs'

const byLikes = (a1, a2) => a2.likes - a1.likes

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT':
    return action.data.sort(byLikes)
  case 'LIKE': {
    const liked = action.data
    return state.map(b => b.id === liked.id ? { ...b,likes: liked.likes } : b).sort(byLikes)
  }
  case 'ADD_COMMENT':
    return state.map(b => b.id !== action.data.id ? b : action.data)
  case 'CREATE':
    return [...state, action.data]
  case 'DELETE':
    return state.filter(b => b.id !== action.data.id).sort(byLikes)
  default:
    return state
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const data = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const initialiseBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const toLike = { ...blog, likes: blog.likes + 1 }
    const data = await blogService.update(blog.id,toLike)
    dispatch({
      type: 'LIKE',
      data
    })
  }
}

export const addComment = (id,comment) => {
  return async dispatch => {
    const data = await blogService.addComment(id,{ comment })
    dispatch({
      type: 'ADD_COMMENT',
      data
    })
  }
}

export const deleteBlog = data => {
  return async dispatch => {
    await blogService.remove(data.id)
    dispatch({
      type: 'DELETE',
      data
    })
  }
}

export default reducer