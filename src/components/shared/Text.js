import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default class DefaultText extends Component {
  render() {
    return (
      <Text style={[styles.defaultText, this.props.style]}>
        {this.props.children}
      </Text>
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
