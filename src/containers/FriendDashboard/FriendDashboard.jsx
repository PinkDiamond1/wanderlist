import style from './friend_dashboard.scss'
import React, { Component } from 'react'
import store from 'redux/store'
import { setCurrentUser, setUsers } from 'redux/actions'
import request from 'superagent'
import Destination from 'presenters/Destination/Destination.jsx'
import { Link } from 'react-router'

export default class FriendDashboard extends Component {
  constructor(props) {
    super(props)
    debugger
    this.handleClick = this.handleClick.bind(this)
    this.state = { users: [], sideMenuToggled: false }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleClick() {
    this.setState({ sideMenuToggled: !this.state.sideMenuToggled })
  }

  render() {
    if(this.state.users.length) {
      const destinations = this.state.users.filter((user) => user.id === store.getState().currentUser.id)[0].destinations
      const visited = destinations.filter((destination) => destination.visited)
      const unvisited = destinations.filter((destination) => !destination.visited)
      const friends = this.state.users.filter((user) => user.id !== store.getState().currentUser.id)
      return (
        <div className="dashboard">
          <div className="dashboard__menu">
            Your Destinations
            <div className="dashboard__button" onClick={this.handleClick}>
              <div className="fa fa-users"></div>
              friends
            </div>
          </div>
          <div className="dashboard__content" style={this.state.sideMenuToggled ? { transform: 'translateX(-150px)' } : null}>
            <h2 className="dashboard__h2">Want to go:</h2>
            {unvisited.map((destination) => (
              <Destination name={destination.name} />
            ))}
            <h2 className="dashboard__h2">Have been to:</h2>
            {visited.map((destination) => (
              <Destination name={destination.name} />
            ))}
          </div>
          <div className="dashboard__side-menu" style={this.state.sideMenuToggled ? { transform: 'translateX(-150px)' } : null}>
            {friends.map((friend) => (
              <Link to={'/travelers/' + friend.id}>{friend.name}</Link>
            ))}
          </div>
        </div>
      )
    } else {
      return (
        <div className="dashboard">
        </div>
      )
    }
  }
}
