import React, {Component} from 'react'
import PropTypes from 'prop-types'

class List extends Component {
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
    console.log(e.target.id)
  }

  handleOutsideClick = e => {
    const node = this.listRef.current
    const {items} = this.props

    if (node && !node.contains(e.target) && items.length) {
      console.log('close')
    }
  }

  render() {
    const {items} = this.props
    return (
      <div ref={this.listRef}>
        {items.length ? (
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

List.defaultProps = {
  items: [],
}

List.propTypes = {
  items: PropTypes.array,
}

export default List
