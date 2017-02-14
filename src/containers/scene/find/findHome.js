import { connect } from 'react-redux';

import findHome from 'components/find/findHome';

function mapStateToProps(state) {
  return {
    loginUser: state.loginUser,
  }
}

export default connect(mapStateToProps,null)(findHome);