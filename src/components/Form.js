import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './Form.scss'

class Form extends Component {
  state = {name: ''}

  handleChange = e => {
    this.setState({name: e.target.value}, () => {
      if (this.state.name.length >= this.props.minNumberOfChars) {
        this.props.onSearch(this.state.name)
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state.name)
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
        <input type="submit" value="Submit" className="button" disabled={!this.state.name} />
      </form>
    )
  }
}

Form.defaultProps = {
  minNumberOfChars: 3,
}

Form.propTypes = {
  minNumberOfChars: PropTypes.number,
  onSearch: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default Form
