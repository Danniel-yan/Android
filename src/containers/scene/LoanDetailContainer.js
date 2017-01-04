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
  let { isFetching, ...detail } = state.loanDetail;
  let { isFetching: preloanStatusFetching, ...preloan } = state.online.preloanStatus;
  let { isFetching: firstFilterStatusFetching, ...userInfo } = state.online.userInfo;


  const isPageFetching = isFetching ||
    (ownProps.loan_type == loanType.chaoshidai && (preloanStatusFetching || firstFilterStatusFetching))

  return {
    isFetching: isFetching || preloanStatusFetching || firstFilterStatusFetching ,
    ...detail,
    preloanStatus: preloan.status,
    firstFilterStatus: userInfo.status,
    loginUser: state.loginUser,
    repayCalc: state.repayCalc,
    isIOSVerifying: state.iosConfig && state.iosConfig.isIOSVerifying
  };
}

function mapDispatchToProps(dispatch, ownProps, a) {

  return {
    fetching: id => {

      if(ownProps.loan_type == loanType.chaoshidai) {
        dispatch(onlineActions.preloanStatus());
        dispatch(onlineActions.userInfo());
      }

      dispatch(fetchLoanDetail(id))
    },
    goLoan: (detail) => {
      dispatch(externalPush({
        title: detail.title,
        web: detail.url,
        backCount: 2
      }))
    },
    fetchRepay: fetchedParams => dispatch(fetchRepayCalc(fetchedParams))
  }
}


const shareConfig = {
  title: '我刚刚在「钞市」成功申请信用卡，能随时查看办卡进度，太好用啦',
  content: '推荐给你～',
  url: 'http://t.cn/RIJqMla'
};

let SceneComponent = AsynCpGenerator(Loading, trackingScene(LoanDetail));
SceneComponent = externalScene(SceneComponent, () => <ShareButton config={shareConfig}/>);
SceneComponent = connect(mapStateToProps, mapDispatchToProps)(SceneComponent);
SceneComponent.external = true;
export default SceneComponent;
