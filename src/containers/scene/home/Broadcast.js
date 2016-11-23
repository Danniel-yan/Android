import React from 'react';
import {
  View, Text
} from 'react-native';
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import BroadcastCarousel from 'components/BroadcastCarousel';
import Loading from 'components/shared/Loading';

function mapStateToProps(state) {
  return state.indexConfig;
}

function mapDispatchToProps(dispatch) {
  return {
    // fetching: () => {setTimeout(function(){dispatch(fetchBroadcastList());},1000)}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, BroadcastCarousel));
