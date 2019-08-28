import { setToken, getToken } from '../tokens/tokens'

// const { REACT_APP_API_DOMAIN, NODE_ENV } = process.env
//
//
// const BASE_URL = NODE_ENV === 'development'
//   ? 'http://localhost:5000'
//   : REACT_APP_API_DOMAIN // Once we deploy, we need to change this


  const { REACT_APP_API_DOMAIN } = process.env
  const BASE_URL = REACT_APP_API_DOMAIN


export const login = async (user) => {

  try{
    const response = await fetch(`${BASE_URL}/api/v1/login`, {
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const json = await response.json()

    if(json.status === 200){
      setToken(json.token)
      console.log(json)
      return json
    }
  }catch(error){
    console.error(error)
    const e = new Error(`You are not authorized to access this route.`)
    e.status = 401

  }

}


export const profile = async () => {

  const mylocaltoken = getToken();
  const response = await fetch(`${BASE_URL}/api/v1/profile`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${mylocaltoken}`
    },
    method: 'GET'
  })

  const json = await response.json()

  if(json.status === 200){
    return json
  }


}


export const signup = async (user) => {
  const response = await fetch(`${BASE_URL}/api/v1/signup`, {
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  const json = await response.json()

  if(json.status === 201){
    setToken(json.token)
  }

  return json
}
