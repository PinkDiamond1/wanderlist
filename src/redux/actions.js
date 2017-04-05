export const LOGIN = 'LOGIN'
export const GET_USERS = 'GET_USERS'
export const LOGOUT = 'LOGOUT'
export const ADD_DESTINATION = 'ADD_DESTINATION'

export const setCurrentUser = (data) => ({
  type: LOGIN,
  payload: data
})

export const setUsers = (data) => ({
  type: GET_USERS,
  payload: data
})

export const logout = () => ({
  type: LOGOUT,
  payload: null
})

export const addDestination = (data) => ({
  type: ADD_DESTINATION,
  payload: data
})
