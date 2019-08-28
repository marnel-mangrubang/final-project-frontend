import React from 'react'
import { withRouter } from 'react-router'
import NewForm from './Form/New.Form'
import { Route } from 'react-router-dom'


import * as api from '../../api/assignment'
// import * as assignment from '../../api/assignment'

class AssignmentContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      allstudents: [],
      currentStudentsAssignments:[],
      loading:false
    }

  }


  async componentDidMount(){
    // const token = window.localStorage.getItem('journal-app')
    // if(token){
    //   const getPosts = await refetchUsers()
    //   this.setState({
    //     loading: false
    //   })
    // }
  }






createAssignment = async (assignment) => {
    const { loggedInUserID, history, refetchAssignments } = this.props
    await api.createNewAssignment(loggedInUserID, assignment)
    await refetchAssignments()
    history.push(`/`)
}







  render () {

    const { loggedInUserID } = this.props
    
    return (
      <main className='container'>



      <Route path='/assignments/new' exact component={() => {
            return <NewForm
                    onSubmit={this.createAssignment}
                    loggedInUserID={loggedInUserID}
                    />
        }} />






      </main>
    )
  }
}

export default withRouter(AssignmentContainer)
