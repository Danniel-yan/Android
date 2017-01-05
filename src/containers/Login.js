import { connect } from 'react-redux';
import Login from 'components/Login';
import { externalPop } from 'actions/navigation';
import fetchingUser from 'actions/loginUser';

import { trackingScene } from 'high-order/trackingPointGenerator';

function mapDispatch(dispatch) {
  return {
    loginSuccess: () => {
      dispatch(fetchingUser());
      dispatch(externalPop());
    }
  };
}

export default connect(null, mapDispatch)(trackingScene(Login));
