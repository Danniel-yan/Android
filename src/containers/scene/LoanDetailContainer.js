import React, { Component } from 'react';
import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';
import tracker from 'utils/tracker.js';

import { fetchLoanDetail } from 'actions/scene/loanDetail';
import LoanDetail from 'components/scene/LoanDetailScene';

import { externalPop, externalPush } from 'actions/navigation';

import { fetchRepayCalc } from 'actions/scene/repayCalc'
import { trackingScene } from 'high-order/trackingPointGenerator';
import externalScene from 'high-order/externalScene';

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
    goLoan: (detail) => {
      //tracker.trackAction({ key: 'loan', topic: 'product_detail', entity: 'apply', event: 'clk'});
      dispatch(externalPush({
        title: detail.title,
        web: detail.url,
        backCount: 2
      }))
    },
    fetchRepay: fetchedParams => dispatch(fetchRepayCalc(fetchedParams))
  }
}

import ShareButton from 'components/shared/ShareButton';

let SceneComponent = AsynCpGenerator(Loading, trackingScene(LoanDetail));
SceneComponent = externalScene(SceneComponent, ShareButton);
SceneComponent = connect(mapStateToProps, mapDispatchToProps)(SceneComponent);
SceneComponent.external = true;
export default SceneComponent;
