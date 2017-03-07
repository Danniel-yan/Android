import { connect } from 'react-redux';
import { Platform } from 'react-native';
import fetchHomeOperating from 'actions/scene/home/operating'

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import BroadcastCarousel from 'components/BroadcastCarousel';
import Loading from 'components/shared/Loading';

function mapStateToProps(state) {
  return {
    isFetching: state.homeOperating.isFetching,
    fetched: state.homeOperating.fetched,
    msgList: state.homeOperating.operating.index_loan_adinfo
  };
}

function mapDispatchToProps(dispatch) {
  return {fetching: () => {}}
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, BroadcastCarousel));
