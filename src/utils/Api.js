import axios from 'axios'

const BASE_URL = 'http://ec2-34-219-89-185.us-west-2.compute.amazonaws.com/users.php'

const getData = res => res.data

const users = {
  get: params => axios.get(BASE_URL, {params}).then(getData),
}

export {users}
