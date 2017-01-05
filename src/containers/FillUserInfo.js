import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import FillUserInfo from 'components/FillUserInfo';
import submitUserInfo from 'actions/fillUserInfo';
import { trackingScene } from 'high-order/trackingPointGenerator';

function mapStateToProps(state) {
  return {
    update: state.fillUserInfo,
    loginUser: state.loginUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submit: body => dispatch(submitUserInfo(body))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(trackingScene(FillUserInfo));
