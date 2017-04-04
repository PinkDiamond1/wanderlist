import style from './question_choice.scss'
import React, { Component } from 'react'

export default class QuestionChoice extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = { selected: null }
  }

  handleClick() {
    this.props.onClick(this.props.value)
  }

  render() {
    return (
      <div className={this.props.className} onClick={this.handleClick}>
        <div className="question__choice__letter">{this.props.value + '.'}</div>
        {this.props.text}
      </div>
    )
  }
}
