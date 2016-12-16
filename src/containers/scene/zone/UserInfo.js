import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { externalPop } from 'actions/navigation';
import fetchingUser from 'actions/loginUser';
import submitUserInfo from 'actions/fillUserInfo';

import { colors } from 'styles/varibles';
import Text from 'components/shared/Text';
import Button from 'components/shared/Button';
import ProcessingButton from 'components/shared/ProcessingButton';
import Checkbox from 'components/shared/Checkbox'
import Picker from 'components/shared/Picker';
import validators from 'utils/validators';
import * as defaultStyles from 'styles';
import zoneStyles from './zoneStyles';
import AbstractScene from 'components/scene/AbstractScene.js';
import alert from 'utils/alert';
import FormGroup from 'components/shared/FormGroup';

const hasCreditStatus = {
  yes: 1,
  no: 0
}

class UserInfo extends AbstractScene {

  constructor(props) {
    super(props);
    this.sceneEntity="FILL_USER_INFO";
    this.sceneTopic = "";

    let loginUser = props.loginUser.info;
    this.state = {
      creditStatus: loginUser.credit_status == hasCreditStatus.yes,
      job: loginUser.job || '',
      realname: loginUser.realname || '',
      mobile: loginUser.mobile,
      idNO: loginUser.id_no || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.update.token == this.props.update.token) {
      return;
    }

    if(nextProps.update.token) {
      this.props.onSubmitSuccess(nextProps.token);
    }
  }

  render() {
    let { mobile, idNO, job, creditStatus, realname } = this.state;

    const validMobile = validators.mobile(mobile);
    const validName = realname.length >= 2;
    const validID = validators.idNO(idNO);

    return (
      <View style={defaultStyles.container}>

        <ScrollView style={defaultStyles.container}>
          <FormGroup label="姓名">
            <TextInput style={zoneStyles.formControl}
                       clearButtonMode="while-editing"
                       maxLength={20}
                       value={realname}
                       underlineColorAndroid="transparent"
                       onChangeText={this._inputChange.bind(this, 'realname')}
              />
          </FormGroup>

          <FormGroup label="身份证号">
            <TextInput style={zoneStyles.formControl}
                       clearButtonMode="while-editing"
                       maxLength={18}
                       value={idNO}
                       underlineColorAndroid="transparent"
                       onChangeText={this._inputChange.bind(this, 'idNO')}
              />
          </FormGroup>

          <FormGroup label="注册手机号">
            <TextInput style={zoneStyles.formControl}
                       clearButtonMode="while-editing"
                       keyboardType="numeric"
                       maxLength={11}
                       underlineColorAndroid="transparent"
                       editable={false}
                       value={mobile}
                       onChangeText={this._inputChange.bind(this, 'mobile')}
              />
          </FormGroup>

          <View style={zoneStyles.optional}>
            <View style={zoneStyles.optionalHeader}><Text style={styles.optionalTxt}>选填</Text></View>

            <FormGroup label="职业身份">
              <Picker
                style={zoneStyles.pickerGroup}
                textStyle={zoneStyles.pickerTxt}
                value={job}
                onChange={this._inputChange.bind(this, 'job')}
                items={[{value: '1', label:"上班族"},{value: '2', label:"学生"},{value: '3', label:"企业主"},{value: '4', label:"自由职业"}]}/>
            </FormGroup>

            <FormGroup label="有无信用卡资质">
              <Checkbox
                style={zoneStyles.pickerGroup}
                checked={this.state.creditStatus == true}
                onChange={this._inputChange.bind(this, 'creditStatus')}
                />
            </FormGroup>

          </View>

          <ProcessingButton
            tracking={{key:'my_account', entity: 'login', topic: 'set'}}
            color={colors.secondary} processing={this.props.update.submitting} style={zoneStyles.btn} disabled={!(validName && validMobile && validID)} onPress={this._submit.bind(this)} text="保存"/>

        </ScrollView>
      </View>
    );
  }

  _submit() {
    let { mobile, idNO: id_no, job, creditStatus, realname } = this.state;

    this.props.submit({ mobile, id_no, job, credit_status: creditStatus ? hasCreditStatus.yes : hasCreditStatus.no, realname });
  }

  _inputChange(field, value) {
    this.setState({ [field]: value });
  }
}

function mapState(state) {
  return {
    update: state.fillUserInfo,
    loginUser: state.loginUser,
  }
}

function mapDispatch(dispatch) {
  return {
    submit: body => dispatch(submitUserInfo(body)),
    onSubmitSuccess: () => {
      dispatch(fetchingUser());
      dispatch(externalPop());
    }
  };
}

export default connect(mapState, mapDispatch)(UserInfo);
