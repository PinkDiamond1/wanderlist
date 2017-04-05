import { combineReducers } from 'redux'
import { SUCCESSFUL_LOGIN, GET_USERS } from './actions.js'

export function currentUser(state = {}, action) {
  switch(action.type) {
    case SUCCESSFUL_LOGIN:
      return Object.assign({}, state, action.payload)
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
