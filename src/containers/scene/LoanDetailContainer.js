import React, { Component } from 'react';
import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';
import tracker from 'utils/tracker.js';

import { fetchLoanDetail } from 'actions/scene/loanDetail';
import LoanDetail from 'components/scene/LoanDetailScene';

import { externalPop, externalPush } from 'actions/navigation';

import ShareButton from 'components/shared/ShareButton';
import { fetchRepayCalc } from 'actions/scene/repayCalc'
import { trackingScene } from 'high-order/trackingPointGenerator';
import externalScene from 'high-order/externalScene';
import onlineActions from 'actions/online';
import { loanType } from 'constants';

function mapStateToProps(state, ownProps) {
  let detail = { ...state.loanDetail };

  if(state.loanDetail.fetchedParams != ownProps.fetchingParams) {
    detail.isFetching = true;
    detail.fetched = false;
    detail.detail = {};
  }

  return {
    ...detail,
    onlineStatus: state.online.status,
    loginUser: state.loginUser,
    repayCalc: state.repayCalc,
    isIOSVerifying: state.iosConfig && state.iosConfig.isIOSVerifying,
    isIOS: state.iosConfig && state.iosConfig.isIOS
  };
}

function mapDispatchToProps(dispatch, ownProps) {

  return {
    fetching: id => {
      if(ownProps.loan_type == loanType.chaoshidai || ownProps.loan_type == loanType.gjj) {
        dispatch(onlineActions.setLoanType(ownProps.loan_type))
        dispatch(onlineActions.status());
      }

      dispatch(fetchLoanDetail(id))
    },
    fetchOnlineStatus: () => dispatch(onlineActions.status()),
    goLoan: (detail) => {
      dispatch(externalPush({
        title: detail.title,
        web: detail.url,
        backRoute: { key: 'LoanDetailScene' }
      }))
    },
    fetchRepay: fetchedParams => dispatch(fetchRepayCalc(fetchedParams)),
    setLoanType: (type) => dispatch(onlineActions.setLoanType(type || 1))
  }
}


const shareConfig = {
  title: '宝宝，这个App真不错，朋友刚刚借到2万元',
  content: '推荐给你～',
  url: 'http://t.cn/RIJqMla'
};

let SceneComponent = AsynCpGenerator(Loading, trackingScene(LoanDetail), true);
SceneComponent = externalScene(SceneComponent, () => <ShareButton tracking={{key: 'loan', topic: 'product_detail'}} config={shareConfig}/>);
SceneComponent = connect(mapStateToProps, mapDispatchToProps)(SceneComponent);
SceneComponent.external = true;
export default SceneComponent;
