import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { l2rStyles } from './styles';
import { flexRow, container, colors, fontSize, border } from 'styles'
import L2RText from 'components/shared/L2RText';

export default function({style, left, right, ...props}) {
  return (
    <L2RText
      {...props}
      style={[styles.item, style]}
      left={left}
      right={right}
      rightStyle={styles.text}/>
  );
}

const styles = StyleSheet.create({
  item: {
    position: 'relative',
    backgroundColor: '#fff',
    height: 55,
    ...border('bottom', 1)
  },
  text: {
    color: colors.grayLight
  }
})
