import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
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

import Text from 'components/shared/Text';
import RemoteImage from 'components/shared/RemoteImage';

export default (props) => {
  return (
    <View style={[centering, styles.card]}>
      <View style={container}>

        <View style={container}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.title}>{props.title}</Text>
        </View>

        <View>
          <Text style={styles.info}>{props.show_num} 阅读</Text>
        </View>
      </View>

      <RemoteImage style={styles.icon} uri={props.pic}/>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...border('bottom', 1),
    backgroundColor: '#fff',
    // height: responsive.height(205),
    flexDirection: 'row',
    paddingVertical: responsive.height(40),
    paddingHorizontal: responsive.width(30),
  },
  icon: {
    marginLeft: responsive.width(15),
    width: responsive.width(200),
    height: responsive.height(123),
  },
  header: {
  },
  title: {
    fontSize: fontSize.large,
    color: colors.grayDark
  },
  info: {
    fontSize: fontSize.small,
    color: colors.grayLight
  }
});
