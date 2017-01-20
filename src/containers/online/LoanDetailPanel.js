import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { border, container, colors, fontSize } from 'styles';
import GroupTitle from 'components/GroupTitle';
import L2RText from 'components/shared/L2RText';
import BankListContainer from 'containers/scene/card/BankListContainer';

export default function(props) {
  return (
    <View style={[styles.container, props.style]}>
      <L2RText left="借款额度：" right={props.approve_amount}/>
      <L2RText left="借款期限：" right={`${props.sug_term}期`}/>
      <L2RText left="月费率：" right={`${props.month_fee}%`}/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: '#fff'
  }
});
