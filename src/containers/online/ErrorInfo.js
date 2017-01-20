import React, { Component } from 'react';

import {
  Text,
  StyleSheet
} from 'react-native';

import { colors, responsive, fontSize, border } from 'styles';

export default function(props) {
  if(!props.msg) {
    return null;
  }

  return <Text style={[styles.error, props.style]}>{props.msg}</Text>;
}

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: fontSize.normal,
    color: colors.error
  }
})
