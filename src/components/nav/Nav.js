import React from 'react'

import Authenticated from './Nav.Authenticated'
import Unauthenticated from './Nav.Unauthenticated'

const Nav = ({ loggedInUserID, loggedIntUserEmail, logoutUser, loggedinUserFirst, loggedinUserLast, isAdmin }) => {

  return (
    <section className='bg-light border-bottom mb-4'>
      <div className='container'>
        {
          loggedInUserID ? (
            <Authenticated
              loggedInUserID={loggedInUserID}
              loggedIntUserEmail={loggedIntUserEmail}
              logoutUser={logoutUser}
              loggedinUserFirst={loggedinUserFirst}
              loggedinUserLast={loggedinUserLast}
              isAdmin={isAdmin}
            />
          ) : (
            <Unauthenticated />
          )

        }
      </div>
    </section>
  )

}


export default Nav
