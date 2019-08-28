import React from 'react'
import Form from './Form'

 const Signup = ({ signup, onSubmit, signupAlert }) => {

   return(
    <main className='container'>
      <section className='row justify-content-md-center'>
        <div className='col col-lg-5'>
          <h1>Signup</h1>
          <Form onSubmit={onSubmit} signup={signup} signupAlert={signupAlert} />
        </div>
      </section>
    </main>
  )

}

export default Signup
