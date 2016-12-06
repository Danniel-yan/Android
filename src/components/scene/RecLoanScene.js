import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, AsyncStorage } from 'react-native';

import { post } from 'utils/fetch';
import { FormGroup, IptWrap } from "components/FormGroup";
import Button from 'components/shared/Button'
import AbstractScene from 'components/scene/AbstractScene.js';

import CountdownButton from 'components/shared/CountdownButton';
import LocationPicker from 'components/modal/LocationPicker';
import ProcessingButton from 'components/shared/ProcessingButton';

import { DeviceSwitchComponent } from 'components/high-order/ComponentSwitcher';

import { rowContainer, centering } from 'styles';
import styles from 'styles/loan';
import { colors } from 'styles/varibles';
import Dimensions from 'Dimensions';
var screenHeight = Dimensions.get('window').height;

export default class RecLoanScene extends AbstractScene {
  static title = "推荐贷款";

  constructor(props) {
    super(props);
    this.loanInfo = {
      amount: props.loanInfo.amount || 5000,
      period: props.loanInfo.period || 12
    };
    this.userInfo = Object.assign({}, {
      job: 2, mobile_time: 3, credit_status: 1
    }, props.userInfo);
    this.verifyCode = null;
    this.state = {
      hasLogin: !!this.userInfo.username,
      mobile: this.userInfo.username || this.userInfo.mobile,
      location: this.userInfo.location,
      showPicker: false,
      submitSuccess: this.props.submitSuccess
    };
    this.sceneKey = "loan";
    this.sceneTopic = "recommand";
    this.sceneEntity = "list";
  }

  componentDidMount() {
    if(this.userInfo.location) return;

    AsyncStorage.getItem("geoLocation").then(location=>{
      this.userInfo.location = location;
      this.setState({location: this.userInfo.location})
    })
  }

  loanValueChanged(name, value) {
    this.loanInfo[name] = value;
    this.props.setLoanInfo && this.props.setLoanInfo(this.loanInfo);
  }

  formValueChanged(name, value) {
    this.userInfo[name] = value;
    // this.props.userInfo && (this.props.userInfo[name] = value);
  }

  render() {
    var SubmitBtn = DeviceSwitchComponent(ProcessingButton, null);

    return (
      <ScrollView style={{position: "relative"}}>
        <View style={{}}>
          <View>{ this._renderLoanInfoGroup() }</View>
          <View style={{marginTop: 5}}>{ this._renderUserInfoGroup() }</View>
          { this._renderLocationIpt() }
          { this._renderLoginGroup() }
        </View>
        <View style={{marginTop: 20}}>
          <SubmitBtn processing={this.props.submitting}
            style={styles.loanButton}
            onPress={() => { this._goLoan() }} text="去贷款"/>
        </View>
        <LocationPicker visible={this.state.showPicker} onChange={this._changeLocation.bind(this)} onHide={() => this.setState({showPicker: false})}/>
      </ScrollView>
    );
  };

  _renderLoanInfoGroup() {
    return (
      <FormGroup deplayTime={100} iptCollections={ [{
        name: 'amount', type: 'number', label: '借多少(元)', icon: require('assets/form-icons/jieduoshao.png'), value: this.loanInfo.amount,
        valueChanged: this.loanValueChanged.bind(this)
      }, {
        name: 'period', type: 'picker', label:'借多久(月)', icon: require('assets/form-icons/jieduojiu.png'), value: this.loanInfo.period,
        items: [{value: "1", label: "1"}, {value: "3", label: "3"}, {value: "6", label: "6"},
          {value: "9", label: "9"}, {value: "12", label: "12"}, {value: "15", label: "15"},
          {value: "24", label: "24"}, {value: "36", label: "36"}],
        valueChanged: this.loanValueChanged.bind(this)
      }] }></FormGroup>
    );
  }

