import React from 'react'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    const { grade = {} } = this.props
    const { received = '', score = '', _id = '' , title= '', description = '', link = '', student_id = '', student_first = '', student_last = ''} = grade
    this.state = { received, score, _id, title, description, link, student_id, student_first, student_last }


  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }
  

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.onSubmit(this.state)


  }

  render () {
    return (
      <form onSubmit={this.handleSubmit} style={{textAlign:'center'}}>

        <div className='form-group'>

          <input
            id='received'
            onChange={this.handleChange}
            name='received'
            type='text'
            style={{width:40,textAlign:"center",display:'inline-block'}}
            value={this.state.received} />
            <strong style={{display:'inline-block',width:55}}> out of </strong>
          <input
            id='score'
            onChange={this.handleChange}
            name='score'
            type='text'
            style={{width:40,textAlign:"center",display:'inline-block'}}
            value={this.state.score} />
        </div>
        <button type='submit' className='form-control btn btn-primary' style={{width:'54%'}}>Save</button>
      </form>
    )
  }
}
