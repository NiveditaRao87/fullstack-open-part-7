import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, FormGroup, Button, Input, Label } from 'reactstrap'
import { useField } from '../hooks'

const CreateForm = ({ toggle }) => {

  // const [newBlog, setNewBlog] = useState({ title:'',author: '',url: '' })
  const title = useField('text','title')
  const author = useField('text','author')
  const url = useField('text','url')
  const dispatch = useDispatch()

  const styles = {
    createBtn: {
      paddingLeft: '30px',
      paddingRight: '30px',
      marginBottom: '20px'
    }
  }

  const handleCreate = (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    }))
    dispatch(setNotification({ message: `A new blog ${title.value} by ${author.value} was added to the list`,type: 'message' },5))
    // setNewBlog({ title: '',author: '',url: '' })
    author.onReset()
    url.onReset()
    title.onReset()
    toggle()
  }

  return (
    <>
      <h2>Create a new Blog</h2>
      <Form onSubmit={handleCreate}>
        <FormGroup>
          <Label className='sr-only'>Title</Label>
          <Input {...title}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label className='sr-only'>Author</Label>
          <Input {...author}
          />
        </FormGroup>
        <FormGroup>
          <Label className='sr-only'>url</Label>
          <Input
            {...url}
            required
          />
        </FormGroup>
        <Button className='secondary-btn' style={styles.createBtn} id='create-button' type='submit'>
          Create
        </Button>
      </Form>
    </>)
}

export default CreateForm