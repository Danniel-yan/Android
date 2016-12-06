import React, { Component } from 'react';
import { WebView } from 'react-native';
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';
import tracker from 'utils/tracker.js';

import { fetchLoanDetail } from 'actions/scene/loanDetail';
import LoanDetail from 'components/scene/LoanDetailScene';
import fetchLoginUser from 'actions/loginUser';

import { externalPop, externalPush } from 'actions/navigation';

import { fetchRepayCalc } from 'actions/scene/repayCalc'

function mapStateToProps(state) {
  return {
    ...state.loanDetail,
    loginUser: state.loginUser,
    repayCalc: state.repayCalc,
    isIOSVerifying: state.iosConfig && state.iosConfig.isIOSVerifying
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: id => dispatch(fetchLoanDetail(id)),
    fetchUser: () => dispatch(fetchLoginUser()),
    goLoan: (detail) => {
      tracker.trackAction('detail', detail.title, 'btn_sec', 'click');
      dispatch(externalPush({ componentProps: { url: detail.url}, component: webView, title: detail.title, url: detail.url}))
    },
    fetchRepay: fetchedParams => dispatch(fetchRepayCalc(fetchedParams))
  }
}

function webView(props) {
  return (
    <WebView startInLoadingState={true} style={{flex: 1}} source={{uri: props.url}}/>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, LoanDetail));
