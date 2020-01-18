import React from 'react'

const UserList = ({ store, users }) => {

  const userRows = () => {
    return users.map(user => {

      return (
      <p key={user.id}>{user.name} {user.isAdmin ? ", ylläpitäjä" : null}</p>
      )
    })
  }

  return(
    <div>
      <h3>Käyttäjät:</h3>
      {userRows()}
    </div>
  )
}

export default UserList