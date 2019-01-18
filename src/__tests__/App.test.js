import React from 'react'
import {render} from 'react-testing-library'

import App from '../App'

test('snapshot', () => {
  const {container} = render(<App />)
  expect(container).toMatchSnapshot()
})
