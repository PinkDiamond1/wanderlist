import style from '../assets/css/main.scss'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import store from 'redux/store'
import Login from 'containers/Login/Login.jsx'
import Dashboard from 'containers/Dashboard/Dashboard.jsx'

const requireLogin = (nextState, replace) => {
  const currentUser = store.getState().currentUser
  if(!currentUser) {
    replace({ pathname: '/' })
  }
}

render(
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/travelers/:id" component={Dashboard} onEnter={requireLogin} />
  </Router>
, document.getElementById('root'))

