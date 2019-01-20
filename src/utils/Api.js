//import axios from 'axios'

import * as generators from '../test/generators'

//const BASE_URL = 'https://advertiser.bluetrackmedia.com/users.php'

const getData = res => res.data

const users = {
  //get: params => axios.get(BASE_URL, {params}).then(getData),
  get: () => new Promise(resolve => setTimeout(() => resolve({data: generators.generateUsers()}), 600)).then(getData),
}

export {users}
