import React from 'react'
import PropTypes from 'prop-types'

const ShowSubmittedValue = ({value}) => <div>Submitted Value: {value}</div>

ShowSubmittedValue.propTypes = {
  value: PropTypes.string,
}

export default ShowSubmittedValue
