import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Togglable from '../../components/Togglable'
import CreateForm from '../../components/CreateForm'

const Blogs = ({ history }) => {

  const blogs = useSelector(state => state.blogs)
  const loggedInUser = useSelector(state => state.auth.loggedInUser)

  const createFormRef = useRef() //The ref is used in this case to access the visibility
  // which is controlled within a child component from the parent. A ref remains unchanged
  // inspite of re-renders.

  const spacingh2 = {
    marginTop: '20px',
    marginBottom: '20px'
  }

  return (
    <div className='blog-list'>
      <Togglable buttonLabel='Create new blog' ref={createFormRef}>
        <CreateForm
          toggle={() => createFormRef.current.toggleVisibility()}
        />
      </Togglable>
      <h2 style={spacingh2}>Blogs</h2>
      {blogs && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={loggedInUser} history={history} />
      )}
    </div>
  )
}

const Blog = ({ blog, history }) => {

  const rowStyle = {
    fontSize: '1.2rem',
    cursor: 'pointer'
  }
  const handleClick = () => {
    history.push(`/blogs/${blog.id}`)
  }

  return (
    <p
      className='blog-row'
      style={rowStyle}
      tabIndex='0'
      onClick={handleClick}
      onKeyDown={e => e.key === 'Enter' && handleClick()}>
      {blog.title} {blog.author}
    </p>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blogs
