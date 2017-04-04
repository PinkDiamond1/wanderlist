import style from './quiz.scss'
import React, { Component } from 'react'
import ProgressBar from './presenters/ProgressBar/ProgressBar.jsx'
import Question from './presenters/Question/Question.jsx'
import Answers from './presenters/Answers/Answers.jsx'
import { QUESTIONS } from 'data/questions.js'
import store from 'redux/store'

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
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="quiz">
              <ProgressBar
                answeredQuestions={this.state.answeredQuestions}
                totalQuestions={Object.keys(QUESTIONS).length} />
              {this.state.currentQuestion ? (
                <Question data={this.state.currentQuestion} />
              ) : (
                <Answers answers={store.getState().answers} />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
