import React from 'react'
import {render} from 'react-testing-library'
import faker from 'faker'

import ShowResult from '../ShowResult'

test('snapshot empty value', () => {
  const {container} = render(<ShowResult />)
  expect(container).toMatchSnapshot()
})

test('snapshot', () => {
  const value = faker.hacker.noun()
  const {container} = render(<ShowResult value={value} />)
  expect(container).toMatchSnapshot()
})
