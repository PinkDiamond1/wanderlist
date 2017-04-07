import { combineReducers } from 'redux'
import { LOGIN, GET_USERS, LOGOUT, ADD_DESTINATION } from './actions.js'
import { indexOfObj } from 'helpers'

export function currentUser(state = {}, action) {
  switch(action.type) {
    case LOGIN:
      return Object.assign({}, state, action.payload)
    case LOGOUT:
      return {}
    default:
      return state
  }
}

function users(state = [], action) {
  switch(action.type) {
    case GET_USERS:
      return [].concat(action.payload)
    case ADD_DESTINATION:
      let newUsers = [].concat(state)
      const userIndex = indexOfObj(newUsers, (user) => user.id === action.payload.userId)
      newUsers[userIndex].destinations.push({ name: action.payload.address, visited: false })
      return newUsers
    default:
      return state
  }
}

const App = combineReducers({ currentUser, users })
export default App
