import React, {Component} from 'react'
import PropTypes from 'prop-types'

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
    const {items, onClickOutside, isVisible} = this.props

    if (node && !node.contains(e.target) && items.length && isVisible) {
      onClickOutside()
    }
  }

  render() {
    const {items, isVisible} = this.props
    return (
      <div ref={this.listRef} className="list">
        {items.length && isVisible ? (
          <ul>
            {items.map(user => (
              <li key={user.id} id={user.id} onClick={this.handleClick}>
                {user.name}
              </li>
            ))}
          </ul>
        ) : (
          ''
        )}
      </div>
    )
  }
}

Suggestions.defaultProps = {
  items: [],
  isVisible: false,
}

Suggestions.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func,
  onClickOutside: PropTypes.func,
  isVisible: PropTypes.bool,
}

export default Suggestions
