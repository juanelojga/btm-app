import React from 'react'
import PropTypes from 'prop-types'

const ShowResult = ({value}) => <div>Submitted Value: {value}</div>

ShowResult.defaultProps = {
  value: '',
}

ShowResult.propTypes = {
  value: PropTypes.string,
}

export default ShowResult
