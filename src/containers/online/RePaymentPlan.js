import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
} from 'react-native';


import { border, flexRow, container, fontSize, colors, responsive } from 'styles';

export default function RefundPlan(props) {

  let trs = props.plans.map((plan, index) => {
    return <TR key={'tr'+index} {...plan} row={index+1}/>;
  });

  return (
    <View>
      <View style={[flexRow, styles.tr, styles.th]}>
        <Text style={[styles.col1, styles.text]}>期数</Text>
        <Text style={[container, styles.text]}>还款日期</Text>
        <Text style={[container, styles.text]}>还款金额(元)</Text>
        <Text style={[container, styles.text]}>还款状态</Text>
      </View>

      {trs}
    </View>
  );
}

function TR(props) {
  let status = "";
  switch (props.status) {
    case '1':
      status = "已还款";
      break;
    case '2':
      status = "部分还款";
      break;
    case '3':
      status = "未还款";
      break;
    default:

  }
  return (
    <View style={[flexRow, styles.tr]}>
      <Text style={[styles.col1, styles.text]}>{props.periodNum}</Text>
      <Text style={[container, styles.text]}>{props.repayDate}</Text>
      <Text style={[container, styles.text]}>{props.receiveAmount}</Text>
      <Text style={[container, styles.text]}>{status}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  th: {
    height: 36,
    backgroundColor: '#eee'
  },
  tr: {
    height: 46,
    backgroundColor: '#fff',
    ...border('bottom')
  },
  col1: {
    width: responsive.width(140),
  },
  text: {
    textAlign: 'center',
    fontSize: fontSize.large,
    color: colors.grayDark
  }
});
