import React from 'react'
import ScoreForm from '../Form/ScoreForm'

const AssignmentList = ({ loggedInUserID, assignments, onSubmit }) => {

  return (
    <div className='assignments-list'>

      {

        assignments.map((grade) => {
          return(

            <div key={grade._id} className='student-layer' style={{width:'100%', display:'block',padding:'20px',borderBottom:'3px solid #fff',backgroundColor:'#c9c9c9'}}>
              <div className="row">
                <div className="col-md-9">
                  <p><span style={{fontSize:20,fontWeight:'bold'}}>{grade.title}</span>  by  <span style={{fontSize:20,fontWeight:'bold'}}>{grade.student_first} {grade.student_last}</span></p>
                  <p>{grade.description}</p>
                  <p><a href={grade.link}>Project Link</a></p>
                </div>
                <div className="col-md-3">
                  <ScoreForm grade={grade} onSubmit={onSubmit} />
                </div>
              </div>


            </div>


          )
        })
      }
    </div>
  )
}

export default AssignmentList
