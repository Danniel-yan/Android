
import { connect } from 'react-redux';

import { fetchFastLoanRecommends } from 'actions/scene/fastLoanRecommendList';
import RecommendList from 'components/shared/RecommendList'

function mapStateToProps(state) {
  return state.fastLoanRecommendList;
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRecommends: () => dispatch(fetchFastLoanRecommends())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendList);
