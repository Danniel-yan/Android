import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
} from 'react-native'

import { container, fontSize, colors, border } from 'styles';

export default function L2RText({style, left, right, leftStyle, rightStyle, ...props}) {
  return (
    <View style={[styles.item, style]}>
      <L2RText.Left text={left} style={leftStyle}/>
      <L2RText.Right text={right} style={rightStyle}/>
      {props.children}
    </View>
  );
}

L2RText.Right = function({text, style}) {
  return <Text style={[styles.right, style]}>{text}</Text>
}

L2RText.Left = function({text, style}) {
  return <Text style={[container, styles.left, style]}>{text}</Text>
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 30,
    backgroundColor: '#fff'
  },
  left: {
    fontSize: fontSize.large,
    color: colors.grayDark
  },
  right: {
    fontSize: fontSize.large,
    color: colors.grayDark
  }
})
