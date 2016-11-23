import React, { Component } from 'react';

import {
  TouchableOpacity,
  StatusBar,
  Image,
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import panelStyles from './panelStyles';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import RecommendList from 'components/shared/RecommendList';
import Loading from 'components/shared/Loading';

const AsyncRecommendList = AsynCpGenerator(Loading, RecommendList);

export default class RecommendListPanel extends Component {

  render() {

    return (
      <View style={panelStyles.panel}>
        <View style={panelStyles.header}>
          <Text style={panelStyles.title}>热门推荐</Text>

          <TouchableOpacity style={panelStyles.addon} onPress={() => {this.props.fetching(this.props.offset)}}>
            <Text style={panelStyles.addonTxt}>换一批</Text>
            <Image style={panelStyles.addonImg} source={require('assets/index-icons/icon_huanyihuan.png')}/>
          </TouchableOpacity>
        </View>

        <AsyncRecommendList {...this.props}/>
      </View>
    );
  }
}
