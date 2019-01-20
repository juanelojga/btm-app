import faker from 'faker'

const generateUser = () => ({id: faker.random.uuid(), name: faker.name.findName()})

const generateUsers = () => {
  const numberOfResults = faker.random.number({min: 1, max: 10})
  const users = []
  for (let i = 0; i < numberOfResults; i++) {
    users.push(generateUser())
  }
  return users
}

export {generateUser, generateUsers}
