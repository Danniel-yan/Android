import React, { Component } from 'react';
import {
  TouchableOpacity
} from 'react-native';

import tracker from 'utils/tracker.js';

export default class TrackingPoint extends Component {

  render() {
    let { onPress, tracking, ...props } = this.props;

    return (
      <TouchableOpacity activeOpacity={1} {...props} onPress={this._onPress.bind(this)}>
        {this.props.children}
      </TouchableOpacity>
    );
  }

  _onPress() {
    let tracking = this.props.tracking;
    tracker.trackAction(Object.assign({event: 'clk'}, tracking ));

    this.props.onPress && this.props.onPress();
  }

}