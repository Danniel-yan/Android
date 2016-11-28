import React, { Component } from 'react';

import {
  View,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';

import Text from 'components/shared/Text';
import zoneStyles from './styles';
import NextIcon from 'components/shared/NextIcon';

export default function ContactScene(props) {
  return (
    <ScrollView>
      <View style={[zoneStyles.item, styles.item]}>
        <Image style={zoneStyles.icon} source={require('assets/zone/qq.png')}/>
        <Text style={zoneStyles.txt}>客服QQ交流群</Text>
        <Text style={styles.linkTxt}>135784522</Text>
      </View>

      <View style={[zoneStyles.item, styles.item]}>
        <Image style={zoneStyles.icon} source={require('assets/zone/business.png')}/>
        <Text style={zoneStyles.txt}>商务合作</Text>
        <Text style={styles.linkTxt}>hejunxian01@chinatopcredit.com</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 0,
    marginTop: 5,
    height: 60
  },
  linkTxt: {
    fontSize: 16,
    color: '#0090FF'
  }
});
