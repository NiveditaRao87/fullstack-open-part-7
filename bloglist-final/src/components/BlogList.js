import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog} from '../reducers/blogReducer'

const BlogList = () => {
  
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  
  return (
    <div className='blog-list'>
    <h2>blogs</h2>
    { blogs.map(blog =>
      <Blog key={blog.id} blog={blog} user={user} />
    )}
    </div>
  )
}

const Blog = ({ blog, user }) => {
  
  const dispatch = useDispatch()
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBtnStyle = {
    backgroundColor: '#00b7c2',
    color: '#1b262c'
  }

  const handleLike = (event) => {
    event.preventDefault()
      try {
        dispatch(likeBlog({...blog, user: blog.user.id}))
          //setNotification({message,type},timeoutTimeInSeconds)
        dispatch(setNotification({message: `You liked ${blog.title} by ${blog.author}`,type: 'message'},5))
      }
      catch(exception){
        dispatch(setNotification({message: 'Failed to update blog',type: 'error'},5))
      }
  }

  const handleRemove = () => {
    if(!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
       return
    try {
      dispatch(deleteBlog(blog))
      dispatch(setNotification({message: `Removed blog ${blog.title} by ${blog.author}`,type:'message'},5))
    }
    catch(exception){
      dispatch(setNotification({message: 'Failed to remove blog',type: 'error'},5))
    }

  }

  const [buttonLabel, setButtonLabel] = useState('view')

  return <div className='blog' style={blogStyle}>
    <span>{blog.title} {blog.author}</span>
    {buttonLabel === 'view' ?
      <button className='view-button' onClick={() => setButtonLabel('hide')}>{buttonLabel}</button>
      :
      <>
        <button onClick={() => setButtonLabel('view')}>{buttonLabel}</button>
        <p>{blog.url}</p>
        <p>
          <span className='likes'>likes {blog.likes}</span>
          <button onClick={handleLike} id='like-button' >like</button>
        </p>
        <p>{blog.user.name}</p>
        {user && user.username === blog.user.username && <button style={removeBtnStyle} id='remove-button' onClick={handleRemove}>remove</button>}
      </>}
  </div>
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default BlogList
