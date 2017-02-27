import React, { Component } from 'react';

import {
  View,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';

import Text from 'components/shared/Text';
import zoneStyles from './zoneStyles';
import NextIcon from 'components/shared/NextIcon';

export default function ContactScene(props) {
  return (
    <ScrollView>
      <View style={zoneStyles.group}>
        <View style={[zoneStyles.item, zoneStyles.itemHeader]}>
          <Image style={zoneStyles.icon} source={require('assets/zone/qq.png')}/>
          <Text style={zoneStyles.txt}>客服QQ交流群</Text>
        </View>
        <View style={[zoneStyles.item, zoneStyles.itemBody]}>
          <Text style={zoneStyles.linkTxt}>135784522</Text>
        </View>
      </View>

      <View style={zoneStyles.group}>
        <View style={[zoneStyles.item, zoneStyles.itemHeader]}>
          <Image style={zoneStyles.icon} source={require('assets/zone/business.png')}/>
          <Text style={zoneStyles.txt}>商务合作</Text>
        </View>
        <View style={[zoneStyles.item, zoneStyles.itemBody]}>
          <Text style={zoneStyles.linkTxt}>hejunxian01@shudu99.com</Text>
        </View>
      </View>
    </ScrollView>
  );
}
