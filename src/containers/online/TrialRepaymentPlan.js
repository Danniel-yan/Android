import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import actions from 'actions/online';

import RePaymentPlan from './RePaymentPlan';

class TrialRepaymentPlan extends Component {
  render (){
    let repayDetail = this.props.repayDetail;
    return(
      <ScrollView>
        <RePaymentPlan {...repayDetail}/>
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.online.repayDetail.isFetching,
    repayDetail: state.online.repayDetail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {
      dispatch(actions.repayDetail())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, TrialRepaymentPlan));
