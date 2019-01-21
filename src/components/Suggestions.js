import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Loading from './Loading'

import './Suggestions.scss'

class Suggestions extends Component {
  constructor(props) {
    super(props)
    this.listRef = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick)
  }

  handleClick = e => {
    this.props.onClick(e.target.id)
  }

  handleOutsideClick = e => {
    const node = this.listRef.current

    if (node && !node.contains(e.target)) {
      this.props.onClickOutside()
    }
  }

  render() {
    const {items, isLoading, onClickOutside} = this.props
    return (
      <div ref={this.listRef} className="suggestion">
        {isLoading ? (
          <Loading isLoading={isLoading} />
        ) : items.length ? (
          <ul className="list">
            {items.map(user => (
              <li key={user.id} id={user.id} onClick={this.handleClick}>
                {user.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text" onClick={onClickOutside}>
            No results were found...
          </p>
        )}
      </div>
    )
  }
}

Suggestions.defaultProps = {
  items: [],
  isLoading: false,
}

Suggestions.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func,
  onClickOutside: PropTypes.func,
  isLoading: PropTypes.bool,
}

export default Suggestions
