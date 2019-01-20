import React, {Component} from 'react'

import './App.scss'

import Form from './components/Form'
import ShowResult from './components/ShowResult'

class App extends Component {
  state = {submittedValue: ''}

  handleSearch = () => console.log('search')

  handleSubmit = value => this.setState({submittedValue: value})

  render() {
    return (
      <>
        <Form onSearch={this.handleSearch} onSubmit={this.handleSubmit} />
        <ShowResult value={this.state.submittedValue} />
      </>
    )
  }
}

export default App
