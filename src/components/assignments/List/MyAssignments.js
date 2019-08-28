import React from 'react'
import { Link } from 'react-router-dom'
import '../Style/grades-style.css'

const MyAssignments = ({loggedInUserID, currentStudentsAssignments, destroyAssignment, deletedAlert, deletedTitle}) => {

  return (
    <div className='assignments'>
      {
        deletedAlert ? (
          <div className="delete-alert" style={{backgroundColor:"#d36b6b", color:"#fff",padding:10,marginBottom:15}}>Deleted {deletedTitle}!</div>
        ) : (
          <div className="delete-alert"></div>
        )
      }
      {
        currentStudentsAssignments.map((assignment) => {

          let grade_color = ''
          if(assignment.received && assignment.score){
            grade_color='green'
          }else{
            grade_color='red'
          }

          return(
            <div key={assignment._id} className="individual-assignment" style={{padding:"15px",marginBottom:"15px", width:"100%", backgroundColor:"#c9c9c9", border:"1px solid rgb(166, 163, 163)"}}>
              <div className="row">
                <div className="col-md-10">
                  <h5>{assignment.title}</h5>
                </div>
                <div className="col-md-2">
                {
                  assignment.received !== 0 ? (
                    <p className={grade_color}>{assignment.received}/{assignment.score}</p>
                  ) : (
                    <p className="tbd">Grade TBD</p>
                  )
                }

                </div>
              </div>
              <p>{assignment.description}</p>
              <p><a href={assignment.link}>Project Link</a></p>
              <Link className='student-layer-link' style={{width:'100%',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5,border:"1px solid #000", marginRight:10, color:"#000"}} to={`/assignments/${assignment._id}/edit`}>Edit</Link>
              <button className='student-layer-link' style={{paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5,border:"1px solid #000", margin:10, color:"#fff",backgroundColor:"grey"}} onClick={() => destroyAssignment(assignment._id)}>Delete</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default MyAssignments
