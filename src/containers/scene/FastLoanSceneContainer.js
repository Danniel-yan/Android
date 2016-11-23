import { connect } from 'react-redux';

import { majorPush, majorPop } from 'actions/navigation';
import FastLoanScene from 'components/scene/FastLoanScene';
import externalScene from 'components/high-order/externalScene';

// import { fetchHomeRecommends } from 'actions/scene/home/recommendList';
import { fetchingFastFilterList } from 'actions/scene/fast/filterList';

function mapStateToProps(state) {
  return state.filterList;
}

function mapDispatchToProps(dispatch) {
  return {
    majorPush: route => dispatch(majorPush(route)),
    majorPop: route => dispatch(majorPop(route)),

    fetchingList: params => dispatch(fetchingFastFilterList(params))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(externalScene(FastLoanScene));
