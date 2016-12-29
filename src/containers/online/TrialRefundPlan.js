import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';

import RefundPlan from './RefundPlan';

function TrialRefundPlan(props) {
  return (
    <ScrollView>
      <RefundPlan {...props}/>
    </ScrollView>
  );
}

import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import actions from 'actions/online';

function mapStateToProps(state) {

  return {
    isFetching: false,
    plans: [{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95' },{ date: '2016-01-08', amount: '2360.95'
    }]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {
      dispatch(actions.bankResult());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, trackingScene(TrialRefundPlan)));
