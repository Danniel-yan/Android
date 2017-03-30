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
    <View>
      <View style={[styles.container, props.style]}>
        <L2RText left="借款额度：" right={props.approve_amount}/>
        <L2RText left="借款期限：" right={`${props.sug_term}期`}/>
        <L2RText left="月费率：" right={`${props.month_fee}%`}/>
      </View>
      <View style={styles.line}></View>
      <View style={[styles.container, props.style]}>
        <L2RText left="借款金额：" right={props.contractAmount}/>
      </View>
      <Text style={styles.text}>{`本次借款为您批核了${props.contractAmount}元的额度，请尽快在有效期内确认借款，有效期过后视为放弃借款`}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: '#fff'
  },
  line: {
    height: 10,
    backgroundColor: colors.bg
  },
  text: {
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 12
  }
});
