import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

import {
  window,
  border,
  centering,
  responsive,
  container,
  colors,
  fontSize
} from 'styles';

import { OneLineText } from 'components/shared/Text';

export default ({ name, image, info, style }) => {
  return (
    <View style={[centering, styles.bank]}>
      <Image style={styles.icon} source={{uri: image}}/>
      <View style={[styles.content, container]}>
        <OneLineText style={styles.name}>{name}</OneLineText>
        { !info ? null : <OneLineText style={styles.info}>{info}</OneLineText>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bank: {
    width: window.width / 2,
    paddingHorizontal: 5,
    flexDirection: 'row',
    ...border('bottom'),
    ...border('right'),
    height: responsive.width(180)
  },
  name: {
    fontSize: fontSize.xlarge,
    color: colors.fontColorSecondary
  },
  info: {
    marginTop: responsive.height(20),
    fontSize: fontSize.normal,
    color: '#999'
  },
  icon: {
    marginHorizontal: responsive.width(25),
    width: responsive.width(80),
    height: responsive.height(80),
  }
});
