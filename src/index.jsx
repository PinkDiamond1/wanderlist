import style from '../assets/css/main.scss'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Login from 'containers/Login/Login.jsx'
import store from 'redux/store'
import Dashboard from 'containers/Dashboard/Dashboard.jsx'

const requireLogin = (nextState, replace) => {
  const token = store.getState().currentUser.token
  if(!token) {
    replace({ pathname: '/login' })
  }
}

render(
  <Router history={browserHistory}>
    <Route path="/" component={Dashboard} onEnter={requireLogin} />
    <Route path="/login" component={Login} />
  </Router>
, document.getElementById('root'))

