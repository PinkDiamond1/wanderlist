import style from './destination.scss'
import React from 'react'

export default ({ name }) => (
  <div className="destination">
    <div style={{display: 'flex'}}>
      {name}
    </div>
  </div>
)
