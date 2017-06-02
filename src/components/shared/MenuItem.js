import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView
} from 'react-native';

import ResponsiveImage from 'components/shared/ResponsiveImage';
import NextIcon from 'components/shared/NextIcon';
import { border, fontSize, rowContainer, container, colors, centering } from 'styles';

export default function CerificationItem(props) {
  return (
    <View style={[rowContainer, centering, styles.item, props.style]}>
      <Icon style={props.iconStyle} icon={props.icon}/>
      <Text style={[container, styles.title, props.titleStyle]}>{props.title}</Text>
      {props.children}
      <NextIcon/>
    </View>
  );
}

function Icon(props) {
  let icon = props.icon;
  if(!icon) { return null; }

  if(typeof icon == 'string') {
    return (<ResponsiveImage style={[styles.icon, props.style]} uri={icon}/>);
  }

  return (<Image style={[styles.icon, props.style]} source={icon}/>);
}

const styles = StyleSheet.create({
  item: {
    ...border('bottom', 1),
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    height: 70
  },
  icon: {
    marginRight: 10
  },
  title: {
    color: colors.grayDark,
    fontSize: fontSize.large
  }
});
