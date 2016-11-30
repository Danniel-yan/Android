import React, { Component } from 'react';
import { WebView } from 'react-native';
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchLoanDetail } from 'actions/scene/loanDetail';
import LoanDetail from 'components/scene/LoanDetailScene';
import fetchLoginUser from 'actions/loginUser';

import { externalPop, externalPush } from 'actions/navigation';

function mapStateToProps(state) {
  return {
    ...state.loanDetail,
    loginUser: state.loginUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: id => dispatch(fetchLoanDetail(id)),
    fetchUser: () => dispatch(fetchLoginUser()),
    goLoan: (detail) => {
      dispatch(externalPush({ componentProps: { url: detail.url}, component: webView, title: detail.title, url: detail.url}))
    }
  }
}

function webView(props) {
  return (
    <WebView startInLoadingState={true} style={{flex: 1}} source={{uri: props.url}}/>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, LoanDetail));
