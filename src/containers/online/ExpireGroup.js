import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import { centering, colors, fontSize } from 'styles';
import parseDate from 'utils/parseDate';

export default function(props) {
  let date = parseDate(props.date);
  let dis = date.getTime() - Date.now();

  let disDay = Math.floor(dis / 24 / 60 / 60 / 1000);

  // let text = `还${disDay}天，有效期至${date.getMonth()+1}月${date.getDate()}日`;
  let text = `有效期至${date.getMonth()+1}月${date.getDate()}日，还剩${disDay}天`;

  return (
    <View style={[styles.container, centering]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: '#fff'
  },
  text: {
    fontSize: fontSize.large,
    color: colors.grayDark
  }
});
