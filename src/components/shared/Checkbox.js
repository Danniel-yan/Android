import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

export default class Checkbox extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  render() {
    return (
      <TouchableOpacity
        style={this.props.style}
        onPress={this._onPress.bind(this)}
        activeOpacity={1}
        >
        <Image source={this.props.checked ?
          require('assets/icons/checkbox_checked.png') :
          require('assets/icons/checkbox.png')}/>
      </TouchableOpacity>
    );
  }

  _onPress() {
    this.props.onChange(!this.props.checked);
  }
}
