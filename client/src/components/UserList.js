import React from 'react'

const UserList = ({ store, users }) => {

  const userRows = () => {
    return users.map(user => {

      return (
        <p key={user.id}>{user.name}</p>
      )
    })
  }

  return(
    <div>
      {userRows()}
    </div>
  )
}

export default UserList