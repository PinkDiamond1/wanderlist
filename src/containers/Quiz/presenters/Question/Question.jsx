import style from './question.scss'
import React, { Component } from 'react'
import store from 'redux/store'
import { submitAnswer } from 'redux/actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import QuestionChoice from './presenters/QuestionChoice/QuestionChoice.jsx'

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { selected: null };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  handleSelect(value) {
    this.setState({ selected: value })
  }

  handleSubmit() {
    store.dispatch(submitAnswer({
      selected: this.state.selected,
      question: this.props.data
    }))
    this.setState({ selected: null })
  }

  render() {
    return(
      <ReactCSSTransitionGroup
        transitionName="question"
        transitionAppear={true}
        transitionAppearTimeout={400}
        transitionEnterTimeout={400}
        transitionLeave={false}>
        <div className="question" key={this.props.data.id}>
          <div>{this.props.data.text}</div>
          {this.state.selected ? (
            <div className="question__choices">
              {Object.keys(this.props.data.choices).map((choice) => (
                <QuestionChoice
                  className={this.state.selected == choice ? (
                    "question__choice--selected"
                  ) : (
                    "question__choice--unselected disabled"
                  )}
                  text={this.props.data.choices[choice]}
                  value={choice}
                  onClick={this.handleSelect}
                  key={this.props.data.id + '-' + choice} />
              ))}
              <div className="button--submit" onClick={this.handleSubmit}>
                Submit
              </div>
            </div>
          ) : (
            <div className="question__choices">
              {Object.keys(this.props.data.choices).map((choice) => (
                <QuestionChoice
                  className="question__choice--unselected"
                  text={this.props.data.choices[choice]}
                  value={choice}
                  onClick={this.handleSelect}
                  key={this.props.data.id + '-' + choice} />
              ))}
              <div className="button--submit disabled">
                Submit
              </div>
            </div>
          )}
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}
