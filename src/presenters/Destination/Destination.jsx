import style from './destination.scss'
import React from 'react'

export default ({ name, handleClick, handleDelete }) => (
  <div className="destination">
    <div style={{display: 'flex'}}>
      <div className="button--checkbox" onClick={handleClick}></div>
      {name}
    </div>
    <div onClick={handleDelete} className="button--delete fa fa-close"></div>
  </div>
)
