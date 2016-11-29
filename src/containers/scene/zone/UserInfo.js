import UserInfo from 'components/scene/zone/UserInfo';

import { connect } from 'react-redux';
import { externalPop } from 'actions/navigation';
import fetchingUser from 'actions/loginUser';
import submitUserInfo from 'actions/fillUserInfo';

function mapState(state) {
  return {
    update: state.fillUserInfo,
    loginUser: state.loginUser,
  }
}

function mapDispatch(dispatch) {
  return {
    submit: body => dispatch(submitUserInfo(body)),
    onSubmitSuccess: () => {
      dispatch(fetchingUser());
      dispatch(externalPop());
    }
  };
}

export default connect(mapState, mapDispatch)(UserInfo);
