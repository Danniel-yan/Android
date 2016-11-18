import React, { Component } from 'react';

import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Text from 'components/shared/Text'
import Button from 'components/shared/Button'
import CountdownButton from 'components/shared/CountdownButton'
import * as defaultStyles from 'styles';
import { colors } from 'styles/varibles'
import { ExternalPushLink } from 'containers/shared/Link';

export default class Login extends Component {
  static title = '登录';

  render() {
    return (
      <View style={[defaultStyles.container, styles.container]}>
        <View style={styles.inputGroup}>
          <Image source={require('assets/icons/phone.png')}/>
          <TextInput
            style={styles.input}
            clearButtonMode="while-editing"
            keyboardType="numeric"
            placeholder="请输入手机号"
          />
          <CountdownButton style={styles.verifyBtn} defaultText="获取验证码" countdownText="${time}秒后可获取"/>
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

        <View style={styles.txtRow}>
          <Text>阅读并接受</Text>
          <ExternalPushLink text="《钞市服务协议》"/>
        </View>

        <Button onPress={this.props.onBack} style={styles.submitBtn} text="登录"/>
      </View>
    );
  }

  _sendVerify() {}
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal: 25,
    backgroundColor: '#fff'
  },

  inputGroup: {
    flexDirection: 'row',
    height: 49,
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

  txtRow: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center'
  },

  verifyBtn: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    width: 80,
    lineHeight: 24,
    fontSize: 12,
    color: '#fff'
  },

  submitBtn: {
    marginTop: 50,
    lineHeight: 46,
    backgroundColor: colors.primary,
    fontSize: 18,
    borderRadius: 8
  }
});
