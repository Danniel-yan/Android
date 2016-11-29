import { connect } from 'react-redux';

import SettingScene from 'components/scene/zone/SettingScene';
import { logout } from 'actions/loginUser';
import { externalPush } from 'actions/navigation';

function mapState(state) {
  return { loginUser: state.loginUser };
}

function mapDispatch(dispatch) {
  return {
    logout: () => dispatch(logout()),
    login: () => dispatch(externalPush({ key: 'Login', title: '登录'}))  
  }
}

export default connect(mapState, mapDispatch)(SettingScene);
