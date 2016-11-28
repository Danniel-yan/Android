import React, { Component } from 'react';

import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Text from 'components/shared/Text'
import ProcessingButton from 'components/shared/ProcessingButton'
import CountdownButton from 'components/shared/CountdownButton'
import * as defaultStyles from 'styles';
import { colors } from 'styles/varibles'
import WebLink from 'components/shared/WebLink';
import alert from 'utils/alert';

import { post, responseStatus } from 'utils/fetch';
import validators from 'utils/validators';

export default class Login extends Component {
  static defaultProps = {
    loginSuccess: () => {}
  };

  static title = '登录';

  state = {
    verifyCode: '',
    mobile: '',
    submitting: false
  };

  render() {
    let mobileValid = validators.mobile(this.state.mobile);
    let verifyCodeValid = this.state.verifyCode.length == 6;

    return (
      <View style={[defaultStyles.container, styles.container]}>
        <View style={styles.inputGroup}>
          <Image source={require('assets/icons/phone.png')}/>
          <TextInput
            style={styles.input}
            clearButtonMode="while-editing"
            keyboardType="numeric"
            placeholder="请输入手机号"
            maxLength={11}
            underlineColorAndroid="transparent"
            onChangeText={mobile => this.setState({mobile})}
          />
          <CountdownButton disabled={!mobileValid} onPress={this._sendVerify.bind(this)} style={styles.verifyBtn} defaultText="获取验证码" countdownText="${time}秒后可获取"/>
        </View>

        <View style={styles.inputGroup}>
          <Image source={require('assets/icons/safe.png')}/>
          <TextInput
            style={styles.input}
            clearButtonMode="while-editing"
            keyboardType="numeric"
            placeholder="请输入验证码"
            maxLength={6}
            value={this.state.verifyCode}
            underlineColorAndroid="transparent"
            onChangeText={verifyCode => this.setState({verifyCode})}
          />
        </View>

        <View style={styles.txtRow}>
          <Text>阅读并接受</Text>
          <WebLink url="https://m.madailicai.com" title="《钞市服务协议》"/>
        </View>

        <ProcessingButton processing={this.state.submitting} disabled={!mobileValid || !verifyCodeValid} onPress={this._submit.bind(this)} style={styles.submitBtn} text="登录"/>
      </View>
    );
  }

  _sendVerify() {
    post('/tool/send-verify-code', { mobile: this.state.mobile})
      .then(response => {
        this.setState({verifyCode: response.data.verify_code});
      })
      .catch(err => { alert('网络异常'); })
  }

  _submit() {
    if(this.submitting) { return; }

    this.submitting = true;

    this.setState({
      submitting: true
    }, () => {
      let { mobile, verifyCode: verify_code } = this.state;
      post('/user/login', { mobile, verify_code })
        .then(response => {
          if(response.res == responseStatus.success) {
            return AsyncStorage.setItem('userToken', response.data.token)
          }
        })
        .then(this.props.loginSuccess)
        .catch(err => { alert('网络异常'); })
        .finally(() => {
          this.submitting = false;
          this.setState({submitting: false})
        })
    });
  }
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
    marginLeft: 18,
    marginRight: 10,
    fontSize: 16,
    color: '#A5A5A5',
    backgroundColor: '#fff'
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
    height: 24,
    fontSize: 12,
    color: '#fff'
  },

  submitBtn: {
    marginTop: 50,
    height: 46,
    backgroundColor: colors.primary,
    fontSize: 18,
    borderRadius: 8
  }
});
