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
const hasCreditStatus = {
  yes: 1,
  no: 0
}

export default class FillUserInfo extends AbstractScene {
  static title = '完善个人信息';

  state = {
    hasCard: false,
    mobile: '',
    verifyCode: '',
    realname: '',
    idNO: '',
    job: '',
    creditStatus: hasCreditStatus.no
  };

  constructor(props) {
    super(props);
    this.sceneEntity="fill_info";
    this.sceneTopic = "user_info";
    this.sceneKey = "user"
  }
  componentDidUpdate() {
    let { response } = this.props;
    // TODO 判断结果
    if(response) {
      this.props.submitSuccess(response);
    }
  }

  render() {

    const validMobile = validators.mobile(this.state.mobile);
    const validVerifyCode = this.state.verifyCode.length == 6;
    const validName = this.state.realname.length >= 2;
    const validID = validators.idNO(this.state.idNO);

    return (
      <View style={defaultStyles.container}>

        <ScrollView style={[defaultStyles.container, styles.container]}>
          <FormGroup label="姓名">
            <TextInput style={styles.formControl}
              clearButtonMode="while-editing"
              maxLength={20}
              underlineColorAndroid="transparent"
              onChangeText={this._inputChange.bind(this, 'realname')}
            />
          </FormGroup>

          <FormGroup label="身份证号">
            <TextInput style={styles.formControl}
              clearButtonMode="while-editing"
              maxLength={18}
              underlineColorAndroid="transparent"
              onChangeText={this._inputChange.bind(this, 'idNO')}
            />
          </FormGroup>

          <FormGroup label="注册手机号">
            <TextInput style={styles.formControl}
              clearButtonMode="while-editing"
              keyboardType="numeric"
              maxLength={11}
              underlineColorAndroid="transparent"
              onChangeText={this._inputChange.bind(this, 'mobile')}
            />
          </FormGroup>

          <FormGroup label="输入验证码">
            <View style={[defaultStyles.rowContainer, defaultStyles.centering]}>

              <TextInput style={styles.formControl}
                clearButtonMode="while-editing"
                keyboardType="numeric"
                maxLength={6}
                underlineColorAndroid="transparent"
                onChangeText={this._inputChange.bind(this, 'verifyCode')}
              />

              <View style={styles.addon}>
                <CountdownButton disabled={!validMobile} onPress={this._sendVerify.bind(this)} style={styles.verifyBtn} defaultText="获取验证码" countdownText="${time}秒后可获取"/>
              </View>
            </View>
          </FormGroup>

          <View style={styles.optional}>
            <View style={styles.optionalHeader}><Text style={styles.optionalTxt}>选填</Text></View>

            <FormGroup style={styles.optionalGroup} label="职业身份">
              <Picker style={styles.pickerGroup} textStyle={styles.pickerTxt}
                onChange={this._inputChange.bind(this, 'job')}
                items={[{value: '1', label:"上班族"},{value: '2', label:"学生"},{value: '3', label:"企业主"},{value: '4', label:"自由职业"}]}/>
            </FormGroup>

            <FormGroup style={styles.optionalGroup} label="有无信用卡资质">

              <TouchableOpacity
                style={styles.pickerGroup}
                activeOpacity={1}
                onPress={checked => this.setState({ creditStatus: !this.state.creditStatus })}
                >

                <Checkbox checked={this.state.creditStatus == true}
                  onChange={this._inputChange.bind(this, 'creditStatus')}
                  />

              </TouchableOpacity>

            </FormGroup>
          </View>

        </ScrollView>

        <View style={styles.footer}>
          <ProcessingButton
            tracking={{key: 'supplement', topic: 'btn_sec', entity: 'application', event: 'click'}}
            processing={this.props.submitting} style={styles.btn} disabled={(validName && validMobile && validVerifyCode && validID)} onPress={this._submit.bind(this)} text="去贷款"/>
        </View>
      </View>
    );
  }

  _sendVerify() {}

  _submit() {
    let { mobile, verifyCode: verify_code, idNO: id_no, job, creditStatus: credit_status, realname } = this.state;
    //console.log({ mobile, verify_code, id_no, job, credit_status: credit_status ? hasCreditStatus.yes : hasCreditStatus.now, realname });

    this.props.submit({ mobile, verify_code, id_no, job, credit_status: credit_status ? hasCreditStatus.yes : hasCreditStatus.now, realname });
  }

  _inputChange(field, value) {
    this.setState({ [field]: value });
  }
}

class FormGroup extends Component {
  render() {
    return (
      <View style={[defaultStyles.container, styles.formGroup, this.props.style]}>
        <View style={styles.controlLabel}><Text style={styles.label}>{this.props.label}</Text></View>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },

  formGroup: {
    height: 55,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.line
  },

  controlLabel: {
    position: 'absolute',
    left: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center'
  },

  label: {
    fontSize: 16,
    color: '#666',
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

  optionalGroup: {
    backgroundColor: '#f5f5f5',
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

  pickerTxt: {
    marginRight: 10
  }
});
