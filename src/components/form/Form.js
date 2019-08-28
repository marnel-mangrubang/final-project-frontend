import React from 'react'
import './Form.css'

class Form extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      firstname:'',
      lastname:'',
      firstnameAlert:false,
      emailAlert: false
    }

  }

  handleChange =  ({ target: { name, value } }) => {


    this.setState({
      [name]: value,
      firstnameAlert: false,
      emailAlert: false
     })
  }

  handleSubmit = (e) => {


    e.preventDefault()

    const { signup } = this.props

    if(signup){
        if(this.state.firstname === "" && this.state.email === ""){
          this.setState({
            firstnameAlert:true,
            emailAlert: true
          })
        }else if(this.state.firstname === ""){
          this.setState({
            firstnameAlert:true
          })
        }else if(this.state.email === ""){
          this.setState({
            emailAlert:true
          })
        }else{

            this.props.onSubmit({
              firstname:this.state.firstname,
              lastname: this.state.lastname,
              email: this.state.email,
              password: this.state.password
            })

        }

    }else{
      this.props.onSubmit(this.state)
    }
    // this.props.history.push('/users')
  }

  render () {

    const { signup, loginAlert, signupAlert } = this.props
    const { firstnameAlert, emailAlert } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <div className='row'>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              className='form-control'
              id='email'
              onChange={this.handleChange}
              name='email'
              type='text'
              value={this.state.email} />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              className='form-control'
              id='password'
              onChange={this.handleChange}
              name='password'
              type='password'
              value={this.state.password} />
          </div>
        </div>

        {

          signup ?
          (
          <div className='row'>
            <div className='form-group'>
              <label htmlFor='firstname'>First Name</label>
              <input
                className='form-control'
                id='firstname'
                onChange={this.handleChange}
                name='firstname'
                type='text'
                value={this.state.firstname} />
            </div>
            <div className='form-group'>
              <label htmlFor='lastname'>Last Name</label>
              <input
                className='form-control'
                id='lastname'
                onChange={this.handleChange}
                name='lastname'
                type='text'
                value={this.state.lastname} />
            </div>
          </div>

          ) : (
            <div></div>
          )
        }
        <button type='submit' className='btn btn-primary'>Submit</button>

        {
          loginAlert ? (
            <div className="login-alert">Invalid login credentials. Please check your email and password and try again!</div>
          ) : (
            <div></div>
          )
        }

        {
          signupAlert ? (
            <div className="login-alert">Username already taken!</div>
          ) : (
            <div></div>
          )
        }
        {
          firstnameAlert ? (
            <div style={{backgroundColor:'#e06665', color:'white', marginTop:15, padding:10}}>
              <ul>
                {
                  firstnameAlert ? (
                    <li>First Name is required!</li>
                  ) : (
                    <span></span>
                  )

                }

                {
                  emailAlert ? (
                    <li>Email is required!</li>
                  ) : (
                    <span></span>
                  )
                }
              </ul>
            </div>
          ) : (
            <div></div>
          )

        }

      </form>


    )
  }
}

export default Form
