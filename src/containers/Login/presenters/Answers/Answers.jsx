import React from 'react'

export default ({ answers }) => (
  <div className="answers">
    {Object.keys(answers).map((answerKey) => (
      <div className="answer">{answers[answerKey]}</div>
    ))}
  </div>
)

