import React from 'react'
import {render, fireEvent, cleanup, getByText as getByTextAssert} from 'react-testing-library'

import * as generators from '../../test/generators'
import Suggestions from '../Suggestions'

afterEach(cleanup)

test('calls onClick with the id of the user clicked', () => {
  const users = generators.generateUsers()

  const handleClick = jest.fn()
  const handleClickOutside = jest.fn()

  const {getByText} = render(
    <Suggestions items={users} isLoading={false} onClick={handleClick} onClickOutside={handleClickOutside} />,
  )

  fireEvent.click(getByText(users[0].name))

  expect(handleClick).toHaveBeenCalledTimes(1)
  expect(handleClick).toHaveBeenCalledWith(users[0].id)

  expect(handleClickOutside).not.toHaveBeenCalled()
})

test('shows no results if items are empty', () => {
  const users = []

  const handleClick = jest.fn()
  const handleClickOutside = jest.fn()

  const {container} = render(
    <Suggestions items={users} isLoading={false} onClick={handleClick} onClickOutside={handleClickOutside} />,
  )

  getByTextAssert(container, 'No results were found...')
})

test('snapshot', () => {
  const users = [{id: 1, name: 'Juan Almeida'}, {id: 2, name: 'Patricio Almeida'}]

  const {container} = render(<Suggestions items={users} isLoading={false} />)
  expect(container).toMatchSnapshot()
})
