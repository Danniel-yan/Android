import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import { centering, colors, fontSize } from 'styles';

export default function(props) {
  let date = new Date(props.date);
  let dis = date.getTime() - Date.now();

  let disDay = Math.ceil(dis / 24 / 60 / 60 / 1000);

  let text = `还${disDay}天，有效期至${date.getMonth()+1}月${date.getDate()}日`;

  return (
    <View style={[styles.container, centering, props.style]}>
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
