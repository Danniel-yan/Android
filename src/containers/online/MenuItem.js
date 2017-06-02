import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView
} from 'react-native';

import { ExternalPushLink } from 'containers/shared/Link';
import NextIcon from 'components/shared/NextIcon';
import { border, fontSize, rowContainer, container, colors, centering } from 'styles';

export default function CerificationItem(props) {
  return (
    <View style={[rowContainer, centering, styles.item]}>
      <Image style={styles.icon} source={props.icon}/>
      <Text style={[container, styles.title]}>{props.title}</Text>
      {props.children}
      <NextIcon/>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    ...border('bottom', 1),
    paddingHorizontal: 10,
    height: 70
  },
  icon: {
    marginRight: 10
  },
  title: {
    color: colors.grayDark,
    fontSize: fontSize.large
  },
  status: {
    marginRight: 5,
    fontSize: fontSize.normal
  },
  alert: {
    padding: 10
  },
  alertText: {
    lineHeight: 20,
    fontSize: fontSize.normal,
    color: colors.grayDark
  }
});
