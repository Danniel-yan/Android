import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default class DefaultText extends Component {
  render() {
    let { style, ...props } = this.props;
    return (
      <Text {...props} style={[styles.defaultText, this.props.style]}/>
    )
  }
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'PingFang SC',
    fontSize: 14,
    color: '#999'
  }
});
