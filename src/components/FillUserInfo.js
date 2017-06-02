import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';

import { border, colors } from 'styles';
import Text from 'components/shared/Text';
import Button from 'components/shared/Button';
import Checkbox from 'components/shared/Checkbox'
import Picker from 'components/shared/Picker';
import validators from 'utils/validators';
import * as defaultStyles from 'styles';
import VerifyButton from 'components/shared/VerifyButton'
import alert from 'utils/alert';
import { get, post } from 'utils/fetch';
import FormGroup from './shared/FormGroup';
import { ExternalPushLink } from 'containers/shared/Link';

import { DeviceSwitchComponent } from 'high-order/ComponentSwitcher';
import LoanButton from 'containers/shared/LoanButton';

const hasCreditStatus = {
  yes: 1,
  no: 0
}

export default class FillUserInfo extends Component {
  static title = '完善个人信息';

  tracking() {
    let userFilled = this.props.loginUser.info && this.props.loginUser.info.username;

    return { key: 'loan', topic: userFilled  ? 'complete_info_rtn_S' : 'complete_info_new_S' };
  }

  constructor(props) {
    super(props);
    this.sceneEntity="show_form";
    this.sceneTopic = "signup_thru_exp_loan";
    this.sceneKey = "user";

    let loginUser = props.loginUser.info || {};

    this.state = {
      checkedAgreement: true,
      username: loginUser.username,
      editableMobile: !loginUser.username,
      realname: loginUser.realname || '',
      idNO: loginUser.id_no || '',
      mobile: loginUser.username || loginUser.mobile || '',
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

  _validation() {
    if(!this.formChanged) {
      return false;
    }

    let { editableMobile, checkedAgreement, username, verifyCode, mobile, idNO, job, creditStatus, realname } = this.state;

    const validMobile = validators.mobile(mobile);
    const validVerifyCode = !editableMobile || editableMobile && verifyCode.length > 0;
    const validName = realname.length >= 2;
    const validID = validators.idNO(idNO);
    const validAgreement = !editableMobile || editableMobile && checkedAgreement;

    if(!validName) {
      this.setState({error: '请输入有效的名字'});
      return false;
    }

    if(!validID) {
      this.setState({error: '请输入有效的身份证号'});
      return false;
    }

    if(!validMobile) {
      this.setState({error: '请输入正确的手机号'});
      return false;
    }

    if(!validVerifyCode) {
      this.setState({error: '请输入验证码'});
      return false;
    }

    if(!validAgreement) {
      this.setState({error: '请接受钞市服务协议'});
      return false;
    }

    this.setState({error: ''});
    return true;
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
                <VerifyButton
                  tracking={Object.assign({ entity: 'mob_code_button'}, this.tracking()) }
                  mobile={this.state.mobile}
                  />
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
                <Text onPress={() => this._inputChange('checkedAgreement', !this.state.checkedAgreement)}>阅读并接受</Text>
                <ExternalPushLink
                  web='https://chaoshi-api.jujinpan.cn/static/pages/chaoshi/agreement.html'
                  text="《钞市服务协议》" title="《钞市服务协议》"
                />
              </View>
            )}

            <View style={styles.txtRow}>
              <Text style={styles.error}>{this.state.error}</Text>
            </View>
          </View>

        </ScrollView>

        <View>
          <TouchableOpacity onPress={()=>{
            this._submit.bind(this);
            tracker.trackAction(Object.assign({entity: 'apply', name: realname, cell: mobile, profession: job, own_credit_card: creditStatus}, this.tracking()))
          }}>
            <LoanButton/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  _submit() {
    this.props.type && this.props.type == 'loandetail' && tracker.trackGIO('land_loan_complete_info_new_S_apply',{})
    let { mobile, verifyCode: verify_code, idNO: id_no, job, creditStatus: credit_status, realname } = this.state;

    this.props.submit({ mobile, verify_code, id_no, job, credit_status: credit_status ? hasCreditStatus.yes : hasCreditStatus.no, realname });
  }

  _inputChange(field, value) {
    this.formChanged = true;
    this.setState({ [field]: value }, this._validation.bind(this));
  }
}

const styles = StyleSheet.create({
  container: {
  },
  error: {
    color: colors.error
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
    height: 50,
    backgroundColor: colors.primary
  },

  btnText: {
    color: '#fff',
    fontSize: 20,
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
    ...border('bottom', 1),
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
