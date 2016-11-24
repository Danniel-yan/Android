import { connect } from 'react-redux';

import { majorPush, majorPop, externalPush, externalPop } from 'actions/navigation';
import RecLoanScene from 'components/scene/RecLoanScene';
import externalScene from 'components/high-order/externalScene';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    externalPush: (route) => { dispatch(externalPush(route)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(externalScene(RecLoanScene));
