import React, {Component} from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'
import debounce from 'lodash/debounce'

import Suggestions from './components/Suggestions'
import ShowResult from './components/ShowResult'

import './App.scss'

const DEBOUNCE_DELAY = 600

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {name: '', users: [], selectedName: '', showSuggestions: false, isLoading: false, isFocussed: false}
    this.searchDebounced = debounce(this.search, DEBOUNCE_DELAY)
  }

  handleChange = e => {
    const {minNumberOfChars} = this.props
    const value = e.target.value

    this.setState({name: value}, () => {
      if (value.length >= minNumberOfChars) {
        this.searchDebounced(value)
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const {name} = this.state
    this.setState({selectedName: name})
  }

  handleClick = value => {
    const {users} = this.state
    const user = find(users, ['id', value])
    this.setState({name: user.name, showSuggestions: false})
  }

  handleClickOutside = () => {
    this.setState({showSuggestions: false})
  }

  handleOnFocus = () => {
    this.setState({isFocussed: true})
  }

  handleOnBlur = () => {
    this.setState({isFocussed: false})
  }

  search = q => {
    this.setState({isLoading: true, showSuggestions: true}, () => {
      this.props.api.users.get({q}).then(users => {
        const {name} = this.state
        const showSuggestions = name.length >= this.props.minNumberOfChars
        this.setState({users, showSuggestions, isLoading: false})
      })
    })
  }

  render() {
    const inputClassName = ['form-control']
    if (this.state.isFocussed) inputClassName.push('show-focus')

    return (
      <>
        <form onSubmit={this.handleSubmit} className="form-wrapper">
          <div className={inputClassName.join(' ')}>
            <label>
              Name
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
                onFocus={this.handleOnFocus}
                onBlur={this.handleOnBlur}
              />
            </label>
          </div>
          {this.state.showSuggestions ? (
            <Suggestions
              items={this.state.users}
              onClick={this.handleClick}
              onClickOutside={this.handleClickOutside}
              isLoading={this.state.isLoading}
            />
          ) : (
            ''
          )}

          <input type="submit" value="Submit" className="button" disabled={!this.state.name} />
        </form>
        <ShowResult value={this.state.selectedName} />
      </>
    )
  }
}

App.defaultProps = {
  minNumberOfChars: 3,
}

App.propTypes = {
  minNumberOfChars: PropTypes.number,
  api: PropTypes.object,
}

export default App
