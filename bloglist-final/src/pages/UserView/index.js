import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

const UserView = ({ userToView, history }) => {

  const styles = {
    list: {
      width: '80%',
      backgroundColor: 'transparent',
      cursor: 'pointer'
    }
  }
  const handleClick = (blogId) => {
    history.push(`/blogs/${blogId}`)
  }

  if(!userToView)
    return null

  return(
    <div>
      <h2>Blogs added by {userToView.name}</h2>
      <ListGroup id='user-blogs' >
        {userToView.blogs.map(blog =>
          <ListGroupItem
            key={blog.id}
            tabIndex='0'
            style={styles.list}
            onClick={() => handleClick(blog.id)}
            onKeyDown={e => e.key === 'Enter' && handleClick(blog.id)}
          >
            {blog.title}
          </ListGroupItem>)}
      </ListGroup>
    </div>
  )
}

export default UserView