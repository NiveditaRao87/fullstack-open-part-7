import React from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PrivateRoute from './PrivateRoute'
import Blogs from './pages/Blogs'
import UserList from './pages/UserList'
import Login from './pages/Login'
import UserView from './pages/UserView'
import BlogView from './pages/BlogView'
const Routes = () => {

  const loggedInUser = useSelector(state => state.auth.loggedInUser)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null
  const userMatch = useRouteMatch('/users/:id')
  const userToView = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null


  return (
    <Switch>
      <Route path='/login' render={(props) => loggedInUser ? <Redirect to='/' /> : <Login {...props} />} />
      <PrivateRoute path='/' exact component={Blogs} isLoggedIn={loggedInUser ? true : false} />
      <PrivateRoute path='/blogs/:id'
        component={(props) => <BlogView blog={blog} {...props}/>}
        isLoggedIn={loggedInUser ? true : false} />
      <PrivateRoute path='/users' exact component={UserList} isLoggedIn={loggedInUser ? true : false} />
      <PrivateRoute path='/users/:id'
        // Have to pass props so that the component get the history prop etc
        component={(props) => <UserView userToView={userToView} {...props} />}
        isLoggedIn={loggedInUser ? true : false} />
    </Switch>
  )
}

export default Routes