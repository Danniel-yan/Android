import React, { Component } from 'react';
import {
  TouchableOpacity
} from 'react-native';

import tracker from 'utils/tracker.js';

export default class TrackingPoint extends Component {

  render() {
    let { onPress, tracking, ...props } = this.props;

    return (
      <TouchableOpacity {...props} onPress={this._onPress.bind(this)}>
        {this.props.children}
      </TouchableOpacity>
    );
  }

  _onPress() {
    let tracking = this.props.tracking;
    tracker.trackAction(tracking.tkey, tracking.entity, tracking.topic, tracking.event);

    this.props.onPress && this.props.onPress();
  }

}
