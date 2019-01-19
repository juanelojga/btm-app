import React, {Component} from 'react'

import './Form.scss'

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {name: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({name: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('handleSubmit')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-wrapper">
        <div className="full-input">
          <label>
            Name
            <input type="text" value={this.state.name} onChange={this.handleChange} />
          </label>
        </div>
        <input type="submit" value="Submit" className="button" />
      </form>
    )
  }
}

export default Form
