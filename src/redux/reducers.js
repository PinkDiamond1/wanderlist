import { combineReducers } from 'redux'
import { SUBMIT_ANSWER } from './actions.js'

function answers(state = {}, action) {
  switch(action.type) {
    case SUBMIT_ANSWER:
      const answer = { [action.payload.question.id]: action.payload.selected }
      return Object.assign({}, state, answer)
    default:
      return state
  }
}

function currentQuestionId(state = null, action) {
  switch(action.type) {
    case SUBMIT_ANSWER:
      return action.payload.question.next
    default:
      return state
  }
}

const App = combineReducers({ answers, currentQuestionId })
export default App
