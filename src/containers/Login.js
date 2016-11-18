import { connect } from 'react-redux';

import Login from 'components/Login';
import externalScene from 'components/high-order/externalScene';

import { externalPop } from 'actions/navigation';

function mapDispatchToProps(dispatch) {
  return {
    onBack: () => dispatch(externalPop())
  };
}

export default connect(null, mapDispatchToProps)(externalScene(Login));
