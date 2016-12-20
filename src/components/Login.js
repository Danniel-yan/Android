import React, { Component } from 'react';

import {
  View,
  Image,
  StyleSheet,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

import Text from 'components/shared/Text'
import ProcessingButton from 'components/shared/ProcessingButton'
import VerifyButton from 'components/shared/VerifyButton'
import * as defaultStyles from 'styles';
import { colors } from 'styles/varibles'
import WebLink from 'components/shared/WebLink';
import Checkbox from 'components/shared/Checkbox';

import { post, responseStatus } from 'utils/fetch';
import validators from 'utils/validators';

export default class Login extends Component {
  static defaultProps = {
    loginSuccess: () => {}
  };

  static title = '登录';

  tracking = {key: 'user', topic: 'Login'};

  state = {
    verifyCode: '',
    mobile: '',
    checkedAgreement: true,
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
          <VerifyButton
            tracking={{key: 'user', topic: 'login', entity: 'mob_code_button'}}
            mobile={this.state.mobile}/>
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
          <Checkbox checked={this.state.checkedAgreement} onChange={() => this.setState({checkedAgreement: !this.state.checkedAgreement})} style={{marginRight: 5}}/>
          <Text onPress={() => this.setState({checkedAgreement: !this.state.checkedAgreement})}>阅读并接受</Text>
          <WebLink
            source={require('./agreement.html')}
            toKey="Agreement"
            text="《钞市服务协议》" title="《钞市服务协议》"
          />
        </View>

        <ProcessingButton
          tracking={{key: 'user', topic: 'login', entity: 'login_button', cell: this.state.mobile}}
          processing={this.state.submitting} disabled={!this.state.checkedAgreement || !mobileValid || !verifyCodeValid} onPress={this._submit.bind(this)}
          style={styles.submitBtn}
          textStyle={styles.submitBtnText}
          text="登录"/>
      </View>
    );
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
          } else {
            throw response.msg;
          }
        })
        .then(this.props.customLoginSuccess || this.props.loginSuccess)
        .catch(err => { console.log(err); })
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

  submitBtn: {
    marginTop: 50,
    height: 46,
    backgroundColor: '#fff',
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 8
  },
  submitBtnText: {
    fontSize: 18,
    color: colors.secondary
  }
});
