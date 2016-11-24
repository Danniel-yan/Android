import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import { FormGroup } from "components/FormGroup";
import Button from 'components/shared/Button'
import AbstractScene from 'components/scene/AbstractScene.js';

import styles from 'styles/loan';
import Dimensions from 'Dimensions';
var screenHeight = Dimensions.get('window').height;

export default class RecLoanScene extends AbstractScene {
  static title = "推荐贷款";

  constructor(props) {
    super(props);
    this.state = {
      initParams : {
        amount: 5000,
        period: 12,

        realname: "董小贤",
        id_no: "320682199010086139",
        job: "学生",
        mobile: "18221309578",
        credit_status: "*有*",
        mobile_shiyongshijian: "*5个月*",
        city: "*上海*"
      }
    };
  }

  formValueChanged(name, value) {

  }

  render() {
    return (
      <View style={{position: "relative"}}>
        <View style={{height: screenHeight - 108}}>
          <View>{ this._renderLoanInfoGroup() }</View>
          <View style={{marginTop: 5}}>{ this._renderUserInfoGroup() }</View>
        </View>
        <Button onPress={() => this.props.externalPush({key: "Login"})} style={[styles.loanButton]} text="去贷款"/>
      </View>
    );
  };

  /* Use ScrollView
  <ScrollView style={{height: screenHeight - 108}}>
    <View>{ this._renderLoanInfoGroup() }</View>
    <View style={{marginTop: 5}}>{ this._renderUserInfoGroup() }</View>
  </ScrollView>
   */

  _renderLoanInfoGroup() {
    return (
      <FormGroup iptCollections={ [{
        name: 'amount', type: 'number', label: '借多少(元)', icon: require('assets/form-icons/jieduoshao.png'), value: this.state.initParams.amount,
        valueChanged: this.formValueChanged.bind(this)
      }, {
        name: 'period', type: 'number', label:'借多久(月)', icon: require('assets/form-icons/jieduojiu.png'), value: this.state.initParams.period,
        valueChanged: this.formValueChanged.bind(this)
      }] }></FormGroup>
    );
  }

  _renderUserInfoGroup() {
    return (
      <FormGroup iptCollections={ [{
        name: 'realname', label: '姓名', icon: require('assets/form-icons/xingming.png'), value: this.state.initParams.realname,
        valueChanged: this.formValueChanged.bind(this)
      }, {
        name: 'id_no', type: 'number', label:'身份证号', icon: require('assets/form-icons/shenfenzheng.png'), value: this.state.initParams.id_no,
        valueChanged: this.formValueChanged.bind(this)
      }, {
        name: 'job', label:'职业身份', icon: require('assets/form-icons/zhiyeshenfen.png'), value: this.state.initParams.job,
        valueChanged: this.formValueChanged.bind(this)
      }, {
        name: 'mobile', type: 'number', label:'手机号码', icon: require('assets/form-icons/shoujihao.png'), value: this.state.initParams.mobile,
        valueChanged: this.formValueChanged.bind(this)
      }, {
        name: 'credit_status', label:'是否有信用卡', icon: require('assets/form-icons/xingyongka.png'), value: this.state.initParams.credit_status,
        valueChanged: this.formValueChanged.bind(this)
      }, {
        name: 'mobile_shiyongshijian', label:'手机号码使用时间', icon: require('assets/form-icons/shiyongshijian.png'), value: this.state.initParams.mobile_shiyongshijian,
        valueChanged: this.formValueChanged.bind(this)
      }, {
        name: 'city', label:'所在城市', icon: require('assets/form-icons/dizhi.png'), value: this.state.initParams.city,
        valueChanged: this.formValueChanged.bind(this)
      }] }></FormGroup>
    );
  }
}
