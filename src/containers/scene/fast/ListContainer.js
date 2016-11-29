import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import RecommendList from 'components/shared/RecommendList.js';
import Loading from 'components/shared/Loading';

function mapStateToRecResultProps(state) {
  return {
    isFetching: state.filterList.isFetching,
    fetched: state.filterList.fetched,
    recommends: state.filterList.result_list
  };
}

function mapStateToMoreResultProps(state) {
  return {
    isFetching: state.filterList.isFetching,
    fetched: state.filterList.fetched,
    recommends: state.filterList.more_list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // majorPush: route => dispatch(majorPush(route)),
    // majorPop: route => dispatch(majorPop(route)),
    //
    // fetchingList: params => dispatch(fetchingFastFilterList(params))
    fetching: () => {}
  };
}

export const RecList = connect(mapStateToRecResultProps, mapDispatchToProps)(AsynCpGenerator(Loading, RecommendList));
export const MoreList = connect(mapStateToMoreResultProps, mapDispatchToProps)(AsynCpGenerator(Loading, RecommendList));
