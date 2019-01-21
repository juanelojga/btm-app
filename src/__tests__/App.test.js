import React from 'react'
import {render, fireEvent, wait, cleanup} from 'react-testing-library'
import faker from 'faker'

import App from '../App'

afterEach(cleanup)

test('calls users get when input has 3 or more characters', async () => {
  const value = 'example'
  const fakeApi = {
    users: {
      get: jest.fn(() => Promise.resolve()),
    },
  }
  const {getByLabelText} = render(<App api={fakeApi} />)

  const name = getByLabelText('Name')
  fireEvent.change(name, {target: {value}})

  await wait(() => {
    expect(fakeApi.users.get).toHaveBeenCalledTimes(1)
    expect(fakeApi.users.get).toHaveBeenCalledWith({q: value})
  })
})

test('not calls users get when input less than 3 characters', async () => {
  const value = 'ex'
  const fakeApi = {
    users: {
      get: jest.fn(() => Promise.resolve()),
    },
  }
  const {getByLabelText} = render(<App api={fakeApi} />)

  const name = getByLabelText('Name')
  fireEvent.change(name, {target: {value}})

  await wait(() => {
    expect(fakeApi.users.get).not.toHaveBeenCalled()
  })
})

test('submit button disabled if input is empty', () => {
  const fakeApi = {
    users: {
      get: jest.fn(() => Promise.resolve()),
    },
  }
  const {getByText} = render(<App api={fakeApi} />)

  const submit = getByText('Submit')
  expect(submit.disabled).toBeTruthy()
})

test('submit button enabled if input is not empty', () => {
  const value = faker.name.findName()
  const fakeApi = {
    users: {
      get: jest.fn(() => Promise.resolve()),
    },
  }

  const {getByText, getByLabelText} = render(<App api={fakeApi} />)

  const name = getByLabelText('Name')
  fireEvent.change(name, {target: {value}})

  const submit = getByText('Submit')
  expect(submit.disabled).not.toBeTruthy()
})

test('snapshot', () => {
  const {container} = render(<App />)
  expect(container).toMatchSnapshot()
})
