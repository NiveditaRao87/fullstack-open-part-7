import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'reactstrap'

const User = ({ user, history }) => {

  const rowStyle = {
    cursor: 'pointer'
  }

  const handleClick = () => {
    history.push(`/users/${user.id}`)
  }
  return (
    <tr
      style={rowStyle}
      onClick={handleClick}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
      tabIndex='0'>
      <td>{user.name}</td>
      <td>{user.blogs.length}</td>
    </tr>

  )
}


const UserList = ({ history }) => {

  const users = useSelector(state => state.users)

  const byBlogs = (a1,a2) => a2.blogs.length - a1.blogs.length

  return (
    <div>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody id='user-list'>
          {[...users].sort(byBlogs).map(user =>
            <User
              key={user.id}
              user={user}
              history={history}
            />
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList