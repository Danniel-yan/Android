import { connect } from 'react-redux';

import findHome from 'components/find/findHome';
import { trackingScene } from 'high-order/trackingPointGenerator';
import pboc from 'actions/pboc';


function mapStateToProps(state) {
  return {
    loginUser: state.loginUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pboc: params => dispatch(pboc(params))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(trackingScene(findHome));
