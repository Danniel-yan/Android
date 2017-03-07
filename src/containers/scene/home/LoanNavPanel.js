import React from 'react';
import { connect } from 'react-redux';

import LoanNavPanel from 'components/LoanNavPanel';

import { externalPush, majorTab } from 'actions/navigation';
import { setAmount } from 'actions/scene/fast/filterList';
import onlineActions from 'actions/online'

function mapStateToProps(state) {
  return {
    loginUser: state.loginUser,
    token: state.fillUserInfo.token,
    isIOSVerifying: state.iosConfig.isIOSVerifying,
    iosFetched: state.iosConfig.fetched,
    isIOS:state.iosConfig.isIOS
  }
}

function mapDispatchToProps(dispatch) {
  return {
    externalPush: route => dispatch(externalPush(route)),
    majorTab: route => dispatch(majorTab(route)),
    setLoanType: () => dispatch(onlineActions.setLoanType(0)),
    pbocInitial: () => dispatch(onlineActions.pboc.initial())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanNavPanel);
