import React from 'react';
import { connect } from 'react-redux';

import LoanNavPanel from 'components/LoanNavPanel';

import { externalPush, majorTab } from 'actions/navigation';
import { setAmount } from 'actions/scene/fast/filterList';

function mapStateToProps(state) {
  return {
    loginUser: state.loginUser,
    token: state.fillUserInfo.token,
    isIOSVerifying: state.iosConfig.isIOSVerifying,
    iosFetched: state.iosConfig.fetched
  }
}

function mapDispatchToProps(dispatch) {
  return {
    externalPush: route => dispatch(externalPush(route)),
    majorTab: route => dispatch(majorTab(route))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanNavPanel);
