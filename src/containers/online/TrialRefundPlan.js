import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';

import RefundPlan from './RefundPlan';

export default function TrialRefundPlan(props) {
  return (
    <ScrollView>
      <RefundPlan {...props}/>
    </ScrollView>
  );
}

