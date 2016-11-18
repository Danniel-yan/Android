
import { connect } from 'react-redux';

import { receive_recommend } from 'actions/scene/home/recommendList';
import RecommendList from 'components/shared/RecommendList'

function requestRecommendToProps(state) {
  return state;
}

function receiveRecommendToProps(dispatch) {
  return {
    receive_recommend: route => dispatch(receive_recommend(items)),
  }
}

export default connect(requestRecommendToProps, receiveRecommendToProps)(RecommendList);