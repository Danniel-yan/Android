import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';

import RefundPlan from './RefundPlan';
import RePaymentPlan from './RePaymentPlan';

export default function TrialRefundPlan(props) {
  if (props.repayment) {
    return (
      <ScrollView>
        <RePaymentPlan {...props}/>
      </ScrollView>
    );
  }else{
    return (
      <ScrollView>
        <RefundPlan {...props}/>
      </ScrollView>
    );
  }

}
