import React from 'react'
import PropTypes from 'prop-types'

const ShowResult = ({value}) => <p>Submitted Value: {value}</p>

ShowResult.defaultProps = {
  value: '',
}

ShowResult.propTypes = {
  value: PropTypes.string,
}

export default ShowResult
