import React, { Component } from 'react';
import { StatusBar, View, StyleSheet, Image , ListView, ScrollView } from 'react-native';

import Text from 'components/shared/Text';
import { colors } from 'styles/varibles';
import iconNext from 'assets/index-icons/icon_next.png';

import CardList from 'containers/scene/home/CardListContainer';
import ActHotContainer from 'containers/scene/ActHotContainer';
import BankListContainer from 'containers/scene/BankListContainer';

import Dimensions from 'Dimensions';

export default class CardScene extends Component {

  static title = "办卡";

  render() {

    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3',marginTop:20 }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
        <ScrollView>
          {this._renderActHot()}
          {this._renderCard()}
          {this._renderBankList()}
        </ScrollView>
      </View>
    );
  }

  _renderActHot(){
    return(
      <View>
        <View style={[styles.title,styles.bgColorWhite, {marginTop:5}]}>
          <Text style={styles.titleLeft}>今天薅什么</Text>
          <Text style={styles.titleRight}>
            更多产品
            <Image style={styles.titleRightImg} source={iconNext} />
          </Text>
        </View>
        <ActHotContainer/>
      </View>
    )
  }

  _renderCard(){
    return(
      <View style={{marginTop:5}}>
        <View style={[styles.title,styles.bgColorWhite]}>
          <Text style={styles.titleLeft}>极速办卡</Text>
        </View>
        <CardList/>
      </View>
    )
  }

  _renderBankList(){
    return(
      <View>
        <BankListContainer/>
      </View>
    )
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
    fontSize:17,
    color:colors.fontColorSecondary,
    flex:1,
    fontWeight:'bold'
  },
  titleRight:{
    fontSize:14
  },
  flexRow: {
    flexDirection: 'row'
  },
  flexHorizontalColumn:{
    padding:10,
    marginTop:5,
    marginBottom:10,
    marginLeft:5,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:5
  },
  titleRightImg:{
    width:15,
    height:15,
    marginLeft:5,
  }
})
