import style from './login.scss'
import React, { Component } from 'react'
import store from 'redux/store'
import { setCurrentUser } from 'redux/actions'
import request from 'superagent'
import { browserHistory } from 'react-router'
const img = 'dist/' + require('./bg.jpg');


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.state = { input: "" }
  }

  componentDidMount() {
    const currentUser = store.getState().currentUser
    debugger
    if(currentUser && currentUser.token) {
      browserHistory.push('/')
    }

    // localStorage.setItem('userData', data)
    // request.get('https://young-beyond-8772.herokuapp.com/travelers')
    //           .set('Authorization', 'Token token=' + data.token)
    //           .end((err, res) => {
    //             if(err) {
    //               throw(err);
    //             }

    //             debugger
    //           })
  }

  handleClick() {
    request
      .post('https://young-beyond-8772.herokuapp.com/auth')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ name: this.state.input }))
      .end((err, res) => {
        if(err) { throw(err) }
        const data = JSON.parse(res.text)
        store.dispatch(setCurrentUser(data))
        try {
          const serializedState = JSON.stringify(data)
          localStorage.setItem('currentUser', serializedState)
        } catch(err) {
          console.error(err)
        }
        debugger
        browserHistory.push('/');
      })
  }

  handleInput(e) {
    this.setState({ input: e.target.value })
  }

  render() {
    return (
      <div className="login" style={{background: 'url(' + img + ')'}}>
        <div className="login__backdrop"></div>
        <div className="login__container">
          <div>
            <h1 className="login__h1">Wanderlist</h1>
            <h2 className="login__h2">a friendly way to share travel destinations</h2>
          </div>
          <div>
            <input className="login__input"
              onChange={this.handleInput}
              value={this.state.input}
              placeholder="enter your name to continue" />
            <div className="button--login" onClick={this.handleClick}>Login</div>
          </div>
        </div>
      </div>
    )
  }
}
