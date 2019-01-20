import React, {Component} from 'react'

import Form from './components/Form'

class App extends Component {
  handleSearch = () => console.log('search')

  handleSubmit = () => console.log('submit')

  render() {
    return <Form onSearch={this.handleSearch} onSubmit={this.handleSubmit} />
  }
}

export default App
