import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchHomeRecommends } from 'actions/scene/home/recommendList';
import RecommendList from 'components/shared/RecommendList'

function mapStateToProps(state) {
  return state.homeRecommendList;
}

function mapDispatchToProps(dispatch) {
  return {
    // Remove this command cause the fetching action should invoked by containers
    // fetching: params => dispatch(fetchHomeRecommends(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, RecommendList));
