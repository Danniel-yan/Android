import { connect } from 'react-redux';

import { majorPush, majorPop, externalPush, externalPop } from 'actions/navigation';
import LoanScene from 'components/scene/LoanScene';

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    externalPush: route => dispatch(externalPush(route)),
    externalPop: route => dispatch(externalPop()),
    majorPush: route => dispatch(majorPush(route)),
    majorPop: route => dispatch(majorPop()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanScene);
