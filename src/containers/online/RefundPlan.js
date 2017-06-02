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
      </View>

      {trs}
    </View>
  );
}

function TR(props) {
  let date = props.repayDate.split(' ')[0];

  return (
    <View style={[flexRow, styles.tr]}>
      <Text style={[styles.col1, styles.text]}>{props.phases}</Text>
      <Text style={[container, styles.text]}>{date}</Text>
      <Text style={[container, styles.text]}>{props.repayAmount}</Text>
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
    ...border('bottom', 1)
  },
  col1: {
    width: responsive.width(160),
  },
  text: {
    textAlign: 'center',
    fontSize: fontSize.large,
    color: colors.grayDark
  }
});
