import style from './progress_bar.scss'
import React from 'react'

export default ({ answeredQuestions, totalQuestions }) => (
  <div className="progress_bar">
    <div className="progress_bar__text">
      Progress: {answeredQuestions + 1}/{totalQuestions}
    </div>
    <div className="progress_bar__meter">
      <div className="progress_bar__meter__fill" style={{width: (answeredQuestions/totalQuestions * 100) + '%'}}>
      </div>
    </div>
  </div>
)

