import { connect } from 'react-redux';

import FastLoanScene from 'components/scene/FastLoanScene';
import externalScene from 'components/high-order/externalScene';

import { fetchingFastFilterList } from 'actions/scene/fast/filterList';

function mapStateToProps(state) {
  return state.filterList;
}

function mapDispatchToProps(dispatch) {
  return {
    fetchingList: params => dispatch(fetchingFastFilterList(params))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FastLoanScene);
