import React, { Component } from 'react';
import {
  StatusBar,
  Image,
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView
} from 'react-native';

import NavigationTest from 'components/NavigationTest';
import Banner from 'containers/scene/home/Banner';
import Broadcast from 'containers/scene/home/Broadcast';
import RecommendList from 'containers/scene/home/RecommendListContainer';

import { colors } from 'styles/varibles'
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

export default class HomeScene extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'yellow' }}>
        <StatusBar barStyle="light-content"/>
        {this._renderHeader()}
        <Banner />
        <Broadcast />
        {this._renderRecommend()}
      </View>
    );
  }

  _renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.left}><Image source={require('assets/icons/pin2.png')}/><Text style={styles.locTxt}>上海</Text></View>
        <View style={styles.center}><Text style={styles.titleTxt}>钞市</Text></View>
        <View style={styles.right}><Image source={require('assets/icons/message.png')}/></View>
      </View>
    )
  }

  _renderRecommend(){
    return(
      <RecommendList/>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 57,
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: colors.primary,
    alignItems: 'center'
  },

  locTxt: {
    fontSize: 15,
    marginLeft: 3,
    color: '#fff'
  },

  titleTxt: {
    fontSize: 18,
    color: '#fff'
  },

  center: {
    width: 100,
    alignItems: 'center'
  },

  left: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10
  },

  right: {
    flex: 1,
    paddingRight: 10,
    alignItems: 'flex-end'
  }
});
