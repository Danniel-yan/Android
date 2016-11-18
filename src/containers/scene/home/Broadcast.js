import React from 'react';
import {
  View, Text
} from 'react-native';
import { connect } from 'react-redux';

import { fetchBroadcastList } from 'actions/scene/home/headerSection'

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import BroadcastCarousel from 'components/BroadcastCarousel';

function mapStateToProps(state) {
  // return state.bannerImgList;
  return state.broadcastList;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(fetchBroadcastList())
  }
}

class LoadingEle extends React.Component {
  render() {
    return (<View><Text>Loading.....</Text></View>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(LoadingEle, BroadcastCarousel));
