import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const Authenticated = ({ loggedInUserID, loggedIntUserEmail, history, logoutUser, loggedinUserFirst, loggedinUserLast, isAdmin }) => {

  const logout = () => {
    logoutUser()
    history.push('/login')
  }

  return (
    <div className="row">
    <div className="col-md-10">
    <ul className='nav justify-content-left'>
      {
        isAdmin ? (
          <li></li>
        ):(
          <li className='nav-item'>
            <Link className='nav-link' to='/'>Home</Link>
          </li>
        )
      }
      <li className='nav-item'>
        <Link className='nav-link' to='/students'>All Students</Link>
      </li>
      <li className='nav-item'>
      {
        isAdmin ? (
          <li className='nav-item'>
            <Link className='nav-link' to={`/assignments/ungraded`}>
              Ungraded Assignments
            </Link>
          </li>
        ) : (
          <li className='nav-item'>
            <Link className='nav-link' to={`/assignments/new`}>
              Create New Assignment
            </Link>
          </li>
        )
      }
      </li>
      {
      isAdmin ? (
         <li className='nav-item'>
            <Link className='nav-link' to={`/assignments/graded`}>
              Graded Assignments
            </Link>
          </li>
        ) : (
          <li>
          </li>
        )
      }
      <li className='nav-item'>
        <button
          className='btn btn-link'
          onClick={logout}>
            Logout
        </button>
      </li>

    </ul>
    </div>

    <div className="col-md-2" style={{paddingTop:'7px', paddingLeft:'32px'}}>
      Welcome {loggedinUserFirst}!
    </div>

    </div>
  )
}

export default withRouter(Authenticated)
