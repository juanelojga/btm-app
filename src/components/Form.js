import React, {Component} from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'

import * as api from '../utils/Api'
import List from './List'
import Loading from './Loading'

import './Form.scss'

class Form extends Component {
  state = {name: '', users: [], isLoading: false}

  handleChange = e => {
    const {minNumberOfChars} = this.props
    const value = e.target.value

    const hasNameMinLength = value.length >= minNumberOfChars
    this.setState({name: value, isLoading: hasNameMinLength, users: []}, () => {
      if (hasNameMinLength) {
        api.users.get({q: value}).then(users => this.setState({users, isLoading: false}))
      } else {
        this.setState({users: []})
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state.name)
  }

  handleClick = value => {
    const {users} = this.state
    const user = find(users, ['id', value])
    this.setState({name: user.name, users: []})
  }

  handleClickOutside = () => {
    this.setState({users: []})
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
        <Loading isLoading={this.state.isLoading} />
        <List items={this.state.users} onClick={this.handleClick} onClickOutside={this.handleClickOutside} />
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
  onSubmit: PropTypes.func,
}

export default Form
