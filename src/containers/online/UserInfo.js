import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';

import Text from 'components/shared/Text';
import Button from 'components/shared/Button';
import Checkbox from 'components/shared/Checkbox'
import DeviceInfo from 'react-native-device-info';
import Picker from 'components/shared/Picker';
import validators from 'utils/validators';
import { container, rowContainer, centering, fontSize, colors } from 'styles';
import VerifyButton from 'components/shared/VerifyButton'
import alert from 'utils/alert';
import { externalPush } from 'actions/navigation';
import { get, post, responseStatus } from 'utils/fetch';
import FormGroup from 'components/shared/FormGroup';
import SubmitButton from './SubmitButton';
import ErrorInfo from './ErrorInfo';

import { DeviceSwitchComponent } from 'high-order/ComponentSwitcher';

const hasCreditStatus = {
  yes: 1,
  no: 0
}

class UserInfo extends Component {
  tracking() {
    return { key: 'onlineUserInfo' }
  }

  constructor(props) {
    super(props);

    let user = props.user.data || {};

    let form = {
      person_name: user.person_name || '',
      id_no: user.id_no || '',
      mobile: user.mobile || '',
      profession: user.profession || '',
      education: user.education || '',
      company: user.company || '',
      verify_code: user.verify_code || ''
    };

    this.state = {
      form
    }
  }

  _validation() {
    let { education, company, verify_code, mobile, id_no, profession, person_name } = this.state.form;

    const validMobile = validators.mobile(mobile);
    const validVerifyCode = verify_code.length > 1;
    const validName = person_name.length >= 2;
    const validID = validators.idNO(id_no);

    if(!this.formChanged) { return ''; }

    if(person_name.length < 2) { return '请输入有效姓名'; }

    if(!validID) { return '请输入有效身份证号'; }
    if(!validMobile) { return '请输入有效手机号'; }
    if(!validVerifyCode) { return '请输入验证码'; }
    if(profession == '') { return '请选择职业身份'; }
    if(education == '') { return '请选择教育程度'; }
    if(company.length == 0) { return '请输入单位名称'; }
  }

  render() {
    let { education, company, verify_code, mobile, id_no, profession, person_name } = this.state.form;

    let error = this._validation();
    let disabled = !this.formChanged || !!error;

    return (
      <View style={container}>

        <ScrollView style={[container, styles.container]}>
          <FormGroup label="姓名">
            <TextInput style={styles.formControl}
              clearButtonMode="while-editing"
              maxLength={20}
              value={person_name}
              underlineColorAndroid="transparent"
              onChangeText={this._inputChange.bind(this, 'person_name')}
            />
          </FormGroup>

          <FormGroup label="身份证号">
            <TextInput style={styles.formControl}
              clearButtonMode="while-editing"
              maxLength={18}
              value={id_no}
              underlineColorAndroid="transparent"
              onChangeText={this._inputChange.bind(this, 'id_no')}
            />
          </FormGroup>

          <FormGroup label="注册手机号">
            <TextInput style={styles.formControl}
              clearButtonMode="while-editing"
              keyboardType="numeric"
              maxLength={11}
              value={mobile}
              underlineColorAndroid="transparent"
              onChangeText={this._inputChange.bind(this, 'mobile')}
            />
          </FormGroup>

          
          <FormGroup label="输入验证码">
            <View style={[rowContainer, centering]}>

              <TextInput style={styles.formControl}
                clearButtonMode="while-editing"
                keyboardType="numeric"
                maxLength={6}
                value={verify_code}
                underlineColorAndroid="transparent"
                onChangeText={this._inputChange.bind(this, 'verify_code')}
              />

              <View style={styles.addon}>
                <VerifyButton
                  tracking={Object.assign({ entity: 'mob_code_button'}, this.tracking()) }
                  mobile={this.state.mobile}
                  />
              </View>
            </View>
          </FormGroup>

          <View style={styles.optional}>

            <FormGroup label="职业身份">
              <Picker
                style={styles.pickerGroup}
                value={profession}
                onChange={this._inputChange.bind(this, 'profession')}
                items={this.props.pickers.profession}
              />
            </FormGroup>

            <FormGroup label="教育程度">
              <Picker
                style={styles.pickerGroup}
                value={education}
                onChange={this._inputChange.bind(this, 'education')}
                items={this.props.pickers.education}
              />
            </FormGroup>

            <FormGroup label="单位名称">
              <TextInput style={styles.formControl}
                clearButtonMode="while-editing"
                maxLength={20}
                value={company}
                underlineColorAndroid="transparent"
                onChangeText={this._inputChange.bind(this, 'company')}
              />
            </FormGroup>


          </View>

          <ErrorInfo msg={error || this.state.error}/>

          <SubmitButton
            processing={this.state.submitting}
            textStyle={styles.btnText}
            disabled={disabled}
            text="去贷款"
            onPress={this._submit.bind(this)}/>

        </ScrollView>

      </View>
    );
  }


  _submit() {

    this.setState({ submitting: true, error: '' }, () => {
      let form = this.state.form;
      navigator.geolocation.getCurrentPosition(position => {
        const coords = position.coords;
        form.lati = coords.latitude; 
        form.long = Math.abs(coords.longitude);
        form.phone_model = DeviceInfo.getModel();
        form.phone_system_version = DeviceInfo.getSystemVersion();

        post('/loanctcf/first-filter', form).then(response => {
          if(response.res == responseStatus.success) {
            this.setState({ submitting: false})
            this.props.fetchStatus();
            this.props.goHome();
          } else {
            throw response.msg;
          }
        }).catch(err => {
          console.log(err);
          this.setState({ submitting: false, error: err})
        });
      });
    });
  }

  _inputChange(field, value) {
    this.formChanged = true;
    value = typeof value == 'string' ? value.trim() : value;
    let form = {...this.state.form, [field]: value };
    this.setState({ form });
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




import { connect } from 'react-redux';

import { trackingScene } from 'high-order/trackingPointGenerator';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

import actions from 'actions/online';

function mapStateToProps(state) {
  let user = state.online.userInfo;
  let pickers = state.online.pickers;

  return {
    isFetching: user.isFetching || pickers.isFetching,
    fetched: user.fetched && pickers.fetched,
    err: user.err || pickers.err,
    user, 
    pickers,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchStatus: () => dispatch(actions.status()),
    fetching: () => {dispatch(actions.pickers()); dispatch(actions.userInfo())},
    goHome: () => dispatch(externalPush({ key: 'CertificationHome', title: '信息认证' }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, trackingScene(UserInfo)));
