import React, { Component } from 'react';
import { StatusBar, View, Text , ScrollView , StyleSheet } from 'react-native';

import FastLoanRecommendList from 'containers/scene/FastLoanRecommendListContainer';
import { colors } from 'styles/varibles';

export default class CardScene extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <StatusBar barStyle="light-content"/>
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