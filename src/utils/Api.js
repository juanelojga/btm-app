//import axios from 'axios'
import faker from 'faker'

//const BASE_URL = 'https://advertiser.bluetrackmedia.com/users.php'

const getData = res => res.data

const fakeResponse = () => {
  const numberOfResults = faker.random.number({min: 0, max: 10})
  const users = []
  for (let i = 0; i < numberOfResults; i++) {
    users.push({id: faker.random.uuid(), name: faker.name.findName()})
  }
  return {data: users}
}

const users = {
  //get: params => axios.get(BASE_URL, {params}).then(getData),
  get: () =>
    new Promise(resolve =>
      setTimeout(() => {
        return resolve(fakeResponse())
      }, faker.random.number({min: 300, max: 1000})),
    ).then(getData),
}

export {users}
