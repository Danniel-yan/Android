import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import FillUserInfo from 'components/FillUserInfo';
import submitUserInfo from 'actions/fillUserInfo';

function mapStateToProps(state) {
  return state.fillUserInfo
}

function mapDispatchToProps(dispatch) {
  return {
    submit: body => dispatch(submitUserInfo(body))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FillUserInfo);
