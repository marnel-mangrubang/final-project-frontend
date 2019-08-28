import React from 'react'
import Form from './Form'

 const Login = ({ signup, onSubmit, loginAlert }) => {

   return(
    <main className='container'>
      <section className='row justify-content-md-center'>
        <div className='col col-lg-5'>
          <h1>Login</h1>

          <Form onSubmit={onSubmit} signup={signup} loginAlert={loginAlert}/>

        </div>
      </section>
    </main>
  )

}

export default Login
