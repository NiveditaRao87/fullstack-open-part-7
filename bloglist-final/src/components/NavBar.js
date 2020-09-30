import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Navbar, Nav, NavbarToggler, Collapse, NavItem, Button } from 'reactstrap'
import './NavBar.css'

const NavBar = () => {

  const loggedInUser = useSelector(state => state.auth.loggedInUser)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  if(!loggedInUser){
    return null
  }
  return (
    <Navbar id='top-nav' color='faded' light expand='md' >
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} className='ml-auto'/>
      <Collapse isOpen={isOpen} navbar>
        <Nav  navbar>
          <NavItem>
            <Link className='nav-link' to='/'>Blogs</Link>
          </NavItem>
          <NavItem>
            <Link className='nav-link' to='/users'>Users</Link>
          </NavItem>
          {loggedInUser &&
        <NavItem className='user-logout'>
          <span>{loggedInUser.name} logged-in </span>
          <Button className='primary-btn' id='logout-btn' onClick={() => dispatch(logout())}>logout</Button>
        </NavItem>
          }
        </Nav>
      </Collapse>
    </Navbar>)
}

export default NavBar