import { getToken } from '../tokens/tokens'

// const { REACT_APP_API_DOMAIN, NODE_ENV } = process.env
//
//
// const BASE_URL = NODE_ENV === 'development'
//   ? 'http://localhost:5000'
//   : REACT_APP_API_DOMAIN // Once we deploy, we need to change this


  const { REACT_APP_API_DOMAIN } = process.env
  const BASE_URL = REACT_APP_API_DOMAIN


//GET ALL STUDENTS ASSIGNMENTS
export const getStudentAssignment = async (userId) => {

  const mylocaltoken = getToken();
  const response = await fetch(`${BASE_URL}/api/v1/users/${userId}/assignments`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${mylocaltoken}`
    },
    method: 'GET'
  })

  const json = await response.json()

  return json

}


//GET ONE ASSIGNMENTS TITLE
export const getOneAssignment = async (userId, assignmentId) => {

  const mylocaltoken = getToken();
  const response = await fetch(`${BASE_URL}/api/v1/users/${userId}/assignments/${assignmentId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${mylocaltoken}`
    },
    method: 'GET'
  })

  const json = await response.json()

  return json

}





//POST NEW ASSIGNMENT
export const createNewAssignment = async (userId, assignment) => {

  const mylocaltoken = getToken();
  const response = await fetch(`${BASE_URL}/api/v1/users/${userId}/assignments`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${mylocaltoken}`
    },
    method: 'POST',
    body:JSON.stringify(assignment)
  })

  const json = await response.json()

  return json

}


//DELETE A STUDENTS ASSIGNMENT
export const deleteAssignment = async (userId, assignment) => {

  const mylocaltoken = getToken();
  const response = await fetch(`${BASE_URL}/api/v1/users/${userId}/assignments/${assignment}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${mylocaltoken}`
    },
    method: 'DELETE'
  })

  const json = await response.json()

  return json
}

///:assignmentId
//UPDATE A STUDENTS ASSIGNMENT
export const updateAssignment = async (userId, assignment) => {
  const mylocaltoken = getToken();
  const response = await fetch(`${BASE_URL}/api/v1/users/${userId}/assignments/${assignment._id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${mylocaltoken}`
    },
    method: 'PUT',
    body:JSON.stringify(assignment)
  })
  const json = await response.json()
  // console.log(json)
  return json
}



export const updateScore = async (assignment) => {
  console.log("assignment from updateAssignment", assignment)
  // console.log("userId from updateAssignment", userId)

  const mylocaltoken = getToken();
  const response = await fetch(`${BASE_URL}/api/v1/users/${assignment.student_id}/assignments/${assignment._id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${mylocaltoken}`
    },
    method: 'PUT',
    body:JSON.stringify(assignment)
  })
  const json = await response.json()
  console.log('updateScore', json)
  return json

}
