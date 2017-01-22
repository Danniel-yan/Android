import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';

import { connect } from 'react-redux';

import CreditLoanHomeScene from 'components/scene/CreditLoanHomeScene';
import onlineActions from 'actions/online';
import { trackingScene } from 'high-order/trackingPointGenerator';

// module.exports = CreditLoanHomeScene

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(onlineActions.creditScore())
  }
}

export default connect(null, mapDispatchToProps)(trackingScene(CreditLoanHomeScene));
