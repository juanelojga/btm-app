import React from 'react'
import {render, fireEvent} from 'react-testing-library'

import Form from '../Form'

test('calls onSearch with a string that has more than 3 characters', () => {
  const word = 'example'
  const handleSearch = jest.fn()
  const {getByLabelText} = render(<Form onSearch={handleSearch} />)

  const name = getByLabelText(/name/i)

  fireEvent.change(name, {target: {value: word}})

  expect(handleSearch).toHaveBeenCalledTimes(1)
  expect(handleSearch).toHaveBeenCalledWith(word)
})

test('not calls onSearch with a string that has less than 3 characters', () => {
  const word = 'ex'
  const handleSearch = jest.fn()
  const {getByLabelText} = render(<Form onSearch={handleSearch} />)

  const name = getByLabelText(/name/i)

  fireEvent.change(name, {target: {value: word}})

  expect(handleSearch).not.toHaveBeenCalled()
})

test('calls onSearch with a string that has 2 characters because the allowed number of chars is 2', () => {
  const word = 'ex'
  const handleSearch = jest.fn()
  const {getByLabelText} = render(<Form onSearch={handleSearch} minNumberOfChars={2} />)

  const name = getByLabelText(/name/i)

  fireEvent.change(name, {target: {value: word}})

  expect(handleSearch).toHaveBeenCalledTimes(1)
  expect(handleSearch).toHaveBeenCalledWith(word)
})

test('calls onSubmit when submitted', () => {
  const word = 'example'
  const handleSearch = jest.fn()
  const handleSubmit = jest.fn()
  const {getByLabelText, getByText} = render(<Form onSearch={handleSearch} onSubmit={handleSubmit} />)

  const name = getByLabelText(/name/i)

  fireEvent.change(name, {target: {value: word}})
  getByText(/submit/i).click()

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(word)
})

test('not calls onSubmit when submitted, name input is empty', () => {
  const handleSearch = jest.fn()
  const handleSubmit = jest.fn()
  const {getByText} = render(<Form onSearch={handleSearch} onSubmit={handleSubmit} />)

  getByText(/submit/i).click()

  expect(handleSubmit).not.toHaveBeenCalled()
})

test('snapshot', () => {
  const {container} = render(<Form />)
  expect(container).toMatchSnapshot()
})
