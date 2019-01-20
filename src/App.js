import React, {Component} from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'
import debounce from 'lodash/debounce'

import * as api from './utils/Api'
import Suggestions from './components/Suggestions'
import Loading from './components/Loading'
import ShowResult from './components/ShowResult'

import './App.scss'

const DEBOUNCE_DELAY = 600

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {name: '', users: [], isLoading: false, selectedName: '', isVisibleSuggestions: false}
    this.searchDebounced = debounce(this.search, DEBOUNCE_DELAY)
  }

  handleChange = e => {
    this.searchDebounced.cancel()

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
    this.setState({name: user.name, isVisibleSuggestions: false})
  }

  handleClickOutside = () => {
    this.setState({isVisibleSuggestions: false})
  }

  handleFocus = () => this.setState({isVisibleSuggestions: true})

  search = q => {
    this.setState({isLoading: true, users: []}, () => {
      api.users.get({q}).then(users => this.setState({users, isLoading: false}))
    })
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className="form-wrapper">
          <div className="full-input">
            <label>
              Name
              <input type="text" value={this.state.name} onChange={this.handleChange} onFocus={this.handleFocus} />
            </label>
          </div>
          <Loading isLoading={this.state.isLoading} />
          <Suggestions
            items={this.state.users}
            onClick={this.handleClick}
            onClickOutside={this.handleClickOutside}
            isVisible={this.state.isVisibleSuggestions}
          />
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
}

export default App
