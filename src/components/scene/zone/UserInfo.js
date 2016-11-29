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
import zoneStyles from './styles';
import AbstractScene from 'components/scene/AbstractScene.js';
import alert from 'utils/alert';
import FormGroup from 'components/shared/FormGroup';

const hasCreditStatus = {
  yes: 1,
  no: 0
}

export default class UserInfo extends AbstractScene {

  state = {
    hasCard: false
  };

  constructor(props) {
    super(props);
    this.sceneEntity="FILL_USER_INFO";
    this.sceneTopic = "";

    console.log(props);

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
              underlineColorAndroid="transparent"
              editable={false}
              value={mobile}
              onChangeText={this._inputChange.bind(this, 'mobile')}
            />
          </FormGroup>

          <View style={styles.optional}>
            <View style={styles.optionalHeader}><Text style={styles.optionalTxt}>选填</Text></View>

            <FormGroup style={styles.optionalGroup} label="职业身份">
              <Picker
                style={styles.pickerGroup}
                textStyle={styles.pickerTxt}
                value={job}
                onChange={this._inputChange.bind(this, 'job')}
                items={[{value: '1', label:"上班族"},{value: '2', label:"学生"},{value: '3', label:"企业主"},{value: '4', label:"自由职业"}]}/>
            </FormGroup>

            <FormGroup style={styles.optionalGroup} label="有无信用卡资质">
              <Checkbox
                style={styles.pickerGroup}
                checked={this.state.creditStatus == true}
                onChange={this._inputChange.bind(this, 'creditStatus')}
                />
            </FormGroup>

          </View>

          <View style={styles.footer}>
            <ProcessingButton color={colors.secondary} processing={this.props.update.submitting} style={zoneStyles.btn} disabled={!(validName && validMobile && validID)} onPress={this._submit.bind(this)} text="保存"/>
          </View>

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

const styles = StyleSheet.create({
  container: {
  },

  formControl: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 10
  },

  footer: {
    marginTop: 30,
    height: 50,
  },

  btn: {
    color: '#fff',
    fontSize: 20,
    height: 50,
    backgroundColor: colors.primary
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
