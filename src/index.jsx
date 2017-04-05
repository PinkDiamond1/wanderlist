import style from '../assets/css/main.scss'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Login from 'containers/Login/Login.jsx'
import { setCurrentUser } from 'redux/actions'
import Dashboard from 'containers/Dashboard/Dashboard.jsx'
import Destination from 'presenters/Destination/Destination.jsx'
import { currentUser } from 'redux/reducers'
import { Provider } from 'react-redux'
import store from 'redux/store'

const requireLogin = (nextState, replace) => {
  const currentUser = store.getState().currentUser
  if(!currentUser) {
    replace({ pathname: '/login' })
  }
}

render(
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/travelers/:id" component={Dashboard} onEnter={requireLogin} />
  </Router>
, document.getElementById('root'))

