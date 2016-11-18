
import { connect } from 'react-redux';

import { fetchHomeRecommends } from 'actions/scene/home/recommendList';
import RecommendList from 'components/shared/RecommendList'

function mapStateToProps(state) {
  return state.homeRecommendList;
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRecommends: () => dispatch(fetchHomeRecommends())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendList);
