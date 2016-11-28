import { connect } from 'react-redux';

import fetchUser from 'actions/loginUser';
import ZoneScene from 'components/scene/ZoneScene';
import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

function mapStateToProps(state) {
  return { loginUser: state.loginUser }
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(fetchUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZoneScene)
