import { combineReducers } from 'redux'
import { LOGIN, GET_USERS, LOGOUT } from './actions.js'

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
    default:
      return state
  }
}

const App = combineReducers({ currentUser, users })
export default App
