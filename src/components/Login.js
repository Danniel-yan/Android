import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchingUser from 'actions/loginUser';
import { trackingScene } from 'high-order/trackingPointGenerator';

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
import { externalPop, externalPush} from 'actions/navigation';
import { ExternalPushLink } from 'containers/shared/Link';
import Checkbox from 'components/shared/Checkbox';

import { post, responseStatus } from 'utils/fetch';
import validators from 'utils/validators';

class Login extends Component {
  static title = '登录';

  tracking = {key: 'user', topic: 'Login'};

  state = {
    verifyCode: '',
    mobile: '',
    checkedAgreement: true,
    submitting: false
  };

  componentDidUpdate() {
    if(this.state.mobile || !this.state.checkedAgreement || this.state.verifyCode) {
      this.changed = true;
    }
  }

  render() {
    let mobileValid = validators.mobile(this.state.mobile);
    const disabled = !this.state.checkedAgreement || !mobileValid ;

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
            onChangeText={mobile => this.setState({mobile, err: ""})}
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
            onChangeText={verifyCode => this.setState({verifyCode, err: ""})}
          />
        </View>

        <View style={styles.txtRow}>
          <Checkbox checked={this.state.checkedAgreement} onChange={() => this.setState({checkedAgreement: !this.state.checkedAgreement})} style={{marginRight: 5}}/>
          <Text onPress={() => this.setState({checkedAgreement: !this.state.checkedAgreement})}>阅读并接受</Text>
          <ExternalPushLink
            web='https://chaoshi-api.jujinpan.cn/static/pages/chaoshi/agreement.html'
            text="《钞市服务协议》"
            title="《钞市服务协议》"
            textStyle={{ color: colors.secondary}}
          />
        </View>

        <View style={[styles.txtRow, { justifyContent: "center" }]}>
          {this.state.err ? <Text style={styles.err}>{this.state.err}</Text> : null}
        </View>

        <ProcessingButton
          tracking={{key: 'user', topic: 'login', entity: 'login_button', cell: this.state.mobile}}
          processing={this.state.submitting} onPress={this._submit.bind(this)}
          style={styles.submitBtn}
          textStyle={styles.submitBtnText}
          text="登录"/>
      </View>
    );
  }

  _validation() {
    let mobileValid = validators.mobile(this.state.mobile);
    let codeValid = this.state.verifyCode.length > 0;
    const disabled = !this.state.checkedAgreement || !mobileValid;

    if(!mobileValid) {
      this.setState({err: '请输入11位手机号'});
      return false;
    }

    if(!codeValid) {
      this.setState({err: '请输入验证码'});
      return false;
    }

    if(!this.state.checkedAgreement) {
      this.setState({err: '必须接受服务协议'});
      return false;
    }

    this.setState({err: ''});
    return true;
  }

  _submit() {
    if(!this.changed || !this._validation()) {
      return null;
    }

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
        .then(this.loginSuccess.bind(this))
        .catch(err => {
          console.log(err);
          this.setState({err: err})
        })
        .finally(() => {
          this.submitting = false;
          this.setState({submitting: false})
        })
    });
  }

  loginSuccess() {
    this.props.dispatch(fetchingUser());

    if(this.props.loginSuccess) {
      return this.props.loginSuccess();
    } else{
        this.props.dispatch(externalPop())
    }
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
  },
  err: {
    marginTop: 20,
    color: colors.error,
    textAlign: "center"
  }
});

function mapDispatchToProps(dispatch) {
    return {
        externalPush: route => dispatch(externalPush(route)),
    }
}

export default connect(null,mapDispatchToProps)(trackingScene(Login));
