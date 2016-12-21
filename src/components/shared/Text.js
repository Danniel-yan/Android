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

export class OneLineText extends Component {
  render() {
    let { numberOfLines, ellipsizeMode = 'tail', ...props } = this.props;
    return (
      <DefaultText
        {...props}
        numberOfLines={1}
        ellipsizeMode={ellipsizeMode}/>
    )
  }
}

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 14,
    color: '#999'
  }
});
