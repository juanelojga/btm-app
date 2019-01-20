import React from 'react'
import {render, cleanup} from 'react-testing-library'

import ShowResult from '../ShowResult'

afterEach(cleanup)

test('snapshot empty value', () => {
  const {container} = render(<ShowResult />)
  expect(container).toMatchSnapshot()
})

test('snapshot', () => {
  const value = 'Juan Almeida'
  const {container} = render(<ShowResult value={value} />)
  expect(container).toMatchSnapshot()
})
