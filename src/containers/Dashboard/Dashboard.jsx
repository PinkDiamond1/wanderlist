import React, { Component } from 'react'
import store from 'redux/store'
import { setCurrentUser } from 'redux/actions'
import request from 'superagent'

export default class Quiz extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.state = { input: "" }
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({ currentUser: store.getState().currentUser })
    })
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
      })
  }

  handleInput(e) {
    this.setState({ input: e.target.value })
  }

  render() {
    return (
      <div>hello</div>
    )
  }
}
