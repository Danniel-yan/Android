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
    this.initParams = {
        amount: 5000,
        period: 12,

        realname: props.realname,
        id_no: props.id_no,
        job: props.job || 2,
        mobile: props.mobile,
        credit_status: props.credit_status !== 0,
        mobile_time: props.mobile_time || 3,
        location: props.location || 1
    };
  }

  formValueChanged(name, value) {
    this.initParams[name] = value;
  }

  render() {
    return (
      <View style={{position: "relative"}}>
        <View style={{}}>
          <View>{ this._renderLoanInfoGroup() }</View>
          <View style={{marginTop: 5}}>{ this._renderUserInfoGroup() }</View>
        </View>
        <Button onPress={() => {this.props.updateInfo && this.props.updateInfo(this.initParams)}} style={[styles.loanButton, {marginTop: 20}]} text="去贷款"/>
      </View>
    );
  };

  _renderLoanInfoGroup() {
    return (
      <FormGroup deplayTime={100} iptCollections={ [{
        name: 'amount', type: 'number', label: '借多少(元)', icon: require('assets/form-icons/jieduoshao.png'), value: this.initParams.amount,
        valueChanged: this.formValueChanged.bind(this)
      }, {
        name: 'period', type: 'picker', label:'借多久(月)', icon: require('assets/form-icons/jieduojiu.png'), value: this.initParams.period,
        items: [{value: "3", label: "3"}, {value: "6", label: "6"}, {value: "9", label: "9"}, {value: "12", label: "12"}, {value: "15", label: "15"}],
        valueChanged: this.formValueChanged.bind(this)
      }] }></FormGroup>
    );
  }

  _renderUserInfoGroup() {
    return (
      <FormGroup iptCollections={ [{
        name: 'realname', label: '姓名', icon: require('assets/form-icons/xingming.png'), value: this.initParams.realname,
        valueChanged: this.formValueChanged.bind(this)
      }, {
        name: 'id_no', label:'身份证号', icon: require('assets/form-icons/shenfenzheng.png'), value: this.initParams.id_no,
        valueChanged: this.formValueChanged.bind(this)
      }, {
        name: 'job', label:'职业身份', type: "picker", icon: require('assets/form-icons/zhiyeshenfen.png'), value: this.initParams.job,
        items: [{value: '1', label:"上班族"},{value: '2', label:"学生"},{value: '3', label:"企业主"},{value: '4', label:"自由职业"}],
        valueChanged: this.formValueChanged.bind(this)
      }, {
        name: 'mobile', type: 'number', label:'手机号码', icon: require('assets/form-icons/shoujihao.png'), value: this.initParams.mobile,
        valueChanged: this.formValueChanged.bind(this)
      }, {
        name: 'credit_status', type: 'switch', label:'是否有信用卡', icon: require('assets/form-icons/xingyongka.png'), value: this.initParams.credit_status,
        valueChanged: this.formValueChanged.bind(this)
      }, {
        name: 'mobile_time', label:'手机号码使用时间', type: "picker", icon: require('assets/form-icons/shiyongshijian.png'), value: this.initParams.mobile_time,
        items: [{value: '1', label:"1个月"},{value: '2', label:"2个月"},{value: '3', label:"3个月"},{value: '4', label:"4个月"},{value: '5', label:"5个月"},{value: '6', label:"6个月及以上"}],
        valueChanged: this.formValueChanged.bind(this)
      }, {
        name: 'location', label:'所在城市', icon: require('assets/form-icons/dizhi.png'), value: this.initParams.location,
        valueChanged: this.formValueChanged.bind(this)
      }] }></FormGroup>
    );
  }
}
