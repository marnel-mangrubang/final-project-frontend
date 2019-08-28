import React from 'react'
import { getToken } from '../../tokens/tokens'
import StudentList from './List/StudentList'
import MyAssignments from '../assignments/List/MyAssignments'
import { Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'

import EditForm from '../assignments/Form/Edit.Form'


import AssignmentsContainer from '../assignments/AssignmentsContainer'
import AssignmentList from '../assignments/List/AssignmentList'

import * as api from '../../api/user'
import * as assignmentapi from '../../api/assignment'

class StudentsContainer extends React.Component {
  constructor (props) {

    super(props)

    this.state = {
      allstudents: [],
      currentStudentsAssignments:[],
      loading:true,
      deletedAlert:false,
      deletedTitle:''
    }


  }


 async componentDidMount(){

   const { loggedInUserID } = this.props

   const token = getToken()

   if(token){
     const allstudents = []
     const allusers = await api.getAllUsers()

     const studentassignments = await assignmentapi.getStudentAssignment(loggedInUserID)



     const justuserinfo = allusers.user.map((individual_user) => {
       return individual_user;
     })

     justuserinfo.map((student) => {
          let myscore = 0
          let thetotal = 0

         if(student.admin === false){
           student.assignments.map((temp) => {
             myscore += temp.received
             thetotal += temp.score
           })

           allstudents.push({
             ...student,
             myscore: myscore,
             totalgrade : thetotal
           })

           this.setState({
             allstudents: allstudents,
             tempallstudents: allstudents
           })
         }

     })

     this.setState({
       currentStudentsAssignments: studentassignments.assignment,
       loading: false,
       deletedAlert: false
     })

     this.getAllAssignments()
     this.calculateStudentGrade()

   }


 }


 refetchAssignments = async () => {
  const { loggedInUserID } = this.props
  const getAssignmentsAgain = await assignmentapi.getStudentAssignment(loggedInUserID)
  this.setState({ currentStudentsAssignments: getAssignmentsAgain.assignment })
}



getAllAssignments = async () => {
   const all_assignments = []
   // const student_grade = []
   const { loggedInUserID } = this.props
   const { allstudents } = this.state


   allstudents.map((student) => {

     if(student.assignments.length > 0){

       student.assignments.map((temp) => {
         all_assignments.push({
           ...temp,
           student_first:student.firstname,
           student_last: student.lastname,
           student_id: student._id
         })
       })
     }

   })


   const ungraded = all_assignments.filter((nograde) => {
     return nograde.received === 0
   })

   const graded = all_assignments.filter((withgrade) => {
     return withgrade.received !== 0
   })

console.log("BACK INSIDE THE getALL ASSIGNMENTS", graded, ungraded)

   const getAssignmentsAgain = await assignmentapi.getStudentAssignment(loggedInUserID)
   this.setState({
     currentStudentsAssignments: getAssignmentsAgain.assignment,
     allAssignments:all_assignments,
     ungraded: ungraded,
     graded: graded
   })
}


destroyAssignment = async(assignment) => {
 const { loggedInUserID, history } = this.props

 const oneassignment = await assignmentapi.getOneAssignment(loggedInUserID, assignment)

 await assignmentapi.deleteAssignment(loggedInUserID, assignment)

 this.setState({
   deletedAlert:true,
   deletedTitle: oneassignment.assignment.title
 })
 await this.refetchAssignments()
 history.push(`/`)
}



editAssignment = async (assignment) => {
  const { loggedInUserID, history } = this.props
  await assignmentapi.updateAssignment(loggedInUserID, assignment)
  await this.refetchAssignments()
  history.push(`/`)
}




saveScore = async (assignment) => {

  const { history, getAllAssignments } = this.props
  await assignmentapi.updateScore(assignment)
  console.log('updateScore is finished')


  const received = parseInt(assignment.received)
  const score = parseInt(assignment.score)

  const onestudent = await api.getOneUser(assignment.student_id)


  if(onestudent){
    let newtotal
    if(received === 0 && score === 0){
      newtotal = onestudent.totalgrade - parseInt(assignment.received)
    }else{
      newtotal = onestudent.totalgrade + parseInt(assignment.received)

    }

    await api.updateTotalGrade(assignment, newtotal)
    console.log('updateTotalGrade is finished')
    setTimeout(() => {
        this.getAllAssignments()
    }, 3000)

    history.push(`/`)
  }

  this.setState({loading:false})


}





calculateStudentGrade = async (param) => {

  const allstudentscopy = this.state.allstudents.slice()

  if(param){
    const { score_above, score_below } = param


    if(score_above !== '' && score_below !== ''){
      const scoresbetween = allstudentscopy.filter((student) => {

        if(student.myscore > 0){
          const grade = (student.myscore / student.totalgrade) * 100

          if(grade >= score_above && grade <= score_below){
            return student
          }
        }

      })

      this.setState({
        tempallstudents:scoresbetween
      })
    }else{
      this.setState({
        tempallstudents:allstudentscopy
      })
    }

  }

}




  render () {

    const { loggedInUserID, isAdmin } = this.props
    const { currentStudentsAssignments, deletedAlert, deletedTitle, ungraded, graded, loading, tempallstudents } = this.state

    //
    if (loading) return <div></div>

    return (
      <main className='container'>

        <Route path='/' exact component={() => {
          return isAdmin ? (
            <Redirect to='/students' />
          ) : (

            <MyAssignments
              loggedInUserID={loggedInUserID}
              currentStudentsAssignments={currentStudentsAssignments}
              destroyAssignment={this.destroyAssignment}
              deletedAlert={deletedAlert}
              deletedTitle={deletedTitle}
            />

          )
        }} />


        <Route path='/students' exact component={() => {
          return <StudentList
                    students={tempallstudents}
                    isAdmin={isAdmin}
                    calculateStudentGrade={this.calculateStudentGrade}
                  />
        }} />


        <Route path='/assignments/ungraded' exact component={() => {
          return isAdmin ? (
            <AssignmentList
              loggedInUserID={loggedInUserID}
              assignments={ungraded}
              onSubmit={this.saveScore}
            />
          ) : (
            <Redirect to='/students' />
          )
        }} />


        <Route path='/assignments/graded' exact component={() => {
          return isAdmin ? (
            <AssignmentList
              loggedInUserID={loggedInUserID}
              assignments={graded}
              onSubmit={this.saveScore}
            />
          ) : (
            <Redirect to='/students' />
          )
        }} />




        <Route path='/assignments/new' exact component={({ match }) => {
          return <AssignmentsContainer refetchAssignments={this.refetchAssignments} loggedInUserID={loggedInUserID} />
        }} />



        <Route path='/assignments/:assignmentId/edit' exact component={({ match }) => {
          // const user = users.find(user => user._id === match.params.userId)
          const assignment = currentStudentsAssignments.find(work => work._id === match.params.assignmentId)

          return <EditForm onSubmit={this.editAssignment} assignment={assignment} loggedInUserID={loggedInUserID}/>
        }} />


      </main>
    )
  }
}

export default withRouter(StudentsContainer)
