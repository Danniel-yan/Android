import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';

import { colors } from 'styles/varibles';
import Text from 'components/shared/Text';
import Button from 'components/shared/Button';
import ProcessingButton from 'components/shared/ProcessingButton';
import Checkbox from 'components/shared/Checkbox'
import Picker from 'components/shared/Picker';
import validators from 'utils/validators';
import * as defaultStyles from 'styles';
import CountdownButton from 'components/shared/CountdownButton'
import AbstractScene from 'components/scene/AbstractScene.js';
import alert from 'utils/alert';
import { get, post } from 'utils/fetch';
import FormGroup from './shared/FormGroup';
import WebLink from 'components/shared/WebLink';

import { DeviceSwitchComponent } from 'components/high-order/ComponentSwitcher';
import LoanButton from 'containers/shared/LoanButton';

const hasCreditStatus = {
  yes: 1,
  no: 0
}

export default class FillUserInfo extends AbstractScene {
  static title = '完善个人信息';

  constructor(props) {
    super(props);
    this.sceneEntity="FILL_INFO";
    this.sceneTopic = "USER";
    this.sceneKey = "USER";

    let loginUser = props.loginUser.info || {};

    this.state = {
      checkedAgreement: true,
      username: loginUser.username,
      editableMobile: !loginUser.username,
      realname: loginUser.realname || '',
      idNO: loginUser.id_no || '',
      mobile: loginUser.mobile || '',
      creditStatus: loginUser.credit_status == hasCreditStatus.yes,
      job: loginUser.job || '',
      verifyCode: loginUser.verify_code || ''
    };
  }

  componentWillReceiveProps(nextProps, prevProps) {
    let user = nextProps.loginUser.info;

    if(user && user.id_no) {
      this.props.onSubmitSuccess(user);
    }
  }

  render() {
    let { editableMobile, checkedAgreement, username, verifyCode, mobile, idNO, job, creditStatus, realname } = this.state;

    const validMobile = validators.mobile(mobile);
    const validVerifyCode = !editableMobile || editableMobile && verifyCode.length == 6;
    const validName = realname.length >= 2;
    const validID = validators.idNO(idNO);
    const validAgreement = !editableMobile || editableMobile && checkedAgreement;

    return (
      <View style={defaultStyles.container}>

        <ScrollView style={[defaultStyles.container, styles.container]}>
          <FormGroup label="姓名">
            <TextInput style={styles.formControl}
              clearButtonMode="while-editing"
              maxLength={20}
              value={realname}
              underlineColorAndroid="transparent"
              onChangeText={this._inputChange.bind(this, 'realname')}
            />
          </FormGroup>

          <FormGroup label="身份证号">
            <TextInput style={styles.formControl}
              clearButtonMode="while-editing"
              maxLength={18}
              value={idNO}
              underlineColorAndroid="transparent"
              onChangeText={this._inputChange.bind(this, 'idNO')}
            />
          </FormGroup>

          <FormGroup label="注册手机号">
            <TextInput style={styles.formControl}
              clearButtonMode="while-editing"
              keyboardType="numeric"
              maxLength={11}
              value={username || mobile}
              editable={editableMobile}
              underlineColorAndroid="transparent"
              onChangeText={this._inputChange.bind(this, 'mobile')}
            />
          </FormGroup>

          { editableMobile && (
          <FormGroup label="输入验证码">
            <View style={[defaultStyles.rowContainer, defaultStyles.centering]}>

              <TextInput style={styles.formControl}
                clearButtonMode="while-editing"
                keyboardType="numeric"
                maxLength={6}
                value={verifyCode}
                underlineColorAndroid="transparent"
                onChangeText={this._inputChange.bind(this, 'verifyCode')}
              />

              <View style={styles.addon}>
                <CountdownButton disabled={!validMobile} onPress={this._sendVerify.bind(this)} style={styles.verifyBtn} defaultText="获取验证码" countdownText="${time}秒后可获取"/>
              </View>
            </View>
          </FormGroup>
          )}

          <View style={styles.optional}>
            <View style={styles.optionalHeader}><Text style={styles.optionalTxt}>选填</Text></View>

            <FormGroup label="职业身份">
              <Picker
                style={styles.pickerGroup}
                value={job}
                onChange={this._inputChange.bind(this, 'job')}
                items={[{value: '1', label:"上班族"},{value: '2', label:"学生"},{value: '3', label:"企业主"},{value: '4', label:"自由职业"}]}/>
            </FormGroup>

            <FormGroup label="有信用卡资质">

              <Checkbox
                style={styles.pickerGroup}
                checked={this.state.creditStatus == true}
                onChange={this._inputChange.bind(this, 'creditStatus')}
                />

            </FormGroup>


            { editableMobile  && (
              <View style={styles.txtRow}>
                <Checkbox checked={checkedAgreement} onChange={() => this.setState({checkedAgreement: !this.state.checkedAgreement})} style={{marginRight: 5}}/>
                <Text onPress={() => this.setState({checkedAgreement: !this.state.checkedAgreement})}>阅读并接受</Text>
                <WebLink
                  source={require('./agreement.html')}
                  toKey="Agreement"
                  text="《钞市服务协议》" title="《钞市服务协议》"
                />
              </View>
            )}

          </View>

        </ScrollView>

        <View style={styles.footer}>

          <LoanButton
            processing={this.props.update.submitting}
            style={styles.btn}
            disabled={!(validAgreement && validName && validMobile && validVerifyCode && validID)}
            onPress={this._submit.bind(this)}/>
        </View>
      </View>
    );
  }

  _sendVerify() {
    post('/tool/send-verify-code', { mobile: this.state.mobile})
      .catch(console.log)
  }

  _submit() {
    let { mobile, verifyCode: verify_code, idNO: id_no, job, creditStatus: credit_status, realname } = this.state;

    this.props.submit({ mobile, verify_code, id_no, job, credit_status: credit_status ? hasCreditStatus.yes : hasCreditStatus.no, realname });
  }

  _inputChange(field, value) {
    this.setState({ [field]: value });
  }
}

const styles = StyleSheet.create({
  container: {
  },

  formControl: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 10
  },

  footer: {
    height: 50,
  },

  btn: {
    color: '#fff',
    fontSize: 20,
    height: 50,
    backgroundColor: colors.primary
  },

  verifyBtn: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    width: 80,
    height: 26,
    fontSize: 12,
    color: '#fff'
  },

  addon: {
    paddingRight: 10
  },

  optional: {
    marginTop: 5,
  },

  optionalHeader: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    justifyContent: 'center'
  },

  optionalTxt: {
    color: '#999',
  },

  pickerGroup: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  txtRow: {
    marginTop: 10,
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
