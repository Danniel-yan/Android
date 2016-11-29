import React, { Component } from 'react';
import { StatusBar, View, Text, Image, ScrollView , TouchableWithoutFeedback, StyleSheet } from 'react-native';

import { FormGroup, HorizontalRadios, VerticalRadios, HorizontalCheckboxes } from "components/FormGroup";

// import FastLoanRecommendList from 'containers/scene/home/RecommendListContainer';
import { RecList, MoreList } from 'containers/scene/fast/ListContainer';

import { colors } from 'styles/varibles';
import { container, rowContainer, flexRow, centering } from 'styles';

import Dimensions from 'Dimensions';
import AbstractScene from 'components/scene/AbstractScene.js';
import SceneHeader from 'components/shared/SceneHeader';
var screenWidth = Dimensions.get('window').width;

export default class FastLoanScene extends AbstractScene {
  constructor(props) {
    super(props);
    this.state = {
      fetchRecParams:{
        amount: props.amount || 5000,
        period: 12,
        job: 0,
        reslist: [],
        order: 1
      },
      isFetchingRec: true,
      toggleFilter: false,
      toggleSort: false
    };
    this.sceneEntity = "FAST_LOAN";
    this.sceneTopic = "";

    this.sceneEntity = "hpg";
    this.sceneTopic = "fast_loan";
    this.sceneKey = "loan";
  }
  static title = "极速贷款";

  formValueChanged(name, value) {
    this.state.fetchRecParams = Object.assign({}, this.state.fetchRecParams);
    this.state.fetchRecParams[name] = value;
    // console.log(this.state.fetchRecParams);
    this.fetchingData();
    // if(name == "amount" || name == "period") this.props.setLoanInfo && this.props.setLoanInfo(this.state.fetchRecParams);
  }

  resListSelected(resList) {
    var valueList = [];
    resList && resList.length > 0 && resList.map(res => valueList.push(res.value));
    this.formValueChanged("reslist", valueList);
    this.onToggleDrp("toggleFilter");
  }

  orderSelected(opt) {
    this.formValueChanged("order", opt.value);
    this.onToggleDrp("toggleSort");
  }

  onToggleDrp(key) {
    var origValue = this.state[key];
    this.state.toggleFilter = this.state.toggleSort = false;
    this.state[key] = !origValue;
    this.setState({toggleFilter: this.state.toggleFilter, toggleSort: this.state.toggleSort});
  }

  render() {
    var halfWidth = screenWidth / 2;
    return (
      <View style={{flex:1}}>
        <SceneHeader title="极速贷款"/>
        {this._renderLoanGroup()}
        <HorizontalRadios
          eachLineCount={4}
          options={[{label: "上班族", value: 1}, {label: "企业主", value: 2}, {label: "学生", value: 4}, {label: "自由职业", value: 8}]}
          selectedChanged={opt=>this.formValueChanged("job", opt.value)}>
        </HorizontalRadios>
        {this._renderDropDownFilters()}
        <View style={{zIndex:-5, borderTopColor: "#f2f2f2", borderTopWidth: 1, flex: 1}}>
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
        <RecList />
      </View>
    )
  }

  _renderFastLoanMore(){
    return(
      <View>
        <View style={[styles.title,styles.bgColorWhite]}>
          <Text style={styles.titleLeft}>更多选择</Text>
        </View>
        <MoreList />
      </View>
    )
  }

  _renderLoanGroup() {
    return (
      <FormGroup iptCollections={ [{
        name: 'amount', type: 'number', label: '借多少(元)', icon: require('assets/form-icons/jieduoshao.png'), value: this.state.fetchRecParams.amount,
        valueChanged: this.formValueChanged.bind(this)
      }, {
        name: 'period', type: 'picker', label:'借多久(月)', icon: require('assets/form-icons/jieduojiu.png'), value: this.state.fetchRecParams.period,
        items: [{value: "3", label: "3"}, {value: "6", label: "6"}, {value: "9", label: "9"}, {value: "12", label: "12"}, {value: "15", label: "15"}],
        valueChanged: this.formValueChanged.bind(this)
      }] }></FormGroup>
    );
  }

  _renderDropDownFilters() {
    var halfWidth = screenWidth / 2;
    var applyResList = [];
    this.props.apply_res_list && this.props.apply_res_list.map((item)=>{
      item && applyResList.push({label: item.name, value: item.key}) ;
    });
    return (
      <View style={{marginTop: 5, position: "relative", flexDirection:"row", justifyContent: 'space-between', height:32, alignItems: "center"}}>
        <TouchableWithoutFeedback onPress={()=>this.onToggleDrp("toggleFilter")}>
          <View style={{width:halfWidth, height:32, flexDirection:"row", alignItems:"center", justifyContent: "center", backgroundColor: this.state.toggleFilter ? "#E3E3E3" : "#fff"}}>
            <Text style={{fontSize: 14, color: "#333"}}>筛选</Text><Image resizeMode="stretch" style={styles.dropIcon} source={require('assets/icons/arrow-down.png')}/>
          </View>
        </TouchableWithoutFeedback>
        <View style={{position: "absolute", overflow: "hidden", left: 0, top: 32, zIndex: 3, width: screenWidth, height: this.state.toggleFilter ? null : 0}}>
          <HorizontalCheckboxes withBtns={true}
            options={applyResList}
            eachLineCount={3} selectedSubmit={(selectedIdxes) => this.resListSelected(selectedIdxes)}>
          </HorizontalCheckboxes>
        </View>
        <TouchableWithoutFeedback onPress={()=>this.onToggleDrp("toggleSort")}>
          <View style={{width:halfWidth, height:32, flexDirection:"row", alignItems:"center", justifyContent: "center", backgroundColor: this.state.toggleSort ? "#E3E3E3" : "#fff"}}>
            <Text style={{fontSize: 14, color: "#333"}}>排序</Text><Image resizeMode="stretch" style={styles.dropIcon} source={require('assets/icons/arrow-down.png')}/>
          </View>
        </TouchableWithoutFeedback>
        <View style={{position: "absolute", overflow: "hidden", left: screenWidth/2, top: 32, zIndex: 3, width: screenWidth/2,  height: this.state.toggleSort ? null : 0}}>
          <VerticalRadios selectedIdx={1} options={[{label: "利率低", value: 1}, {label: "放款速度快", value: 2}]} selectedChanged={idx=>{ this.orderSelected(idx); }}></VerticalRadios>
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.props.fetching && this.props.fetching();
    // console.log("CMPONENTDIDMOUNT");
    this.props.fetchingList && this.props.fetchingList(this.state.fetchRecParams);
    // this.fetchingData();
  }

  fetchingData() {
    // this.props.fetchingList && this.props.fetchingList(this.state.fetchRecParams);
    this.props.reFetchingList && this.props.reFetchingList(this.state.fetchRecParams);
  }
}
const styles = StyleSheet.create({
  title:{
    padding:10,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2"
  },
  bgColorWhite:{
    backgroundColor:colors.white
  },
  titleLeft:{
    fontSize:14,
    color:colors.fontColorPrimary,
    flex:1,
    color: "#FE271E"
  },
  dropIcon: {
    width: 10,
    height: 6,
    marginLeft: 2
    // backgroundColor: "gray"
  }
})
