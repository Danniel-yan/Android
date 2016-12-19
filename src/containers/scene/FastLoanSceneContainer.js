import { connect } from 'react-redux';

import FastLoanScene from 'components/scene/FastLoanScene';
import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

import { fetchingApplyResList, fetchingFastFilterList, reFetchingFastFilterList, setLoanInfo } from 'actions/scene/fast/filterList';

function mapStateToProps(state) {
  return state.filterList;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => { dispatch(fetchingApplyResList()); },
    fetchingList: params => dispatch(fetchingFastFilterList(params)),
    reFetchingList: params => dispatch(reFetchingFastFilterList(params)),
    setLoanInfo: params => dispatch(setLoanInfo(params))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FastLoanScene);