  _renderUserInfoGroup() {
    var gpArray1 = [{
      name: 'realname', label: '姓名', icon: require('assets/form-icons/xingming.png'), value: this.userInfo.realname,
      valueChanged: this.formValueChanged.bind(this)
    }, {
      name: 'id_no', label:'身份证号', icon: require('assets/form-icons/shenfenzheng.png'), value: this.userInfo.id_no,
      valueChanged: this.formValueChanged.bind(this)
    }, {
      name: 'job', label:'职业身份', type: "picker", icon: require('assets/form-icons/zhiyeshenfen.png'), value: this.userInfo.job,
      items: [{value: '1', label:"上班族"},{value: '2', label:"学生"},{value: '3', label:"企业主"},{value: '4', label:"自由职业"}],
      valueChanged: this.formValueChanged.bind(this)
    }], gpArray2 = [{
      name: 'mobile_time', label:'手机号码使用时间', type: "picker", icon: require('assets/form-icons/shiyongshijian.png'), value: this.userInfo.mobile_time,
      items: [{value: '1', label:"1个月"},{value: '2', label:"2个月"},{value: '3', label:"3个月"},{value: '4', label:"4个月"},{value: '5', label:"5个月"},{value: '6', label:"6个月及以上"}],
      valueChanged: this.formValueChanged.bind(this)
    }, {
      name: 'credit_status', type: 'switch', label:'有信用卡', icon: require('assets/form-icons/xingyongka.png'), value: this.userInfo.credit_status == 1,
      valueChanged: (name, value) => this.formValueChanged('credit_status', value ? 1 : 0)
    }], gpTotalArray = Array.prototype.concat(gpArray1, this.state.hasLogin ? [{
      name: 'mobile', type: 'number', label:'手机号码', icon: require('assets/form-icons/shoujihao.png'), value: this.userInfo.mobile,
      valueChanged: this.formValueChanged.bind(this)
    }]:[], gpArray2)

    return (
      <FormGroup iptCollections={ gpTotalArray }></FormGroup>
    );
  }

  _renderLocationIpt() {
    return (
      <View>
        <View style={[rowContainer, centering, recStyles.formRow]}>
          <View style={{flex: 1}}>
            <TouchableOpacity style={{flex: 1}} onPress={()=>this.setState({"showPicker": true})}>
              <IptWrap type={"static"} name={"location"} label={"所在城市"} icon={require('assets/form-icons/dizhi.png')}
                value={this.state.location}>
              </IptWrap>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _renderLoginGroup() {
    return this.state.hasLogin ? null : (
      <View style={{marginTop:5}}>
        <View style={[rowContainer, centering, recStyles.formRow]}>
          <View style={{flex: 1}}>
            <IptWrap type={'number'} name={'mobile'} icon={require('assets/form-icons/qingshurushoujihao.png')}
              placeholder={'请输入您的手机号码'} value={this.userInfo.mobile} styles={{ipt: {textAlign: 'left'}}}
              valueChanged={(name, value) => { this.formValueChanged("mobile", value); this.setState({"mobile": value}); }}>
            </IptWrap>
          </View>
          <View style={{paddingRight: 10}}>
            <CountdownButton disabled={!this.state.mobile} onPress={this._sendVerify.bind(this)} style={recStyles.verifyBtn} defaultText="获取验证码" countdownText="${time}秒后可获取"/>
          </View>
        </View>
        <View style={[rowContainer, centering, { height: 46, backgroundColor: "#fff" }]}>
          <View style={{flex: 1}}>
            <IptWrap name={'verifyCode'} icon={require('assets/form-icons/qingshuruyanzhengma.png')}
              placeholder={'请输入验证码'} value={""}
              valueChanged={(name, value) => { this.verifyCode = value; }}
              styles={{ipt: {textAlign: 'left'}}}>
            </IptWrap>
          </View>
        </View>
      </View>
    );
  }

  _sendVerify() {
    console.log("***Mobile***");
    console.log({mobile: this.userInfo.mobile})
    post('/tool/send-verify-code', { mobile: this.userInfo.mobile }).then(rsp => console.log(rsp))
      .catch(err => { alert('网络异常'); })
  }

  _goLoan() {
    this.props.goLoan && this.props.goLoan(Object.assign({}, this.userInfo, {verify_code: this.verifyCode}));
  }

  _changeLocation(loca) {
    this.userInfo.location = loca;
    this.setState({location: loca, showPicker: false});
  }
}

const recStyles = StyleSheet.create({
  verifyBtn: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    width: 80,
    height: 24,
    fontSize: 12,
    color: '#fff'
  },
  right: {
    position: "absolute",
    right: 0
  },
  formRow: {
    height: 47, backgroundColor: "#fff", borderBottomColor: colors.line, borderBottomWidth: 1
  }
});
