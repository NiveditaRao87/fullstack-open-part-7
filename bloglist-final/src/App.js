import React, { useEffect, useCallback, useState } from 'react'
import Routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import Notification from './components/Notification'
import NavBar from './components/NavBar'
import { useDispatch } from 'react-redux'
import { initialiseBlogs } from './reducers/blogReducer'
import { initialiseLoggedInUser } from './reducers/loginReducer'
import { initialiseUsers } from './reducers/userReducer'
import { Container } from 'reactstrap'
import './App.css'

const App = () => {

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  const fetchInitialData = useCallback(async () => {
    await dispatch(initialiseLoggedInUser())
    await dispatch(initialiseBlogs())
    await dispatch(initialiseUsers())
    setIsLoading(false)
  },[dispatch])

  useEffect(() => {
    fetchInitialData()
  }, [fetchInitialData])


  return (
    <div className='App'>
      <Router>
        <Container>
          <header>
            <h1 >Blog App</h1>
            <Notification />
            <NavBar />
          </header>
          <main>
            <Container className='main-container'>
              {!isLoading && <Routes />}
            </Container>
          </main>
        </Container>
      </Router>
    </div>
  )
}

export default App