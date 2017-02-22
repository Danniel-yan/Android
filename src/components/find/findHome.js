import React, { Component } from 'react';
import { View, ListView, Image ,StyleSheet,  TouchableHighlight ,Text, ScrollView, Platform, Dimensions} from 'react-native';

import SceneHeader from 'components/shared/SceneHeader';
import { ExternalPushLink } from 'containers/shared/Link';
import { fontSize, colors } from "styles/varibles";
import Banner from 'containers/scene/find/banner';
//import Artical from 'components/find/artical';
import Artical from 'containers/scene/find/artical';
import LoanProduct from 'containers/scene/find/loanProduct'

const { width, height } = Dimensions.get('window');

export default class findHome extends Component {

  render (){
    const logined = this.props.loginUser.info;
    return(
      <View style = {{flex : 1, backgroundColor : '#e6e6e6'}}>
        <SceneHeader
          title="发现"/>
        <ScrollView
          showsVerticalScrollIndicator = {false}
        >
        <View style = {{flexDirection : 'row', justifyContent : 'space-around', paddingVertical : 15, backgroundColor : '#fff'}}>
          <ExternalPushLink
            toKey="CardScene"
            title="办卡"
            componentProps ={{onBack : true}}
            style={styles.navItem}>
            <Image source={require('assets/discovery/icon_banka.png')} style = {styles.navImg}></Image>
            <Text style = {styles.navTxt}>办卡</Text>
          </ExternalPushLink>
          <ExternalPushLink
            title="网贷信用查询"
            toKey= {logined ? 'BlackListhome' : 'Login'}
            style={styles.navItem}>
            <Image source={require('assets/discovery/icon_heimingdan.png')} style = {styles.navImg}></Image>
            <Text style = {styles.navTxt}>网贷信用</Text>
          </ExternalPushLink>
          <ExternalPushLink
            title="信用贷"
            toKey="CreditLoan"
            style={styles.navItem}>
            <Image source={require('assets/discovery/icon_chazhengxin.png')} style = {styles.navImg}></Image>
            <Text style = {styles.navTxt}>查征信</Text>
          </ExternalPushLink>
          <ExternalPushLink
            title="我的账单"
            toKey="BillList"
            style={styles.navItem}>
            <Image source={require('assets/discovery/icon_chazhangdan.png')} style = {styles.navImg}></Image>
            <Text style = {styles.navTxt}>查账单</Text>
          </ExternalPushLink>
          <ExternalPushLink
            title="公积金查询"
            toKey="FundLogin"
            style={styles.navItem}>
            <Image source={require('assets/discovery/icon_chagongjijin.png')} style = {styles.navImg}></Image>
            <Text style = {styles.navTxt}>查公积金</Text>
          </ExternalPushLink>
        </View>
        <TouchableHighlight onPress = {this._pushToFastLoan()}>
          <View style = {{flexDirection :'row',marginTop : 2, backgroundColor: '#fff', height: 40, alignItems: "center"}}>
            <Text style = {{marginLeft : 10, marginRight : 15, fontSize : 16, color : '#333'}}>极速贷款</Text>
            <Text style = {{fontSize : 16, color : "#999"}}>流程简单，半小时到账</Text>
          </View>
        </TouchableHighlight>
        <Banner />
        <View style = {{backgroundColor : '#fff', marginBottom : 5}}>
          <LoanProduct />
        </View>
        <View style = {{backgroundColor : '#fff'}}><Artical /></View>
        </ScrollView>
      </View>
    )
  }
  _pushToFastLoan(){

  }


}


const styles = StyleSheet.create({
  container: {
    paddingLeft: 10, paddingRight: 10,
    height: 86,
    backgroundColor: "#FFF"
  },
  navItem: {
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center'
  },
  navTxt: {
    fontSize: fontSize.normal,
    color: "#333",
    marginTop:4
  },
  header : {
    height : Platform.OS === 'ios' ? 57 : 40,
    width : width,
    backgroundColor : 'red'
  },
  headerTitle :{
    color : '#fff',
    fontSize : 16,
    lineHeight : Platform.OS === 'ios' ? 57 : 40,
    textAlign : 'center'
  },
  navImg : {
    width : 36,
    height : 36,
  },
});
