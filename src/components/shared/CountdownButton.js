import React, { Component } from 'react';
import Button from './ButtonBase'

import * as defaultStyles from 'styles';

export default class CountdownButton extends Component {
  static defaultProps = {
    duration: 60
  };

  constructor(props) {
    super(props);

    this.state = {
      duration: props.duration,
      countdown: props.duration,
      started: false,
    }
  }

  componentDidUpdate() {
    if(this.state.countdown === 0) {
      this._done();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let { disabled, onPress, style, defaultText, countdownText, ...props } = this.props;
    let started = this.state.started;
    let text = !started ? defaultText : this._formatText()

    return (
      <Button
        {...props}
        style={[defaultStyles.centering, style]}
        disabled={started || this.props.disabled}
        onPress={this._onPress.bind(this)}
        text={text} />
    );
  }

  _onPress() {
    this.props.onPress();
    this._start();
  }

  _start() {
    this.setState({
      started: true,
    });

    this.interval = setInterval(() => {
      this.setState({
        countdown: --this.state.countdown
      });
    }, 1000)
  }

  _done() {
    clearInterval(this.interval);

    this.setState({
      started: false,
      countdown: this.state.duration
    });
  }

  _formatText() {
    return this.props.countdownText.replace('${time}', this.state.countdown);
  }

  reset() {
    this._done();
  }
}
