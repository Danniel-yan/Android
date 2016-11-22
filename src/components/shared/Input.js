import React, { PropTypes, Component } from 'react';

import { StyleSheet, TextInput } from 'react-native';

export default class Input extends Component {
  render() {
    var ds = { height: 20, fontSize: 16, padding: 0 };

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
