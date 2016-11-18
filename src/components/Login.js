import React, { Component } from 'react';
import Text from 'components/shared/Text'
import CountdownButton from 'components/shared/CountdownButton'
import * as defaultStyles from 'styles';
import { colors } from 'styles/varibles'

import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View style={[styles.container, defaultStyles.container]}>
        <View style={styles.inputGroup}>
          <Image source={require('assets/icons/phone.png')}/>
          <TextInput
            style={styles.input}
            clearButtonMode="while-editing"
            keyboardType="numeric"
            placeholder="请输入手机号"
          />
          <CountdownButton style={styles.btn} defaultText="获取验证码" countdownText="${time}秒后可获取"/>
        </View>

        <View style={styles.inputGroup}>
          <Image source={require('assets/icons/safe.png')}/>
          <TextInput
            style={styles.input}
            clearButtonMode="while-editing"
            keyboardType="numeric"
            placeholder="请输入验证码"
          />
        </View>

        <View>
          <Text>阅读并接受《钞市服务协议》</Text>
        </View>
      </View>
    );
  }

  _sendVerify() {}
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
    backgroundColor: '#fff'
  },

  inputGroup: {
    flexDirection: 'row',
    height: 49,
    marginHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  
  input: {
    flex: 1,
    height: 49,
    marginLeft: 18,
    marginRight: 10,
    fontSize: 16,
    color: '#A5A5A5'
  },

  btn: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    width: 80,
    lineHeight: 24,
    fontSize: 12,
    color: '#fff'
  }
});
