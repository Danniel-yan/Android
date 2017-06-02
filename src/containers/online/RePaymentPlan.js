import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';
import * as defaultStyles from 'styles';
import { border, flexRow, container, fontSize, colors, responsive } from 'styles';
import { ExternalPushLink } from 'containers/shared/Link';

export default function RePaymentPlan(props) {
  let repayment_exception = require('assets/icons/repayment_exception.png');
  this.state = {
    status_icon: repayment_exception,
    currPeriod: props.currPeriod
  }

  if (props.status == 0) {
    let trs = props.list.map((plan, index) => {
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
  }else {
    return (
      <View style={[defaultStyles.container, defaultStyles.bg,styles.wrap_content]}>
          <View>
              <View style={styles.top}>
                  <Image style={styles.top_icon} source={this.state.status_icon}/>
                  <Text style={styles.top_text}>正努力为您计算还款计划，</Text>
                  <Text style={styles.top_text_nopadding}>请稍后再来查看</Text>
              </View>
          </View>
          <View style={styles.bottom}>
              <Text style={{fontSize: 14}}>如果有疑问请拨打客服热线：4009 160160</Text>
          </View>
          <ExternalPushLink
            tokey="OnlineLoanDetail"
            style = {styles.submitBtn}>
              <Text style = {styles.submitBtnText}>确定</Text>
          </ExternalPushLink>
      </View>
    );
  }

}

function TR(props) {
  let status = "";
  switch (parseInt(props.status)) {
    case 1:
      status = "已还款";
      break;
    case 2:
      status = "部分还款";
      break;
    case 3:
      status = "未还款";
      break;
    case 4:
      status = "已逾期";
      break;
  }
  return (
    <View style={[flexRow, styles.tr]}>
      <Text style={[styles.col1, styles.text]}>{props.period}</Text>
      <Text style={[container, styles.text]}>{props.date}</Text>
      <Text style={[container, styles.text]}>{props.amount}</Text>
      <Text style={[container, props.status == 4 || props.period == this.state.currPeriod ? styles.textred : styles.text]}>{status}</Text>
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
    width: responsive.width(140),
  },
  text: {
    textAlign: 'center',
    fontSize: fontSize.large,
    color: colors.grayDark
  },
  textred: {
    textAlign: 'center',
    fontSize: fontSize.large,
    color: 'red'
  },
  top: {
      height: 200,
      backgroundColor: '#ffffff',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
  },
  top_icon: {
      width: 70,
      height: 70,
  },
  top_text: {
      paddingTop: 20,
      color: '#333333',
      fontSize: 18
  },
  top_text_nopadding: {
      color: '#333333',
      fontSize: 18
  },
  bottom: {
      paddingTop: 20,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
  },
  submitBtn: {
    flex: 1,
    marginTop: 50,
    height: 40,
    backgroundColor: '#FF003C',
    borderRadius: 4,
    marginLeft: 10,
    marginRight: 10
  },
  submitBtnText: {
    fontSize: 20,
    color: '#fff'
  }
});
