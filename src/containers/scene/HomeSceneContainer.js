import { connect } from 'react-redux';

import { majorPush, majorPop } from 'actions/navigation';
import HomeScene from 'components/scene/HomeScene';

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    majorPush: route => dispatch(majorPush(route)),
    majorPop: route => dispatch(majorPop(route)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);
