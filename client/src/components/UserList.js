import React from 'react'

const UserList = ({ store, users }) => {

  const userRows = () =>
    users.map(user =>
      <p key={user.id}>{user.name} {user.isAdmin ? ", ylläpitäjä" : null}</p>
    )

  return(
    <div className="container">
      <h3>Käyttäjät:</h3>
      {userRows()}
    </div>
  )
}

export default UserList