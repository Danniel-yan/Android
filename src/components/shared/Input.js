import React, { PropTypes, Component } from 'react';

import { StyleSheet, TextInput, Platform } from 'react-native';



export default class Input extends Component {
  render() {
    var ds = Platform.OS === 'ios' ? { } : { height: 20, fontSize: 16, padding: 0 };

    return (
      <TextInput
        keyboardType={this.props.type == 'number' ? "numeric" : null}
        underlineColorAndroid="transparent"
        {...this.props}
        style={[ds, this.props.style]}
        >
      </TextInput>
    );
  }
}
