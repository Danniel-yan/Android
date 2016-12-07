import React from 'react';
import { connect } from 'react-redux';
import { externalPush } from 'actions/navigation';

import fetchHomeOperating from 'actions/scene/home/operating'

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import BannerCarousel from 'components/BannerCarousel';
import Loading from 'components/shared/Loading';

function mapStateToProps(state) {
  return {
    isFetching: state.homeOperating.isFetching,
    fetched: state.homeOperating.fetched,
    imgList: state.homeOperating.operating.index_top_banner,
    isIOSVerifying: state.iosConfig.isIOSVerifying,
    iosFetched: state.iosConfig.fetched
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(fetchHomeOperating())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, BannerCarousel));
