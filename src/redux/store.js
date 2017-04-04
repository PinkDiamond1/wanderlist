import { createStore } from 'redux'
import App, { currentUser } from './reducers.js'

const loadUser = () => {
  let serializedState = {}
  try {
    const state = localStorage.getItem('currentUser')
    serializedState = JSON.parse(state)
  } catch(err) {
    console.error(err)
  }

  return { currentUser: serializedState }
}

const persistedState = loadUser() || { currentUser: null }
const store = createStore(App, persistedState)

export default store
