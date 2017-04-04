import { combineReducers } from 'redux'
import { SUCCESSFUL_LOGIN } from './actions.js'

function currentUser(state = {}, action) {
  switch(action.type) {
    case SUCCESSFUL_LOGIN:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}



const App = combineReducers({ currentUser })
export default App
