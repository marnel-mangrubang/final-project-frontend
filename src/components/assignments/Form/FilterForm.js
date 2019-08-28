import React from 'react'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    const { grade = {} } = this.props
    const { above = '', below = '', _id = ''} = grade
    this.state = { above, below, _id }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()

    this.props.onSubmit(this.state)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit} style={{marginBottom:20}}>
          <strong style={{display:'inline-block',width:130}}> Score is Above: </strong>
          <input
          id='above'
          onChange={this.handleChange}
          name='above'
          type='text'
          style={{width:30,textAlign:"center",display:'inline-block'}}
          value={this.state.above} />

          <strong style={{display:'inline-block',width:130, marginLeft:10}}> Score is Below: </strong>
          <input
          id='below'
          onChange={this.handleChange}
          name='below'
          type='text'
          style={{width:30,textAlign:"center",display:'inline-block'}}
          value={this.state.below} />
          <button type='submit' className='btn-primary' style={{width:50, display:'inline-block', marginLeft:30}}>Filter</button>
      </form>
    )
  }
}
