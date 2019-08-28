import React from 'react'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    const { assignment = {} } = this.props
    const { title = '', description = '', link = '', _id = ''} = assignment
    this.state = { title, description, link, _id, titleAlert:false, linkAlert: false }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
      titleAlert:false,
      linkAlert: false 
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if(this.state.title === "" && this.state.link === ""){
      this.setState({
        titleAlert:true,
        linkAlert: true
      })
    }else if(this.state.title === ""){
      this.setState({
        titleAlert:true
      })
    }else if(this.state.link === ""){
      this.setState({
        linkAlert:true
      })
    }else{
      if(this.state._id !== ''){
        this.props.onSubmit({
          title:this.state.title,
          description: this.state.description,
          link: this.state.link,
          _id: this.state._id
        })
      }else{
        this.props.onSubmit({
          title:this.state.title,
          description: this.state.description,
          link: this.state.link
        })
      }
    }

  }

  render () {
    const { titleAlert, linkAlert } = this.state
    return (
        <form onSubmit={this.handleSubmit}>

          <div className='form-group'>
            <label htmlFor='assignment-title'>Assignment Title</label>
            <input
              className='form-control'
              id='title'
              onChange={this.handleChange}
              name='title'
              type='text'
              value={this.state.title} />
          </div>
          <div className='form-group'>
            <label htmlFor='content'>Project Description</label>
            <textarea
              className='form-control'
              id='description'
              onChange={this.handleChange}
              name='description'
              type='text'
              value={this.state.description} />
          </div>
          <div className='form-group'>
            <label htmlFor='assignment-title'>Project Link</label>
            <input
              className='form-control'
              id='link'
              onChange={this.handleChange}
              name='link'
              type='text'
              value={this.state.link} />
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
          {
            titleAlert || linkAlert ? (
              <div style={{backgroundColor:'#e06665', color:'white', margin:15, padding:10}}>
                <ul>
                  {
                    titleAlert ? (
                      <li>Assignment Title is required!</li>
                    ) : (
                      <span></span>
                    )

                  }

                  {
                    linkAlert ? (
                      <li>Project Link is required!</li>
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
