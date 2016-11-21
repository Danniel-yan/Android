import { connect } from 'react-redux';

import { majorPush, majorPop } from 'actions/navigation';
import FastLoanScene from 'components/scene/FastLoanScene';
import externalScene from 'components/high-order/externalScene';

import { fetchHomeRecommends } from 'actions/scene/home/recommendList';

function mapStateToProps(state) {
  return {  }
}

function mapDispatchToProps(dispatch) {
  return {
    majorPush: route => dispatch(majorPush(route)),
    majorPop: route => dispatch(majorPop(route)),

    fetchingRec: params => dispatch(fetchHomeRecommends(params))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(externalScene(FastLoanScene));
