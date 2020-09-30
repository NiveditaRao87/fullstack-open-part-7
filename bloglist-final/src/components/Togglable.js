import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Jumbotron }  from 'reactstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button className='secondary-btn' size='lg' block onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        <Jumbotron>
          <Button onClick={toggleVisibility} className='close' aria-label='close'>
            <i className='fas fa-times' aria-hidden='true'></i>
          </Button>
          {props.children}
        </Jumbotron>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable