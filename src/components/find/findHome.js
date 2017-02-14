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
      <View style = {{flex : 1, backgroundColor : '#eee'}}>
        <SceneHeader
          title="发现"
          bgColor='red'
          textColor='#fff'
        />
        <ScrollView>
        <View style = {{flexDirection : 'row', justifyContent : 'space-around', paddingVertical : 15, backgroundColor : '#fff'}}>
          <ExternalPushLink
            toKey="CardScene"
            title="办卡"
            componentProps ={{onBack : true}}
            style={styles.navItem}>
            <Image source={require('assets/icons/tuijiandaikuan.png')}></Image>
            <Text>办卡</Text>
          </ExternalPushLink>
          <ExternalPushLink
            title="黑名单查询"
            toKey= {logined ? 'BlackListhome' : 'Login'}
            style={styles.navItem}>
            <Image source={require('assets/icons/tuijiandaikuan.png')}></Image>
            <Text>黑名单</Text>
          </ExternalPushLink>
          <ExternalPushLink
            title="信用贷"
            toKey="CreditLoan"
            style={styles.navItem}>
            <Image source={require('assets/icons/tuijiandaikuan.png')}></Image>
            <Text>查征信</Text>
          </ExternalPushLink>
          <ExternalPushLink
            title="我的账单"
            toKey="BillList"
            style={styles.navItem}>
            <Image source={require('assets/icons/tuijiandaikuan.png')}></Image>
            <Text>查账单</Text>
          </ExternalPushLink>
          <ExternalPushLink
            title="公积金查询"
            toKey="FundLogin"
            style={styles.navItem}>
            <Image source={require('assets/icons/tuijiandaikuan.png')}></Image>
            <Text>查公积金</Text>
          </ExternalPushLink>
        </View>
        <TouchableHighlight onPress = {this._pushToFastLoan()}>
          <View style = {{flexDirection : 'row',marginVertical : 5}}>
            <Text style = {{marginHorizontal : 10, }}>极速贷款</Text>
            <Text style = {{fontSize : 11, marginTop : 4}}>流程简单，半小时到账</Text>
          </View>
        </TouchableHighlight>
        <Banner />
        <View style = {{marginVertical : 5,paddingBottom : 10, backgroundColor : '#fff'}}>
          <LoanProduct />
        </View>
        <View style = {{backgroundColor : '#fff', paddingTop : 10}}><Artical /></View>
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
  }
});


