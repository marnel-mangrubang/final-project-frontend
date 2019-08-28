import React from 'react'
import { Link } from 'react-router-dom'

const Unauthenticated = () => {

  return(
    <ul className='nav justify-content-left'>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>Login</Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/signup'>Signup</Link>
      </li>
    </ul>
  )

}

export default Unauthenticated
