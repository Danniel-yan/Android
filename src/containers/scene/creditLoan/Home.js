import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';

import { connect } from 'react-redux';

import CreditLoanHomeScene from 'components/scene/CreditLoanHomeScene';
import onlineActions from 'actions/online';
import { trackingScene } from 'high-order/trackingPointGenerator';
import { CertificationEntry } from 'high-order/Certification';
import { FreeStatus } from 'actions/blackList';

// module.exports = CreditLoanHomeScene

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(onlineActions.creditScore()),
    // reFetchBLFreeStatus: () => dispatch({type: "ReceiveFreeStatus", free: true, hasChance: false})
    reFetchBLFreeStatus: () => dispatch(FreeStatus())
  }
}

export default CertificationEntry(connect(null, mapDispatchToProps)(trackingScene(CreditLoanHomeScene)));
