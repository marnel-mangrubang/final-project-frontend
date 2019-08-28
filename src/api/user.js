import { getToken } from '../tokens/tokens'

// const { REACT_APP_API_DOMAIN, NODE_ENV } = process.env
//
//
// const BASE_URL = NODE_ENV === 'development'
//   ? 'http://localhost:5000'
//   : REACT_APP_API_DOMAIN // Once we deploy, we need to change this


  const { REACT_APP_API_DOMAIN } = process.env
  const BASE_URL = REACT_APP_API_DOMAIN


export const getAllUsers = async () => {
  const mylocaltoken = getToken();
  const response = await fetch(`${BASE_URL}/api/v1/users`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${mylocaltoken}`
    },
    method: 'GET'
  })
  const json = await response.json()
  return json
}


export const getOneUser = async (userId) => {
  const mylocaltoken = getToken();
  const response = await fetch(`${BASE_URL}/api/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${mylocaltoken}`,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
  const json = await response.json()
  return json.user

}




export const updateUser = async ({ user, post }) => {
  const mylocaltoken = getToken();
  const response = await fetch(`${BASE_URL}/api/users/${user._id}`, {
    headers: {
      Authorization: `Bearer ${mylocaltoken}`,
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body:JSON.stringify({name: user.name})
  })
  const json = await response.json()
  // console.log(json)
  return json.response

}


export const updateTotalGrade = async (assignment, newtotal) => {
  const mylocaltoken = getToken();
  const response = await fetch(`${BASE_URL}/api/v1/users/${assignment.student_id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${mylocaltoken}`
    },
    method: 'PUT',
    body:JSON.stringify({"totalgrade":newtotal})
  })
  const json = await response.json()
  // console.log(json)
  return json

}
