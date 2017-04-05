import style from './dashboard.scss'
import React, { Component } from 'react'
import store from 'redux/store'
import { setCurrentUser, setUsers } from 'redux/actions'
import request from 'superagent'
import Destinations from 'presenters/Destinations/Destinations.jsx'
import { Link } from 'react-router'

const indexOfObj = (array, block) => {
  for(var i = 0; i < array.length; i++) {
    if(block(array[i])) { return i }
  }

  return -1
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
    // this.toggleDestination = this.toggleDestination.bind(this)
    this.toggleVisited = this.toggleVisited.bind(this)
    this.state = { users: [], sideMenuToggled: false }
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
        // const currentUserName = store.getState().currentUser.name
        // const user = users.filter((user) => user.name === currentUserName)[0]
        // const friends = users.filter((user) => user.name !== currentUserName)
        // const data = { destinations: user.destinations, friends: friends }
        store.dispatch(setUsers(users))
      })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  currentDestinations() {
    if(!this.state.users.length) {
      return []
    }

    return this.state.users
      .filter((user) => user.id === parseInt(this.props.params.id))[0]
      .destinations
  }

  isOwner() {
    return parseInt(this.props.params.id) === store.getState().currentUser.id
  }

  getActiveUser() {
    return this.state.users.filter((user) => user.id === parseInt(this.props.params.id))
  }

  toggleMenu() {
    this.setState({ sideMenuToggled: !this.state.sideMenuToggled })
  }

  toggleVisited(name) {
    let newUsers = [].concat(this.state.users)
    const userIndex = indexOfObj(newUsers, (user) => user.id === parseInt(this.props.params.id))
    const destinationIndex = indexOfObj(newUsers[userIndex].destinations, (destination) => destination.name === name)
    newUsers[userIndex].destinations[destinationIndex].visited = !newUsers[userIndex].destinations[destinationIndex].visited
    this.setState({ users: newUsers })
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard__menu">
          {this.isOwner() ? 'Your Destinations' : this.state.users.filter((user) => user.id === parseInt(this.props.params.id))[0].name + "'s Destinations"}
          <div className="dashboard__button" onClick={this.toggleMenu}>
            <div className="fa fa-bars"></div>
          </div>
        </div>

        <div className="dashboard__content" style={this.state.sideMenuToggled ? { transform: 'translateX(-150px)' } : null}>
          <Destinations handleClick={this.toggleVisited} destinations={this.currentDestinations()} />
        </div>

        <div className="dashboard__side-menu" style={this.state.sideMenuToggled ? { transform: 'translateX(-150px)' } : null}>
          {this.state.users.map((friend) => (
            <Link to={'/travelers/' + friend.id} key={friend.id}>{friend.name}</Link>
          ))}
        </div>
      </div>
    )
  }
}
