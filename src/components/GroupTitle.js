import React, { Component } from 'react';

import {
  View,
  StyleSheet
} from 'react-native';

import { container, centering, border, colors } from 'styles';
import Text from 'components/shared/Text';

export default ({offset = true, title, style, textStyle, children}) => {
  return (
    <View style={[styles.wrap, offset && styles.offset, style]}>
      <View style={[container, styles.container]}>
        <Text style={[styles.title, textStyle]}>{title}</Text>
      </View>
      <View style={centering}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  offset: {
    marginTop: 5
  },
  wrap: {
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    ...border('bottom')
  },
  container: {
    justifyContent: 'center',
  },
  title: {
    fontSize:16,
    color:colors.fontColorSecondary,
  }
});
