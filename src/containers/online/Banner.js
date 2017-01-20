import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text
} from 'react-native';

import { border, centering, colors, fontSize } from 'styles';

export default function(props) {
  return (
    <View style={[styles.container]}>
      <View style={[styles.header, centering]}>
        <Image source={props.icon}/>
        <Text style={styles.text}>{props.text}</Text>
      </View>
      {
        !props.footer ? null :
        <View style={styles.footer}>
          <Text style={styles.footerText}>{props.footer}</Text>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 24,
  },
  text: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: fontSize.large,
    lineHeight: 20
  },
  footer: {
    ...border('top'),
    paddingVertical: 20,
    marginHorizontal: 15,
  },
  footerText: {
    color: colors.gray,
    fontSize: fontSize.normal,
    lineHeight: 20,
  }
});
