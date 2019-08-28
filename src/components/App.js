import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './header/Header'
import Nav from './nav/Nav'

import Login from './form/Login.Form'
import Signup from './form/Signup.Form'
import StudentsContainer from './students/StudentsContainer'

import { removeToken, getToken } from '../tokens/tokens'


import * as auth from '../api/auth'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      loggedInUserID: null,
      loading: true,
      loginAlert: false,
      signupAlert:false
    }

  }


  //When the react component gets loaded/mounted, the code inside of it will check to see if there is a valid token in the users local storage.
  //If the token already exists in local storage, then it will make a call to our /profile route and the json that gets back is used to set the 'currentUserId' state to the users // IDEA:
componentDidMount () {

  const token = getToken()

  if (token) {
    // const profile = await auth.profile()

    auth.profile()
    .then((resp) => {
      if(resp){
        this.setState({
          loggedInUserID: resp.user._id,
          loggedIntUserEmail: resp.user.email,
          loggedinUserFirst: resp.user.firstname,
          isAdmin: resp.user.admin
        })
      }
    })


  }

  this.setState({loading: false})

}


  // //Async Version
loginUser = (user) => {

  auth.login(user)
  .then((resp) => {
    try{
      if(resp.status === 200){
        auth.profile()
        .then((prof) => {
          if(prof){
            this.setState({
              loggedInUserID: prof.user._id,
              loggedIntUserEmail: prof.user.email,
              loggedinUserFirst: prof.user.firstname,
              loggedinUserLast: prof.user.lastname,
              isAdmin: prof.user.admin
            })
          }
        })
      }
    }catch(e){
      console.error(e)
      this.setState({
        loginAlert: true
      })
    }
  })

}

signupUser = async (user) => {
  auth.signup(user)
  .then((resp) => {
    try{
      if(resp.status === 201){
        auth.profile()
        .then((prof) => {
          this.setState({
            loggedInUserID: prof.user._id,
            loggedIntUserEmail: prof.user.email,
            loggedinUserFirst: prof.user.firstname,
            loggedinUserLast: prof.user.lastname,
            isAdmin: prof.admin
          })
        })
      }else{
        this.setState({
          signupAlert: true
        })
      }
    }catch(e){
      console.error(e)
      this.setState({
        signupAlert: true
      })
    }
  })
}


logoutUser = () => {
 removeToken()
  this.setState({loggedInUserID: null})
}



  render () {
    const { loggedInUserID, loggedinUserFirst, loggedinUserLast, isAdmin, loading, loginAlert, signupAlert } = this.state

    if(loading) return <p>Loading...</p>

    return (
      <Router>
        <Header />
        <Nav
          loggedInUserID={loggedInUserID}
          logoutUser={this.logoutUser}
          loggedinUserFirst={loggedinUserFirst}
          loggedinUserLast={loggedinUserLast}
          isAdmin={isAdmin}
        />

        <Switch>

          <Route path='/login' exact component={() => {
            return loggedInUserID ? (
              <Redirect to='/' />
            ) : (
              <Login onSubmit={this.loginUser} signup={false} loginAlert={loginAlert}/>
            )
          }} />



          <Route path='/signup' exact component={() => {
            return loggedInUserID ? (
              <Redirect to='/students' />
            ) : (
              <Signup onSubmit={this.signupUser} signup={true} signupAlert={signupAlert}/>
            )
          }} />





        
          <Route path='/' component={() => {
            return loggedInUserID ? (
              <StudentsContainer isAdmin={isAdmin} loggedInUserID={loggedInUserID}/>
            ) : (
              <Redirect to='/login' />
            )
          }} />





          <Redirect to='/login' />

        </Switch>

      </Router>
    )
  }
}

export default App
