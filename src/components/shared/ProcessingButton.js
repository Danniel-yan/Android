import React, { Component } from 'react';
import {
  ActivityIndicator
} from 'react-native';
import Button from './Button';

import * as defaultStyles from 'styles';

export default class ProcessingButton extends Component {
  render() {
    let { processing, onPress, ...props } = this.props;

    if(processing) {
      return this._renderProcessing();
    }

    return (
      <Button onPress={this._onPress.bind(this)} {...props}/>
    );
  }

  _renderProcessing() {
    let { text, onPress, children, processing, color, ...props } = this.props;

    return (
      <Button {...props}>
        <ActivityIndicator
          animating={true}
          style={defaultStyles.centering}
          color={color || "#fff"}
          size="small"
        />
      </Button>
    );
  }

  _onPress() {
    if(this.inProcessing) {
      return;
    }

    this.inProcessing = setTimeout(() => {
      clearTimeout(this.inProcessing);
      this.inProcessing = null;
    }, 500);

    this.props.onPress();
  }
}
