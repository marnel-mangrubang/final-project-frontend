import React from 'react'
import './StudentList.css'


  class StudentList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      score_above: '',
      score_below:''
    }

  }


  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }



render () {

  const { students, isAdmin, calculateStudentGrade} = this.props

  return (
    <main className='students-list container'>
    {
      isAdmin ? (
        <div>
          <div className="admin-filter row">
            <div className="above col-md-12" style={{padding:20}}>

                <strong>Score is Above: </strong>
                <input id='score_above' onChange={this.handleChange} name='score_above' type='text' value={this.state.score_above} style={{width:40}}/>

                <strong style={{paddingLeft:10}}>Score is Below: </strong>
                <input id='score_below' onChange={this.handleChange} name='score_below' type='text' value={this.state.score_below} style={{width:40}}/>
                <button type='submit' onClick={() => calculateStudentGrade(this.state)} className='btn-primary' style={{height:29,width:50,marginLeft:20}}>Filter</button>

            </div>
          </div>

        </div>
        // <FilterForm onSubmit={onSubmit} />
      ) : (
        <div></div>
      )
    }


    {
      students.map((student) => {
        let student_grade = 0
        if(student.myscore !== 0  && student.totalgrade !== 0){
          student_grade = Math.floor((student.myscore/student.totalgrade)*100)
        }

        let grade_color = ''
        if(student_grade >= 90){
          grade_color = 'green'
        }else if(student_grade >= 80 && student_grade < 90){
          grade_color = 'blue'
        }else if(student_grade >= 70 && student_grade < 80){
          grade_color = 'purple'
        }else if(student_grade >= 60 && student_grade < 70){
          grade_color = 'orange'
        }else if(student_grade >= 50 && student_grade < 60){
          grade_color = 'red'
        }else{
          grade_color = 'black'
        }

        return(
          <div key={student._id} className='student-layer row' style={{ padding:'20px',borderBottom:'3px solid #fff',backgroundColor:'#c9c9c9'}}>
            <div className="col-sm-11 col-xs-11"><strong>{student.firstname} {student.lastname}</strong> - {student.email}</div>
            {

              isAdmin ? (
                <div className="col-sm-1 col-xs-1">
                  <span className={grade_color}>
                  {student_grade}/100
                  </span>
                </div>
              ):(
                <div></div>
              )
            }
          </div>
        )
      })
    }

    </main>
  )

  }
}

export default StudentList
