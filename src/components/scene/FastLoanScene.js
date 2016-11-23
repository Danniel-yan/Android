import React, { Component } from 'react';
import { StatusBar, View, Text , ScrollView , TouchableWithoutFeedback, StyleSheet } from 'react-native';

import { FormGroup, HorizontalRadios, VerticalRadios, HorizontalCheckboxes } from "components/FormGroup";

import FastLoanRecommendList from 'containers/scene/home/RecommendListContainer';

import { colors } from 'styles/varibles';

import Dimensions from 'Dimensions';
import AbstractScene from 'components/scene/AbstractScene.js';
var screenWidth = Dimensions.get('window').width;

export default class FastLoanScene extends AbstractScene {
  constructor(props) {
    super(props);
    this.state = {
      fetchRecParams:{
        amount: 5000,
        deadline: 12,
        userType: 1
      },
      isFetchingRec: true,
      toggleFilter: false,
      toggleSort: false
    }
    this.sceneEntity = "FAST_LOAN";
    this.sceneTopic = "";
  }
  static title = "极速贷款";

  formValueChanged(name, value) {
    this.state.fetchRecParams = Object.assign({}, this.state.fetchRecParams);
    this.state.fetchRecParams[name] = value;
    this.props.fetchingRec && this.props.fetchingRec(this.state.fetchRecParams);
  }

  onToggleDrp(key) {
    var origValue = this.state[key];
    this.state.toggleFilter = this.state.toggleSort = false;
    this.state[key] = !origValue;
    this.setState({toggleFilter: this.state.toggleFilter, toggleSort: this.state.toggleSort});
  }

  render() {
    var halfWidth = screenWidth / 2 - 1;
    return (
      <View>
        <StatusBar barStyle="light-content"/>
          {this._renderLoanGroup()}
          <HorizontalRadios eachLineCount={4} options={["上班族", "企业主", "学生", "自由职业"]}></HorizontalRadios>
          <View style={{position: "relative", flexDirection:"row", justifyContent: 'space-between', height:32, alignItems: "center"}}>
            <TouchableWithoutFeedback onPress={()=>this.onToggleDrp("toggleFilter")}>
              <View style={{width:halfWidth, height:32, flexDirection:"row", alignItems:"center", justifyContent: "center", backgroundColor: this.state.toggleFilter ? null : "#fff"}}>
                <Text style={{fontSize: 14}}>筛选</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{position: "absolute", overflow: "hidden", left: 0, top: 32, zIndex: 3, width: screenWidth, height: this.state.toggleFilter ? null : 0}}>
              <HorizontalCheckboxes options={["无", "公积金", "社保", "征信报告", "信用卡账单", "运营商授权", "电商账号"]} eachLineCount={3}></HorizontalCheckboxes>
            </View>
            <TouchableWithoutFeedback onPress={()=>this.onToggleDrp("toggleSort")}>
              <View style={{width:halfWidth, height:32, flexDirection:"column", justifyContent: "center", backgroundColor: this.state.toggleSort ? null : "#fff"}}>
                <Text style={{textAlign:"center", fontSize: 14}}>排序</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{position: "absolute", overflow: "hidden", left: screenWidth/2, top: 32, zIndex: 3, width: screenWidth/2,  height: this.state.toggleSort ? null : 0}}>
              <VerticalRadios options={["默认", "利率低", "放款速度快"]}></VerticalRadios>
            </View>
          </View>
          <View style={{zIndex:-5, borderTopColor: "#f2f2f2", borderTopWidth: 1}}>
            <ScrollView>
              {this._renderFastLoanRecommend()}
              {this._renderFastLoanMore()}
            </ScrollView>
          </View>

      </View>
    );
  }

  _renderFastLoanRecommend(){
    return(
      <View>
        <View style={[styles.title,styles.bgColorWhite]}>
          <Text style={styles.titleLeft}>最佳推荐</Text>
        </View>
        <FastLoanRecommendList fetchingParams={{fetchingParams: this.state.fetchRecParams}}/>
      </View>
    )
  }

  _renderFastLoanMore(){
    return(
      <View>
        <View style={[styles.title,styles.bgColorWhite]}>
          <Text style={styles.titleLeft}>更多选择</Text>
        </View>
        <FastLoanRecommendList fetchingParams={{fetchingParams: this.state.fetchRecParams}}/>
      </View>
    )
  }

  _renderLoanGroup() {
    return (
      <FormGroup iptCollections={ [{
        name: 'amount', type: 'number', label: '借多少(元)', icon: require('assets/form-icons/jieduoshao.png'), value: this.state.fetchRecParams.amount,
        valueChanged: this.formValueChanged.bind(this)
      }, {
        name: 'deadline', type: 'number', label:'借多久(月)', icon: require('assets/form-icons/jieduojiu.png'), value: this.state.fetchRecParams.deadline,
        valueChanged: this.formValueChanged.bind(this)
      }] }></FormGroup>
    );
  }

  componentDidMount() {
    this.props.fetchingRec && this.props.fetchingRec(this.state.fetchRecParams);
  }
}
const styles = StyleSheet.create({
  title:{
    padding:10,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
  },
  bgColorWhite:{
    backgroundColor:colors.white
  },
  titleLeft:{
    fontSize:14,
    color:colors.fontColorPrimary,
    flex:1
  }
})
