import React from 'react'
import Destination from '../Destination/Destination.jsx'
import FriendDestination from '../Destination/FriendDestination.jsx'

export default ({ destinations, handleClick, handleDelete }) => {
  const visited = destinations.filter((destination) => destination.visited)
  const unvisited = destinations.filter((destination) => !destination.visited)
  return (
    <div>
      <h2 className="dashboard__h2">Want to go:</h2>
      {unvisited.map((destination) => (
        <Destination
          handleClick={() => handleClick(destination.name)}
          handleDelete={() => handleDelete(destination.name)}
          key={destination.name}
          name={destination.name}
          visited={false} />
      ))}
      <h2 className="dashboard__h2">Have been to:</h2>
      {visited.map((destination) => (
        <Destination
          handleClick={() => handleClick(destination.name)}
          handleDelete={() => handleDelete(destination.name)}
          key={destination.name}
          name={destination.name}
          visited={true} />
      ))}
    </div>
  )
}
