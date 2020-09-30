import React, { useState } from 'react'
import userService from '../../services/user'

const User = ({ user }) => {
    return (
        <table>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
            <tr>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
            </tr>
        </table>
    )
}


const UserList = () => {

    const [users, setUsers] = useState('')
    
    useEffect(() => {
        userService.getAll().then(users => setUsers(users))
    },[])

    const byBlogs = (a1,a2) => a1.blogs.length - a2.blogs.length
    
    return (
        <div>
          <h2>Users</h2>
          {users && [...users].sort(byBlogs).map(user => 
            <User
              key={user.id}
              user={user}
              />  
          )}
        </div>
    )
}

export default UserList