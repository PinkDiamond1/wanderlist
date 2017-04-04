import style from './login.scss'
import React, { Component } from 'react'
import ProgressBar from './presenters/ProgressBar/ProgressBar.jsx'
import Question from './presenters/Question/Question.jsx'
import Answers from './presenters/Answers/Answers.jsx'
import { QUESTIONS } from 'data/questions.js'
import store from 'redux/store'
const img = 'dist/' + require('./bg.jpg');

export default class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answeredQuestions: 0,
      currentQuestion: QUESTIONS['001']
    }
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        answeredQuestions: Object.keys(store.getState().answers).length,
        currentQuestion: QUESTIONS[store.getState().currentQuestionId]
      })
    })
  }

  render() {
    return (
      <div className="login" style={{background: 'url(' + img + ')'}}>
        <div className="login__backdrop"></div>
        <div className="login__container">
          <div>
            <h1 className="login__h1">Wanderlist</h1>
            <h2 className="login__h2">a friendly way to share travel destinations</h2>
          </div>
          <div>
            <input className="login__input" placeholder="enter your name to continue" />
            <div className="button--login">Login</div>
          </div>
        </div>
      </div>
    )
  }
}
