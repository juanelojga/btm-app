import React from 'react'
import PropTypes from 'prop-types'
import {BeatLoader} from 'react-spinners'

import './Loading.scss'

const Loading = ({isLoading}) => {
  const className = ['loading']
  if (isLoading) className.push('show')

  return (
    <div className={className.join(' ')}>
      <BeatLoader loading={isLoading} color="#36D7B7" />
    </div>
  )
}

Loading.defaultProps = {
  isLoading: false,
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
}

export default Loading
