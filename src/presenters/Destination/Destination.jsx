import style from './destination.scss'
import React from 'react'

export default ({ name, onClick }) => (
  <div className="destination" onClick={onClick}>
    <div style={{display: 'flex'}}>
      <div className="button--checkbox"></div>
      {name}
    </div>
    <div className="button--delete fa fa-close"></div>
  </div>
)
