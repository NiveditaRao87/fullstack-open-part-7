import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, addComment, deleteBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { Button, Form, FormGroup, Input, Label, Row, Col,
  ListGroup, ListGroupItem } from 'reactstrap'

const BlogView = ({ blog, history }) => {

  const user = useSelector(state => state.auth.loggedInUser)
  const dispatch = useDispatch()

  const styles = {
    blog: {
      paddingTop: 10,
      width: '80%'
    },
    likeBtn: {
      marginLeft: 20,
      paddingLeft: 30,
      paddingRight: 30,
      borderRadius: 10
    },
    width: {
      width: '80%'
    },
    removeBtnStyle: {
      paddingLeft: '20px',
      paddingRight: '20px'
    },
    list: {
      backgroundColor: 'transparent',
      width: '80%'
    }
  }

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(likeBlog({ ...blog, user: blog.user.id }))
    //setNotification({message,type},timeoutTimeInSeconds)
    dispatch(setNotification({ message: `You liked ${blog.title} by ${blog.author}`,type: 'message' },5))
  }
  const handleAddComment = event => {
    event.preventDefault()
    const comment = event.target.comment.value
    comment && dispatch(addComment(blog.id, comment))
  }
  const handleRemove = () => {
    if(!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      return
    }
    dispatch(deleteBlog(blog))
    dispatch(setNotification({ message: `Removed blog ${blog.title} by ${blog.author}`,type:'message' },5))
    history.push('/')
  }

  return (<div className='blog' style={styles.blog}>
    <h2>{blog.title} by {blog.author}</h2>
    <br />
    <a href={blog.url}>{blog.url}</a>
    <br/>
    <br/>
    <p>
      <span className='likes'>likes {blog.likes} </span>
      <Button
        className='secondary-btn'
        size='sm'
        style={styles.likeBtn}
        onClick={handleLike}
        id='like-button'
      >
          Like
      </Button>
    </p>
    <p>added by {blog.user.name}</p>
    <br />
    <h3>Comments</h3>
    <Form onSubmit={handleAddComment} style={styles.width}>
      <FormGroup>
        <Label className='sr-only'>Enter comment</Label>
        <Row>
          <Col>
            <Input
              name='comment'
              type='text'
              placeholder='Add a comment'
            />
          </Col>
          <Col>
            <Button className='secondary-btn' id='comment-btn'>Add comment</Button>
          </Col>
        </Row>
      </FormGroup>
    </Form>
    <ListGroup id='comment-list'>
      {blog.comments &&
        blog.comments.map(comment =>
          <ListGroupItem style={styles.list} key={comment._id}>{comment.text}</ListGroupItem>)}
    </ListGroup>
    {user && user.username === blog.user.username &&
    <Button className='secondary-btn' style={styles.removeBtnStyle} id='remove-button' onClick={handleRemove}>
      Remove blog entry
    </Button>}
  </div>)
}

export default BlogView