import React, { Component } from 'react'
import store from 'redux/store'
import { setCurrentUser, setUsers } from 'redux/actions'
import request from 'superagent'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = { users: [] }
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({ users: store.getState().users })
    })

    request.get('https://young-beyond-8772.herokuapp.com/travelers')
      .set('Authorization', 'Token token=' + store.getState().currentUser.token)
      .end((err, res) => {
        if(err) {
          throw(err);
        }
        const users = JSON.parse(res.text)
        store.dispatch(setUsers(users))
      })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <div className="dashboard">
        {this.state.users.map((user) => (
          <div>
            {user.name}
            {user.id}
          </div>
        ))}
      </div>
    )
  }
}
