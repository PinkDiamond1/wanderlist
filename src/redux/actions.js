export const SUCCESSFUL_LOGIN = 'SUCCESSFUL_LOGIN'
export const GET_USERS = 'GET_USERS'

export const setCurrentUser = (data) => ({
  type: SUCCESSFUL_LOGIN,
  payload: data
})

export const setUsers = (data) => ({
  type: GET_USERS,
  payload: data
})

