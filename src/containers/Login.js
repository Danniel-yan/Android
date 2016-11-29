import { connect } from 'react-redux';
import Login from 'components/Login';
import { externalPop } from 'actions/navigation';
import fetchingUser from 'actions/loginUser';

function mapDispatch(dispatch) {
  return {
    loginSuccess: () => {
      dispatch(fetchingUser());
      dispatch(externalPop());
    }
  };
}

export default connect(null, mapDispatch)(Login);
