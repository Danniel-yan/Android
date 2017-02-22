import { connect } from 'react-redux';

import findHome from 'components/find/findHome';
import { trackingScene } from 'high-order/trackingPointGenerator';

function mapStateToProps(state) {
  return {
    loginUser: state.loginUser,
  }
}

export default connect(mapStateToProps,null)(trackingScene(findHome));
