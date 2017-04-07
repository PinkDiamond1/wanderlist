import React from 'react'
import Destination from '../Destination/Destination.jsx'
import FriendDestination from '../Destination/FriendDestination.jsx'

export default ({ destinations }) => {
  const visited = destinations.filter((destination) => destination.visited)
  const unvisited = destinations.filter((destination) => !destination.visited)
  return (
    <div className="destinations">
      <div className="destinations__section">
        <h2 className="dashboard__h2">🙂 Wants to go:</h2>
        {unvisited.map((destination) => (
          <FriendDestination
            key={destination.name}
            name={destination.name} />
        ))}
      </div>
      <div className="destinations__section">
      <h2 className="dashboard__h2">😎 Has been to:</h2>
        {visited.map((destination) => (
          <FriendDestination
            key={destination.name}
            name={destination.name} />
        ))}
      </div>
    </div>
  )
}
