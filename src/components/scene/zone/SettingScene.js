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
import Button from 'components/shared/Button';
import OverlayLoading from 'components/shared/OverlayLoading';

export default function ContactScene(props) {
  return (
    <ScrollView>
      <View style={zoneStyles.item}>
        <Text style={zoneStyles.txt}>关于我们</Text>
        <NextIcon/>
      </View>

      <View style={zoneStyles.item}>
        <Text style={zoneStyles.txt}>清除缓存</Text>
        <Text style={styles.txt}>3.30MB</Text>
        <NextIcon/>
      </View>

      <View style={[zoneStyles.item, zoneStyles.group]}>
        <Text style={zoneStyles.txt}>前往应用市场评价</Text>
        <NextIcon/>
      </View>

      <Button onPress={props.logout} text="安全退出" style={zoneStyles.btn}/>
      <OverlayLoading visible={props.logouting || false}/>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  txt: {
    color: '#333',
    fontSize: 16,
    marginRight: 5
  }
});
