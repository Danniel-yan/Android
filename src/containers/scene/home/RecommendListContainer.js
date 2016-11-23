import { connect } from 'react-redux';

import { fetchHomeRecommends } from 'actions/scene/home/recommendList';
import RecommendListPanel from 'components/scene/home/RecommendListPanel'

function mapStateToProps(state) {
  return state.homeRecommendList;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: params => dispatch(fetchHomeRecommends(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendListPanel);
