import React from 'react';
import {
  View, Text
} from 'react-native';
import { connect } from 'react-redux';

import { fetchBannerImgList } from 'actions/scene/home/headerSection'

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import BannerCarousel from 'components/BannerCarousel';

function mapStateToProps(state) {
  return state.bannerImgList;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(fetchBannerImgList())
  }
}

class LoadingEle extends React.Component {
  render() {
    return (<View><Text>Loading.....</Text></View>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(LoadingEle, BannerCarousel));
