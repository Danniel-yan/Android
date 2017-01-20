import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text
} from 'react-native';

import { centering } from 'styles';

export default function(props) {
  return (
    <View style={[centering, styles.container]}>
      <Image source={require('assets/online/yys.png')}/>
      <Text style={styles.text}>请使用您本人常用的实名认证手机号，所有联系都将以该认证号码为准！</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 23,
    paddingHorizontal: 35,
  },
  text: {
    marginTop: 16,
    lineHeight: 20
  }
});
