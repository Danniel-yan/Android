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
      <View style={zoneStyles.group}>
        <View style={[zoneStyles.item, styles.itemHeader]}>
          <Image style={zoneStyles.icon} source={require('assets/zone/qq.png')}/>
          <Text style={zoneStyles.txt}>客服QQ交流群</Text>
        </View>
        <View style={[zoneStyles.item, styles.itemBody]}>
          <Text style={styles.linkTxt}>135784522</Text>
        </View>
      </View>

      <View style={zoneStyles.group}>
        <View style={[zoneStyles.item, styles.itemHeader]}>
          <Image style={zoneStyles.icon} source={require('assets/zone/business.png')}/>
          <Text style={zoneStyles.txt}>商务合作</Text>
        </View>
        <View style={[zoneStyles.item, styles.itemBody]}>
          <Text style={styles.linkTxt}>hejunxian01@chinatopcredit.com</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemHeader: {
    height: 40,
  },
  itemBody: {
    paddingLeft: 45,
    height: 52
  },
  linkTxt: {
    fontSize: 16,
    color: '#0090FF'
  }
});
