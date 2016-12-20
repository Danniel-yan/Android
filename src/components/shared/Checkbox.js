import React, { Component, PropTypes } from 'react';
import {
  Image,
  StyleSheet
} from 'react-native';

import Button from './ButtonBase';

export default class Checkbox extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  render() {
    return (
      <Button
        style={this.props.style}
        onPress={this._onPress.bind(this)}
        >
        <Image source={this.props.checked ?
          require('assets/icons/checkbox_checked.png') :
          require('assets/icons/checkbox.png')}/>
      </Button>
    );
  }

  _onPress() {
    this.props.onChange(!this.props.checked);
  }
}
