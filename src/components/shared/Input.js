import React, { PropTypes, Component } from 'react';

import { StyleSheet, TextInput, Platform } from 'react-native';
import { iptFontSize } from 'styles/varibles';

export default class Input extends Component {
  render() {
    var ds = Platform.OS === 'ios' ? { fontSize: iptFontSize } : { height: 20, fontSize: iptFontSize, padding: 0 };

    return (
      <TextInput
        keyboardType={this.props.type == 'number' ? "numeric" : null}
        underlineColorAndroid="transparent"
        {...this.props}
        style={[ds, this.props.style]}></TextInput>
    );
  }
}
