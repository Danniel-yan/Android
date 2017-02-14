import React from 'react';
import { connect } from 'react-redux';
import { externalPush } from 'actions/navigation';

import fetchFindOperating from 'actions/find/operating'

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import BannerCarousel from 'components/BannerCarousel';
import Loading from 'components/shared/Loading';

function mapStateToProps(state) {
  return {
    isFetching: state.findOperating.isFetching,
    fetched: state.findOperating.fetched,
    imgList: state.findOperating.operating.index_banner,
    isIOSVerifying: state.iosConfig.isIOSVerifying,
    iosFetched: state.iosConfig.fetched
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(fetchFindOperating())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, BannerCarousel));
