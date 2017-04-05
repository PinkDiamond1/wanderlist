import style from './destination.scss'
import React from 'react'

export default ({ name, handleClick }) => (
  <div className="destination" onClick={handleClick}>
    <div style={{display: 'flex'}}>
      <div className="button--checkbox"></div>
      {name}
    </div>
    <div className="button--delete fa fa-close"></div>
  </div>
)
