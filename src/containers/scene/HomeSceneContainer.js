import { connect } from 'react-redux';

import { majorPush, majorPop, externalPush, externalPop } from 'actions/navigation';
import HomeScene from 'components/scene/HomeScene';

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    majorPush: route => dispatch(majorPush(route)),
    majorPop: route => dispatch(majorPop(route)),
    externalPush: route => dispatch(externalPush(route)),
    externalPop: () => dispatch(externalPop()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);
