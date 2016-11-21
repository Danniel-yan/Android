import React, { Component } from 'react';
import { View, Text , ScrollView , StyleSheet } from 'react-native';

import { FormGroup, DropDown, HorizontalRadios, VerticalRadios, HorizontalCheckboxes } from "components/FormGroup";

import FastLoanRecommendList from 'containers/scene/FastLoanRecommendListContainer';
import { colors } from 'styles/varibles';

import Dimensions from 'Dimensions';
var screenWidth = Dimensions.get('window').width;

export default class FastLoanScene extends Component {
  constructor(props) {
    super(props);
  }
  static title = "极速贷款";
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <ScrollView>
          {this._renderFastLoanRecommend()}
          {this._renderFastLoanMore()}
        </ScrollView>
      </View>
    );
  }

  _renderFastLoanRecommend(){
    return(
      <View>
        <View style={[styles.title,styles.bgColorWhite]}>
          <Text style={styles.titleLeft}>最佳推荐</Text>
        </View>
        <FastLoanRecommendList/>
      </View>
    )
  }

  _renderFastLoanMore(){
    return(
      <View>
        <View style={[styles.title,styles.bgColorWhite]}>
          <Text style={styles.titleLeft}>更多选择</Text>
        </View>
        <FastLoanRecommendList/>
      </View>
    )
  }

  render() {
    return (
      <View>
        <FormGroup iptCollections={ [{
          name: 'amount', label: '借多少(元)', icon: require('assets/form-icons/jieduoshao.png'), value: 5000
        }, {
          name: 'deadline', label:'借多久(月)', icon: require('assets/form-icons/jieduojiu.png'), value: 12
        }] }></FormGroup>
        <HorizontalRadios eachLineCount={4} options={["上班族", "企业主", "学生", "自由职业"]}></HorizontalRadios>
        <View style={{flexDirection: 'row', borderBottomWidth:1, borderBottomColor: "#f2f2f2"}}>
          <View style={{width: screenWidth/2-1, height:32, borderRightColor: "#f2f2f2", borderRightWidth: 1}}>
            <DropDown title={"筛选"} panelWidth={screenWidth}>
              <HorizontalCheckboxes options={["无", "公积金", "社保", "征信报告", "信用卡账单", "运营商授权", "电商账号"]} eachLineCount={3}></HorizontalCheckboxes>
            </DropDown>
          </View>
          <View style={{width: screenWidth/2-1, height:32}}>
            <DropDown title={"排序"}>
              <VerticalRadios options={["默认", "利率低", "放款速度快"]}></VerticalRadios>
            </DropDown>
          </View>
        </View>
        <View style={{zIndex: -1}}>
          <ScrollView>
            {this._renderFastLoanRecommend()}
            {this._renderFastLoanMore()}
          </ScrollView>
        </View>
      </View>
    );
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
    color:colors.fontSizePrimary,
    flex:1
  }
})
